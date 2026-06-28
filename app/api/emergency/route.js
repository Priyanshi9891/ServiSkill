import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import EmergencyRequest from "@/models/EmergencyRequest";
import Provider from "@/models/Provider";
import User from "@/models/User";

import { createNotification } from "@/lib/createNotification";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

   const emergency =
await EmergencyRequest.create({
  customerId: body.customerId,
  customerName: body.customerName,
  customerEmail: body.customerEmail,
  serviceType: body.serviceType,
  description: body.description,
  location: {
    lat: body.lat,
    lng: body.lng,
  },
});

    const providers =
      await Provider.find({
        skill: body.serviceType,

        location: {
          $near: {
            $geometry: {
              type: "Point",

              coordinates: [
                body.lng,
                body.lat,
              ],
            },

            $maxDistance: 5000,
          },
        },
      });

    for (const provider of providers) {
      const providerUser =
        await User.findOne({
          email: provider.email,
        });

      if (providerUser) {
        await createNotification({
          userId: providerUser._id,

          title:
            "🚨 Emergency Request",

          message:
            `${body.customerName} needs urgent ${body.serviceType}`,

          type: "emergency",

          relatedId:
            emergency._id,
        });
      }
    }

    return NextResponse.json({
      success: true,
      emergency,
      providersFound:
        providers.length,
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