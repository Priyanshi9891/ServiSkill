
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import EmergencyRequest from "@/models/EmergencyRequest";
import Provider from "@/models/Provider";
import Booking from "@/models/Booking";
import User from "@/models/User";

import { createNotification } from "@/lib/createNotification";

export async function PATCH(
  req,
  context
) {
  try {
    await connectDB();

    const { id } =
      await context.params;

    

    const body =
      await req.json();

    

    // Only one provider can accept
    const emergency =
      await EmergencyRequest.findOneAndUpdate(
        {
          _id: id,
          status: "Pending",
        },
        {
          status: "Accepted",
          acceptedBy:
            body.providerId,
        },
        {
          new: true,
        }
      );

    if (!emergency) {
      const existing =
        await EmergencyRequest.findById(
          id
        );

      return NextResponse.json(
        {
          success: false,
          message: existing
            ? `Status is ${existing.status}`
            : "Emergency not found",
        },
        {
          status: 400,
        }
      );
    }

    const provider =
      await Provider.findById(
        body.providerId
      );

    if (!provider) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Provider not found",
        },
        {
          status: 404,
        }
      );
    }

    // Create booking
    const booking =
  await Booking.create({
    customerId:
      emergency.customerId.toString(),

    customerName:
      emergency.customerName,

    customerEmail:
      emergency.customerEmail,

    providerId:
      provider._id,

    providerName:
      provider.name,

    providerEmail:
      provider.email,

    service:
      emergency.serviceType,

    bookingDate:
      new Date()
        .toISOString()
        .split("T")[0],

    serviceType:
      "Professional",

    status:
      "Accepted",
  });

    // Customer notification
   

try {
  const result =
    await createNotification({
      userId:
        emergency.customerId.toString(),

      title:
        "Emergency Accepted",

      message:
        `${provider.name} accepted your emergency request.`,

      type:
        "booking",

      relatedId:
        booking._id,
    });


} catch (err) {
  console.log(
    "Notification Error:",
    err
  );
}

    // Provider notification
    await createNotification({
      userId:
        provider.userId,

      title:
        "Emergency Assigned",

      message:
        `You accepted ${emergency.customerName}'s emergency request.`,

      type: "booking",

      relatedId:
        booking._id,
    });

    return NextResponse.json({
      success: true,
      booking,
      emergency,
      message:
        "Emergency accepted successfully",
    });
  } catch (error) {
    console.log(error);

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