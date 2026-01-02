// app/api/members/route.ts
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
  const apiUrl = process.env.API_BASE_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { success: false, message: "API base URL is not defined" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${apiUrl}/api/v1/members`, {  
      cache: "no-store",  
      signal: AbortSignal.timeout(30000), // 30 second timeout  
    });  

    if (!res.ok) {  
      console.error(`Upstream API returned status ${res.status}`);  
      return NextResponse.json(  
        { success: false, message: `Upstream API error: ${res.status}` },  
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
        { success: false, message: "Upstream API returned invalid JSON" },
        { status: 500 }
      );
    }


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
