"use client"
import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { SongDetails } from "@/interfaces/spotify";
import SongCard from "@/components/SongCard";

export default function Home() {

  const linkRef = useRef<HTMLInputElement>(null);
  const [songs, setSongs] = useState<SongDetails[]>([]);
  const [selected, setSelected] = useState<Number[]>([]);

  async function handleConfirmation() {
    const url = linkRef.current?.value;
    let result = await axios.get("api/spotify", { params: {url}})
    
    setSongs(result.data.data);
  }
  
  function handleCheckAll() {

  }

  return(
  <>
  <div id="landingRoot" className="flex flex-col justify-center items-center min-h-screen">
    <div>Spotify Downloader</div>
    <input ref={linkRef} type="url" className="bg-blue-300"/>
    <button onClick={handleConfirmation}>Submit</button>

    <div id="results">

      {songs.length > 0 && <input type="checkbox"/>}
      <div id="songDetails" className="flex flex-col min-h-max bg-yellow-200">{songs.map(song => 
        <SongCard key={`${song.songTitle}${song.artists.join("")}`} {...song} />)}
      </div>

    </div>

  </div>
  </>
  )
}