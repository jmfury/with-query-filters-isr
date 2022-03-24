import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log(req.nextUrl.search)
  const filterString = `${req.nextUrl.search.replace(
    "?",
    ""
  )}`;
  return NextResponse.rewrite(`${req.nextUrl.origin}${req.nextUrl.pathname}/${filterString}`);
}
