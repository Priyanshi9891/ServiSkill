import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Review from "../../../models/Review";
import Provider from "../../../models/Provider";
import User from "@/models/User";
import { createNotification } from "@/lib/createNotification";
import CreditTransaction from "@/models/CreditTransaction";
export async function GET(req) {
  try {
    await connectDB();

    const providerId =
      req.nextUrl.searchParams.get(
        "providerId"
      );

    let reviews;

    if (providerId) {
      reviews = await Review.find({
        providerId,
      });
    } else {
      reviews = await Review.find();
    }

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const review = await Review.create({
      providerId: body.providerId,
      customerName: body.customerName,
      rating: Number(body.rating),
      comment: body.comment,
    });
    await createNotification({
  userId: providerId,
  title: "New Review",
  message: "A customer left a review",
  type: "review",
  relatedId: review._id,
});

    const allReviews = await Review.find({
      providerId: body.providerId,
    });

    const averageRating =
      allReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      ) / allReviews.length;

    const provider =
      await Provider.findByIdAndUpdate(
        body.providerId,
        {
          rating: averageRating.toFixed(1),
        },
        { new: true }
      );
     const providerUser = await User.findOne({
  email: provider.email,
});

if (providerUser) {
  await createNotification({
    userId: providerUser._id,
    title: "New Review",
    message: `${body.customerName} left a ${body.rating} star review`,
    type: "review",
    relatedId: review._id,
  });
}

    // Bonus for 5 star rating
    if (Number(body.rating) === 5) {
      const providerUser =
        await User.findOne({
          email: provider.email,
        });

      if (providerUser) {
        providerUser.credits += 10;

        await providerUser.save();
        await createNotification({
  userId: providerUser._id,
  title: "Bonus Credits",
  message: "You earned 10 credits for receiving a 5-star review",
  type: "credit",
});

        await CreditTransaction.create({
          userId: providerUser._id,
          type: "Earned",
          amount: 10,
          reason: "Received 5 Star Review",
        });
      }
    }

    return NextResponse.json({
      success: true,
      review,
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