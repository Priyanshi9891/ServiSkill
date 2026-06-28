import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongodb";
import Provider from "../../../../../models/Provider";

export async function PATCH(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const provider =
      await Provider.findByIdAndUpdate(
        id,
        {
          isVerified: true,
        },
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      provider,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}