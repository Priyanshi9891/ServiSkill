import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

const normalizedEmail = email.trim().toLowerCase();

const existingUser = await User.findOne({
  email: normalizedEmail,
});

if (existingUser) {
  return NextResponse.json(
    { message: "User already exists" },
    { status: 400 }
  );
}

    const hashedPassword = await bcrypt.hash(password, 10);
 await User.create({
  name,
  email: normalizedEmail,
  password: hashedPassword,
  role,
});
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  }

catch (error) {
  console.error(error);

  if (error.code === 11000) {
    return NextResponse.json(
      {
        success: false,
        message: "User already exists",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: error.message,
    },
    { status: 500 }
  );
}
}