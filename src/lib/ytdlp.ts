import { promisify } from "util"
import { exec } from "child_process"
import { Track } from "@/interfaces/spotify";

const execAsync = promisify(exec);

export async function downloadSong(songTitle: string, artists: string[], releaseDate: string) {
  const query = `${artists.join()} ${songTitle} ${releaseDate} lyrics`
  const generatedTitle = `${artists.join(", ")} - ${songTitle}`
  const cmd = `yt-dlp -x --audio-format mp3 --audio-quality 0 -o "${generatedTitle}.%(ext)s "ytsearch1:${query}"`

  try {
    const { stdout, stderr } = await execAsync(cmd)
    console.log("Download complete:", stdout)
    if (stderr) console.error("Warnings:", stderr)
  } catch (error) {
    console.error("Error downloading song:", error)
  }
}

export async function downloadPlaylist(tracks: Track[]) {
  console.log("ytdlp downloadPlaylist has been triggered.");
  console.log(tracks);
  try {
    console.log("Inside the try block in the downloadPlaylist function.");
    console.log("The length of tracks:", tracks.length)
    tracks.forEach((element) => {
      console.log("Is this even working.");
      let name = element.album.artists.map((artist) => artist.name);
      console.log("NAME", name);
    });
  } catch (error) {
    
  }
}