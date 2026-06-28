import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";

export async function POST(req) {
  try {
    await connectDB();

    const { bookingId } = await req.json();

    const messages = await Message.find({
      bookingId,
    }).sort({
      createdAt: 1,
    });

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}