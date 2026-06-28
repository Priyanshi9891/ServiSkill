import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const notification =
      await Notification.findByIdAndUpdate(
        params.id,
        {
          isRead: true,
        },
        { new: true }
      );

    return NextResponse.json(notification);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}