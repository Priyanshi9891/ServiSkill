import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import User from "@/models/User";
import CreditTransaction from "@/models/CreditTransaction";
import { createNotification } from "@/lib/createNotification";

// GET USER CREDITS
export async function GET(req) {
  try {
    await connectDB();

    const userId =
      req.nextUrl.searchParams.get("userId");

    const user =
      await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const transactions =
      await CreditTransaction.find({
        userId,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      credits: user.credits,
      transactions,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// ADD / SPEND CREDITS
export async function POST(req) {
  try {
    await connectDB();

    const {
      userId,
      amount,
      type,
      reason,
    } = await req.json();

    const user =
      await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    if (
      type === "Spent" &&
      user.credits < amount
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Not enough credits",
        },
        {
          status: 400,
        }
      );
      
    }
    await createNotification({
  userId,
  title: "Credits Deducted",
  message: `${amount} credits were used`,
  type: "credit",
});

    if (type === "Earned") {
      user.credits += amount;
    } else {
      user.credits -= amount;
    }

    await user.save();

    await CreditTransaction.create({
      userId,
      amount,
      type,
      reason,
    });
   await createNotification({
  userId,
  title: "Credits Added",
  message: `You earned ${amount} credits`,
  type: "credit",
});

    return NextResponse.json({
      success: true,
      credits: user.credits,
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