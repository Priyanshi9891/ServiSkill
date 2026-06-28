import { NextResponse } from "next/server";
import groq from "@/lib/groq";

export async function POST(req) {
  try {
    const { query } = await req.json();

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",
            content: `
Convert the user's request into ONE service category.

Categories:
Plumber
Electrician
Carpenter
Painter
Mechanic
Tutor

Return ONLY the category name.
`,
          },
          {
            role: "user",
            content: query,
          },
        ],
      });

    const category =
      completion.choices[0].message.content.trim();

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "AI Error",
    });
  }
}