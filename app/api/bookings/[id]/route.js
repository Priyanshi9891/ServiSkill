

import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Booking from "../../../../models/Booking";
import User from "@/models/User";
import Provider from "@/models/Provider";
import { createNotification } from "@/lib/createNotification";
import CreditTransaction from "@/models/CreditTransaction";
export async function GET(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
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


export async function PATCH(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const body = await request.json();

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 }
      );
    }

    const oldStatus = booking.status;

    booking.status = body.status;

    await booking.save();
if (body.status === "Accepted") {
  const customer = await User.findOne({
    email: booking.customerEmail,
  });

  if (customer) {
    await createNotification({
      userId: customer._id,
      title: "Booking Accepted",
      message: "Your booking request was accepted",
      type: "booking",
      relatedId: booking._id,
    });
  }
}
    // Give rewards only first time
    if (
      oldStatus !== "Completed" &&
      body.status === "Completed"
    ) {
      const providerProfile =
        await Provider.findOne({
          email: booking.providerEmail,
        });

      const customer =
        await User.findOne({
          email: booking.customerEmail,
        });

      const providerUser =
        await User.findOne({
          email: booking.providerEmail,
        });

      if (
        providerProfile?.serviceType ===
        "Professional"
      ) {
        // Customer reward
        customer.credits += 5;

        // Provider reward
        providerUser.credits += 10;

        await customer.save();
        await providerUser.save();

        await CreditTransaction.create({
          userId: customer._id,
          amount: 5,
          type: "Earned",
          reason: "Completed Service",
        });

        await CreditTransaction.create({
          userId: providerUser._id,
          amount: 10,
          type: "Earned",
          reason: "Provided Service",
        });
      }
if (body.status === "Completed") {
  const customer = await User.findOne({
    email: booking.customerEmail,
  });

  if (customer) {
    await createNotification({
      userId: customer._id,
      title: "Service Completed",
      message: "Your booking has been marked completed",
      type: "booking",
      relatedId: booking._id,
    });
  }
}
      if (
        providerProfile?.serviceType ===
        "Skill Teaching"
      ) {
        // Provider gets credits paid by learner
        providerUser.credits +=
          providerProfile.creditsRequired;

        await providerUser.save();

        await CreditTransaction.create({
          userId: providerUser._id,
          amount:
            providerProfile.creditsRequired,
          type: "Earned",
          reason: `Teaching ${providerProfile.skill}`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      booking,
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