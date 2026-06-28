
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import EmergencyRequest from "@/models/EmergencyRequest";
import Provider from "@/models/Provider";

export async function GET(req) {
  try {
    await connectDB();

    const email =
      req.nextUrl.searchParams.get("email");

    console.log("EMAIL:", email);

    const provider =
      await Provider.findOne({ email });

    console.log("PROVIDER:", provider);

    if (!provider) {
      return NextResponse.json([]);
    }

    const allEmergencies =
      await EmergencyRequest.find();

    console.log(
      "ALL EMERGENCIES:",
      allEmergencies
    );

   const emergencies =
  await EmergencyRequest.find({
    status: "Pending",
    serviceType: {
      $regex: `^${provider.skill}$`,
      $options: "i",
    },
  });

    console.log(
      "MATCHED:",
      emergencies
    );

    return NextResponse.json(
      emergencies
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}