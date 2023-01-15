import Image from "next/image";
import logo from "../../public/logo.png"
import { SyntheticEvent, useEffect } from "react";
import { useContext } from "react";
import { Context } from "@/context/ContextProvider";



export default function Setup() {
  const context = useContext(Context);

  const handleSetup = (e: SyntheticEvent) => {
    e.preventDefault();
    context?.setLogged(prevLogged => !prevLogged);
  }

  return(
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <Image className="m-4" src={logo} alt="logo" />
      <form onSubmit={handleSetup} className="m-4 flex flex-col border-black">
        <input className="p-2" placeholder="Username" />
        <input className="p-2" placeholder="Password" />
        <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">Log In</button>
      </form>
    </div>
  )
}