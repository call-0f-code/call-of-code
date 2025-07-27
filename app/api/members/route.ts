// app/api/members/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiUrl = process.env.API_BASE_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { success: false, message: "API base URL is not defined" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${apiUrl}/members`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Invalid JSON from upstream API:", text, err.message);
      } else {
        console.error("Invalid JSON from upstream API:", text);
      }

      return NextResponse.json(
        { success: false, message: "Upstream API returned invalid JSON" },
        { status: 500 }
      );
    }

    console.log("Raw Supabase response:", JSON.stringify(data, null, 2));

    if (!data || !data.success || !Array.isArray(data.user)) {
      console.error("Unexpected API response structure", data);
      return NextResponse.json(
        { success: false, message: "Invalid response from upstream API" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data.user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in /api/members route:", error.message);
    } else {
      console.error("Error in /api/members route:", error);
    }

    return NextResponse.json(
      { success: false, message: "Internal error" },
      { status: 500 }
    );
  }
}
