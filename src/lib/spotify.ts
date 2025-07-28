import { Playlist } from "@/interfaces/spotify";
import axios from "axios";

let spotifyToken: string | null = null;
let tokenExpiresAt: number = 0;

export async function getSpotifyToken() {
  console.log("Fetching spotify token.");

  const now = Date.now();
  if (spotifyToken && now < tokenExpiresAt) {
    return spotifyToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Authorization": `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const data = res.data;
  spotifyToken = data.access_token;
  // Set expiry a bit earlier to be safe
  tokenExpiresAt = now + (data.expires_in - 60) * 1000;

  return spotifyToken;
}

export async function getPlaylist(playlistId: string) {
  console.log("Fetching playlist details.");

  try {
    const token = await getSpotifyToken();
    console.log("Here is the token in the getPlaylist function:", token);
    console.log("Here is the playlist id in getPlaylist:", playlistId);

    let results: Playlist = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(results);
    return results;
  } catch (error) {
    console.error("There was an error:", error);
  }
}