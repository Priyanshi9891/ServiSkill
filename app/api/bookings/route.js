import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Booking from "../../../models/Booking";
import User from "@/models/User";
import { createNotification } from "@/lib/createNotification";
import Provider from "@/models/Provider";
import CreditTransaction from "@/models/CreditTransaction";
export async function GET(req) {
  try {
    await connectDB();

    const providerEmail =
      req.nextUrl.searchParams.get(
        "providerEmail"
      );

    const customerEmail =
      req.nextUrl.searchParams.get(
        "customerEmail"
      );

    let bookings;

    if (providerEmail) {
      bookings = await Booking.find({
        providerEmail,
      });
    } else if (customerEmail) {
      bookings = await Booking.find({
        customerEmail,
      });
    } else {
      bookings = await Booking.find();
    }

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const provider =
  await Provider.findById(
    body.providerId
  );

if (
  provider.serviceType ===
  "Skill Teaching"
) {
  const customer =
    await User.findById(
      body.customerId
    );

  if (!customer) {
    return NextResponse.json(
      {
        success: false,
        message: "Customer not found",
      },
      { status: 404 }
    );
  }

  if (
    customer.credits <
    provider.creditsRequired
  ) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Not enough credits",
      },
      { status: 400 }
    );
  }

  // Deduct learner credits
  customer.credits -=
    provider.creditsRequired;

  await customer.save();

  await CreditTransaction.create({
    userId: customer._id,
    amount:
      provider.creditsRequired,
    type: "Spent",
    reason:
      `Learn ${provider.skill}`,
  });

  // Add credits to teacher
  const teacher =
    await User.findOne({
      email: provider.email,
    });

  if (teacher) {
    teacher.credits +=
      provider.creditsRequired;

    await teacher.save();

    await CreditTransaction.create({
      userId: teacher._id,
      amount:
        provider.creditsRequired,
      type: "Earned",
      reason:
        `Teaching ${provider.skill}`,
    });
  }
}
   
    const booking = await Booking.create({
  ...body,
  paymentStatus: "paid_demo",
});
    const providerUser = await User.findOne({
  email: provider.email,
});

if (providerUser) {
  await createNotification({
    userId: providerUser._id,
    title: "New Booking",
    message: `${body.customerName} booked your service`,
    type: "booking",
    relatedId: booking._id,
  });
}

    // Reward customer for booking
    const customer = await User.findOne({
      email: body.customerEmail,
    });

    if (customer) {
      customer.credits += 5;

      await customer.save();
      

      await CreditTransaction.create({
        userId: customer._id,
        type: "Earned",
        amount: 5,
        reason: "Booked a service",
      });
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
      {
        status: 500,
      }
    );
  }
}