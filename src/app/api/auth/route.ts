import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {connectDB} from "@/utils/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const {email, password} = await req.json();
    await connectDB();

    const user = await User.findOne({email});
    if (!user) {
      return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        courses: user.courses,
      },
      process.env.JWT_SECRET!,
      {expiresIn: "1h"}
    );

    return NextResponse.json({token}, {status: 200});
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({error: "Server error"}, {status: 500});
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({error: "Authorization header missing or malformed"}, {status: 401});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({user: decoded}, {status: 200});
  } catch (error) {
    console.error("JWT validation error:", error);
    return NextResponse.json({error: "Invalid or expired token"}, {status: 401});
  }
}
