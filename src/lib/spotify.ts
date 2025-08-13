import { SpotifyResult } from "@/interfaces/apiResponse";
import { Album, Item, Playlist, SongDetails, Track } from "@/interfaces/spotify";
import axios from "axios";
import { downloadPlaylist } from "./ytdlp";

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

/**
 * @description Returns purely the details of all songs in the playlist
 * @param playlistId 
 * @returns 
 */
export async function getPlaylist(playlistId: string) {
  console.log("Fetching playlist details.");

  let response: SpotifyResult<SongDetails[]>;
  try {
    const token = await getSpotifyToken();
    // console.log("Here is the token in the getPlaylist function:", token);
    // console.log("Here is the playlist id in getPlaylist:", playlistId);

    let results = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    // console.log(results.data);
    let tracks: Item[] = results.data.tracks.items;
    // console.log(tracks)

    let detailsArray: SongDetails[] = [];
    
    tracks.map((element: Item) => {
      // console.log(element);
      const track = element.track;
      let artists: string[] = track.artists.map(artist => artist.name || "")

      
      let songDetail: SongDetails = {
        songTitle: track.name,
        artists: artists,
        albumName: track.album.name ,
        durationMs: track.duration_ms,
        releaseDate: track.album.release_date
      }
        detailsArray.push(songDetail);
    })

    response = {
      data: detailsArray,
    }

    // await downloadPlaylist(tracks);
    return response;
  } catch (error) {
    console.error("There was an error:", error);
    response = {
      "error": error as string
    }
  }
}


export async function getTrack(trackId: string) {
  console.log("Fetching track details.")

  try {
    let token = await getSpotifyToken();

    let results = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    // console.log(results);
    return results;

  } catch (error) {
    console.error("There was an error:", error);
  }
}

function preparePlaylistDetails() {

}