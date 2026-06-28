import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";

export async function POST(req) {
  await connectDB();

  const { userId } = await req.json();

  const messages = await Message.find({
    $or: [
      { sender: userId },
      { receiver: userId },
    ],
  })
    .populate("sender")
    .populate("receiver");

  const usersMap = {};

  messages.forEach((msg) => {
    const otherUser =
      msg.sender._id.toString() === userId
        ? msg.receiver
        : msg.sender;

    usersMap[otherUser._id] = otherUser;
  });

  return NextResponse.json(
    Object.values(usersMap)
  );
}