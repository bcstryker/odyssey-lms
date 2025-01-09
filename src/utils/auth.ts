import jwt from "jsonwebtoken";
import User from "@/models/User";
import {JwtPayload, IUser} from "@/types";
import {NextApiRequest} from "next";

export async function protect(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error("Token validation error:", error);
    throw new Error("Forbidden: Invalid token");
  }
}

// Middleware to enforce role-based access control
export function requireRole(role: string) {
  return (user: JwtPayload) => {
    if (user.role !== role) {
      throw new Error("Access denied: Insufficient role");
    }
  };
}

// Function to authenticate a user and retrieve their details
export async function authenticateUser(req: Request) {
  // Use the `get()` method to retrieve the "authorization" header
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];
  let decoded: JwtPayload;
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }
    decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    console.error("Token validation error:", err);
    throw new Error("Invalid or expired token");
  }

  const {email} = decoded;
  console.log("Decoded token:", decoded);
  console.log("Email:", email);
  const user = await User.findOne({email: "user@example.com"}).lean<IUser>();
  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
