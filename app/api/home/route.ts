// app/api/home/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge";

export interface HomeAction {
  key: string;
  label: string;
  url: string;
  isVisible: boolean;
}

export interface GalleryItem {
  imageUrl: string;
  caption: string;
  altText: string;
}

export interface HomeResponse {
  success: boolean;
  data: {
    actions: HomeAction[];
    hero: {
      imageUrl: string;
      caption: string;
      altText: string;
    };
    gallery: GalleryItem[];
  };
}

export async function GET() {
  const apiUrl = process.env.API_BASE_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { success: false, message: "API base URL is not defined", data: { actions: [] } },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${apiUrl}/api/v1/site-content`, {
      cache: "no-store",
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!res.ok) {
      console.error(`Upstream API returned status ${res.status}`);
      return NextResponse.json(
        { success: false, message: `Upstream API error: ${res.status}`, data: { actions: [] } },
        { status: 502 }
      );
    }

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
        { success: false, message: "Upstream API returned invalid JSON", data: { actions: [] } },
        { status: 500 }
      );
    }

    if (!data || !data.success || !data.data || !Array.isArray(data.data.actions)) {
      console.error("Unexpected API response structure", data);
      return NextResponse.json(
        { success: false, message: "Invalid response from upstream API", data: { actions: [] } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data.data,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in /api/home route:", error.message);
    } else {
      console.error("Error in /api/home route:", error);
    }

    return NextResponse.json(
      { success: false, message: "Internal error", data: { actions: [] } },
      { status: 500 }
    );
  }
}
