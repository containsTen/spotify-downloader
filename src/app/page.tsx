"use client"
import { useRef } from "react"
import axios from "axios";

export default function Home() {

  const linkRef = useRef<HTMLInputElement>(null);

  async function handleConfirmation() {
    const url = linkRef.current?.value;
    let result = await axios.get("api/test", { params: {url}})
    console.log(result);
  }
  

  return(
  <>
  <div id="landingRoot" className="flex flex-col justify-center items-center min-h-screen">
    <div>Spotify Downloader</div>
    <input ref={linkRef} type="url" className="bg-blue-300"/>
    <button onClick={handleConfirmation}>Submit</button>
  </div>
  </>
  )
}