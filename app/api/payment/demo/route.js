import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Simulate payment processing delay
    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    const paymentId =
      "DEMO_" + Date.now();

    return NextResponse.json({
      success: true,
      message:
        "Demo payment completed successfully.",
      paymentId,
      paymentStatus: "paid_demo",
      timestamp: new Date(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Demo payment failed.",
      },
      {
        status: 500,
      }
    );
  }
}