// pages/qs-test/_middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const filterString = `${req.nextUrl.pathname}/${req.nextUrl.search.replace(
    "?",
    ""
  )}`;
  console.log({ filterString });
  return NextResponse.rewrite(`http://localhost:3000${filterString}`);
}
