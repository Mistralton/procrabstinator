import Image from "next/image";
import logo from "../../public/logo.png"
import { invoke } from '@tauri-apps/api/tauri'
import { useEffect } from "react";

export default function Login() {

  useEffect(() => {
    async function invokeTest() {
      const ok = await invoke('get_item')
      console.log(ok)
    }
    invokeTest()
  })

  return(
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <Image className="m-4" src={logo} alt="logo" />
      <form className="m-4 flex flex-col border-black">
        <input className="p-2" placeholder="Username" />
        <input className="p-2" placeholder="Password" />
      </form>
    </div>
  )
}