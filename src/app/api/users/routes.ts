import {NextResponse} from "next/server";
import User from "@/models/User";
import {authenticateUser, isAdmin} from "@/utils/auth";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import nodemailer from "nodemailer"; // Example email service

// POST: Create users (Admin only)
export async function POST(req: Request) {
  const admin = await authenticateUser(req);
  if (!admin || !isAdmin(admin)) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  try {
    const body = await req.json();
    const {emails} = body;

    if (!emails || !Array.isArray(emails)) {
      return NextResponse.json({error: "Invalid input"}, {status: 400});
    }

    const createdUsers = await Promise.all(
      emails.map(async (email: string) => {
        const password = uuidv4(); // Generate random password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({email, password: hashedPassword, role: "student"});
        // Optionally send email with password
        return {email, password};
      })
    );

    return NextResponse.json({createdUsers}, {status: 201});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Failed to create users"}, {status: 500});
  }
}

// PATCH: Change password
export async function PATCH(req: Request) {
  const user = await authenticateUser(req);
  if (!user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  try {
    const body = await req.json();
    const {currentPassword, newPassword} = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({error: "Invalid input"}, {status: 400});
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({error: "Incorrect current password"}, {status: 403});
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({message: "Password changed successfully"}, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Failed to change password"}, {status: 500});
  }
}

// POST: Trigger password reset
export async function POST_RESET(req: Request) {
  try {
    const body = await req.json();
    const {email} = body;

    if (!email) {
      return NextResponse.json({error: "Email is required"}, {status: 400});
    }

    const user = await User.findOne({email});
    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    const resetToken = uuidv4();
    user.resetToken = resetToken; // Save token to user schema with an expiration
    user.resetTokenExpires = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail", // Example service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    });

    return NextResponse.json({message: "Password reset email sent"}, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Failed to send password reset email"}, {status: 500});
  }
}

// GET: Retrieve current user profile
export async function GET(req: Request) {
  const user = await authenticateUser(req);
  if (!user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  try {
    const userProfile = {
      email: user.email,
      role: user.role,
      courses: user.courses || [], // Example additional field
    };

    return NextResponse.json(userProfile, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Failed to retrieve user profile"}, {status: 500});
  }
}
