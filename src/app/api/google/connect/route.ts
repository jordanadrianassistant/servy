import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { getAuthUrl } from "@/lib/google-calendar";

export async function GET() {
  const business = await getCurrentBusiness();
  if (!business) {
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL!));
  }

  const url = getAuthUrl(business.id);
  return NextResponse.redirect(url);
}
