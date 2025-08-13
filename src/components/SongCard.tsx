import { SongDetails } from "@/interfaces/spotify";

export default function SongCard(song: SongDetails) {

  function handleCheckbox() {

  }
  return(
    <div className="flex items-center gap-4 bg-white rounded shadow p-4 mb-2 w-full max-w-xl">
      <input type="checkbox"/>
      <div>{song.songTitle}</div>
      <div>{song.albumName}</div>
      <div>{song.artists}</div>
      <div>{song.durationMs}</div>
      <div>{`${song.releaseDate}`}</div>
    </div>
  )
}