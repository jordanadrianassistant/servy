import { NextResponse } from "next/server";
import { handleCallback } from "@/lib/google-calendar";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state"); // businessId

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/dashboard/settings?error=missing_params", process.env.NEXTAUTH_URL!)
    );
  }

  try {
    await handleCallback(code, state);
    return NextResponse.redirect(
      new URL("/dashboard/settings?calendar=connected", process.env.NEXTAUTH_URL!)
    );
  } catch (error) {
    console.error("Google Calendar callback error:", error);
    return NextResponse.redirect(
      new URL("/dashboard/settings?error=calendar_failed", process.env.NEXTAUTH_URL!)
    );
  }
}
