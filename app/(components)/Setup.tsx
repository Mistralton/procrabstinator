import Image from "next/image";
import logo from "../../public/logo.png"
import { SyntheticEvent, useEffect } from "react";
import { useContext } from "react";
import { Context } from "@/context/ContextProvider";
import { useState } from "react";
import { invoke } from "@tauri-apps/api";

export default function Setup() {
  const context = useContext(Context);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSetup = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  }

  const [type, setType] = useState("");
  const [freq, setFreq] = useState("");
  const [time_frame, setTF] = useState("");
  const [proactive_period, setPP] = useState("");

  const handleStart = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (type && freq && time_frame && proactive_period) {
      await invoke("insert_settings", { notificationType: type, notificationFrequency: freq, notificationTimeFrame: time_frame, proactivePeriod: proactive_period })
      context?.setLogged(prevLogged => !prevLogged);
    }
  }

  return(
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      { !isSubmitted ? (
        <div className="flex items-center justify-center flex-col">
          <Image className="m-4" src={logo} alt="logo" width={300} />
          <form onSubmit={handleSetup} className="m-4 flex flex-col border-black">
            <h1 className="text-3xl font-serif">WELCOME</h1>
            <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">NEXT</button>
          </form>
        </div>
      ) : (
        <form className="flex flex-col items-center" onSubmit={handleStart}>
          <h1 className="text-3xl font-serif">Notification Type</h1>
          <div className="space-x-12 px-10 py-5">
            <button onClick={(e) => setType(e.currentTarget.value)} value="lightup" type="button" className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">Lightup</button>
            <button onClick={(e) => setType(e.currentTarget.value)} value="message" type="button" className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">Message</button>
          </div>
          <h1 className="text-3xl font-serif py-5">Notification Frequency</h1>
          <input onChange={(e) => setFreq(e.target.value)} className="py-2 px-16" required/>
          <h1 className="text-3xl font-serif py-5">Notification Time Frame</h1>
          <input onChange={(e) => setTF(e.target.value)} className="py-2 px-16" required/>
          <h1 className="text-3xl font-serif py-5">Proactive Period</h1>
          <input onChange={(e) => setPP(e.target.value)} className="py-2 px-16" required/>
          <button type="submit" className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 my-5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">START</button>
        </form>
      )}
    </div>
  )
}