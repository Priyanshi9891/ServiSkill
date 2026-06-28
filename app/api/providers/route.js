
import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Provider from "../../../models/Provider";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

   const provider = await Provider.create({
  ...body,

  geoLocation: {
    type: "Point",
    coordinates: [
      Number(body.longitude),
      Number(body.latitude),
    ],
  },
  
});

    return NextResponse.json(
      {
        success: true,
        provider,
      },
      { status: 201 }
    );
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

export async function GET(req) {
  try {
    await connectDB();

    const email =
      req.nextUrl.searchParams.get("email");

    const search =
      req.nextUrl.searchParams.get("search");

    const serviceType =
      req.nextUrl.searchParams.get(
        "serviceType"
      );

    let query = {};

    if (email) {
      query.email = email;
    }

    if (serviceType) {
      query.serviceType = serviceType;
    }

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          skill: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const providers =
      await Provider.find(query);

    return NextResponse.json(providers);
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