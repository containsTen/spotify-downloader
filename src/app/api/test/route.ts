import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

  const {searchParams} = new URL(req.url);
  const url = searchParams.get("url");

  console.log("Received this url:", url);
  return Response.json({
    "received": url
  });
}