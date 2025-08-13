import { promisify } from "util"
import { exec } from "child_process"
import { SongDetails, Track } from "@/interfaces/spotify";
import pLimit from "p-limit";

const execAsync = promisify(exec);
const limit = pLimit(8);

export async function downloadSong(songTitle: string, artists: string[]) {
  const query = `${artists.join(" ")} ${songTitle} lyrics`
  const generatedTitle = `${artists.join(", ")} - ${songTitle}`
  const folderPath = "./songs"
  const cmd = `yt-dlp -x --audio-format mp3 --audio-quality 0 -P "${folderPath}" -o "${generatedTitle}.%(ext)s" "ytsearch1:${query}"`

  try {
    const { stdout, stderr } = await execAsync(cmd);
    console.log("Download complete:", stdout);

    if (stderr) console.error("Warnings:", stderr);

  } catch (error) {
    console.error("Error downloading song:", error);
  }
}

export async function downloadPlaylist(songs: SongDetails[]) {
  console.log("ytdlp downloadPlaylist has been triggered.");
  try {
    console.log("Inside the try block in the downloadPlaylist function.");
    console.log("The length of songs:", songs.length)
    console.log(songs);
    const results = await Promise.all(
      songs.map((element) => downloadSong(element.songTitle, element.artists))
    )
  } catch (error) {
    
  }
}