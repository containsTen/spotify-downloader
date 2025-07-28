import { getPlaylist } from "@/lib/spotify";
import { NextRequest } from "next/server";

/**
 * Receives the playlist or song url from the user.
 * @param req NextRequest
 * @returns 
 */
export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  // Catch an error if the given url is null

  // Isolate the playlist or track id from the url that was given by the user
  let urlType = url?.includes("/playlist/") ? "playlist" : url?.includes("/track/") ? "track" : "unknown";
  // Catch an error if the urlType does not contain either

  let id = url?.replace(/^https:\/\/open\.spotify\.com\/(playlist|track)\//, "");
  // let id = urlType ? "playlist"

  // let results = getPlaylist(id);
  if (urlType === "playlist") {
    let results = await getPlaylist(id as string);
    console.log(results);
  } 

  return Response.json({
    "received": "success",
    "isolated": id,
    "urlType": urlType
  });
}