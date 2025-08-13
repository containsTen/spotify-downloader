import { SpotifyResult } from "@/interfaces/apiResponse";
import { Playlist, SongDetails, Track } from "@/interfaces/spotify";
import { getPlaylist, getTrack } from "@/lib/spotify";
import { downloadPlaylist } from "@/lib/ytdlp";
import { NextRequest } from "next/server";

/**
 * Receives the playlist or song url from the user.
 * @param req NextRequest
 * @returns 
 */
export async function GET(req: NextRequest) {

  console.log("The get function has been triggered for /api/spotify ")
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  // Catch an error if the given url is null

  // Isolate the playlist or track id from the url that was given by the user
  let urlType = url?.includes("/playlist/") ? "playlist" : url?.includes("/track/") ? "track" : "unknown";
  // Catch an error if the urlType does not contain either

  let id = url?.replace(/^https:\/\/open\.spotify\.com\/(playlist|track)\//, "") as string;
  // let id = urlType ? "playlist"

  let results: SpotifyResult<SongDetails|SongDetails[]>;
  if (urlType === "playlist") {
    console.log("This playlist function was invoked.")
    results = await getPlaylist(id) as SpotifyResult<SongDetails[]>;
  } else if (urlType === "track") {
    console.log("This track function was invoked.")
    results = await getTrack(id) as SpotifyResult<SongDetails[]>;
  } else {
    results = {
      error: "There was an error with the API response."
    }
  }

  await downloadPlaylist(results.data as SongDetails[]); 
  

  // console.log(results);
  return Response.json({
    "received": "new5",
    "isolated": id,
    "urlType": urlType,
    "data": results.data
  });
}