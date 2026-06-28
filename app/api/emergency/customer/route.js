import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import EmergencyRequest from "@/models/EmergencyRequest";

export async function GET(req) {
  try {
    await connectDB();

    const customerId =
      req.nextUrl.searchParams.get(
        "customerId"
      );

    const emergency =
      await EmergencyRequest.findOne({
        customerId,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json(
      emergency
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}