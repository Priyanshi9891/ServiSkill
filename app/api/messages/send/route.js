import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";
import { createNotification } from "@/lib/createNotification";
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const message = await Message.create(body);
    await createNotification({
  userId: body.receiverId,
  title: "New Message",
  message: "You received a new message",
  type: "message",
  relatedId: message._id,
});
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}