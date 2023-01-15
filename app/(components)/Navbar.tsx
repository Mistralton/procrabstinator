import Image from "next/image";
import Link from "next/link";
import Homed from "../../public/icons/homed.png";
import Statd from "../../public/icons/statd.png";
import Dued from "../../public/icons/blocked.png";
import Historyd from "../../public/icons/historyd.png";
import Settingd from "../../public/icons/settingd.png";
import { useContext } from "react";
import { Context } from "@/context/ContextProvider";

export default function Navbar() {

  const context = useContext(Context)

  function tabSwitcher(index: number) {
    context?.setTab(index)
  }

  return (
    <div className="absolute top-0 h-full w-36 bg-orange-800 flex flex-col items-center justify-center gap-12">
      <Link href="">
        <Image src={Homed} onClick={() => tabSwitcher(0)}
        className={`${context?.tab === 0 ? 'brightness-150' : 'brightness-100'} hover:brightness-150`}
        alt="homedark" width="50" height="50"></Image>
      </Link>
      <Link href="">
        <Image src={Statd} onClick={() => tabSwitcher(1)}
        className={`${context?.tab === 1 ? 'brightness-150' : 'brightness-100'} hover:brightness-150`}
        alt="statdark" width="50" height="50"></Image>
      </Link>
      <Link href="/tabs" className="">
        <Image src={Dued} onClick={() => tabSwitcher(2)}
        className={`${context?.tab === 2 ? 'brightness-150' : 'brightness-100'} hover:brightness-150`}
        alt="duedatedark" width="50" height="50"></Image>
      </Link>
      <Link href="" className="">
        <Image src={Historyd} onClick={() => tabSwitcher(3)}
        className={`${context?.tab === 3 ? 'brightness-150' : 'brightness-100'} hover:brightness-150`}
        alt="historydark" width="50" height="50"></Image>
      </Link>
      <Link href="" className="">
        <Image src={Settingd} onClick={() => tabSwitcher(4)}
        className={`${context?.tab === 4 ? 'brightness-150' : 'brightness-100'} hover:brightness-150`}
        alt="settingdark" width="50" height="50"></Image>
      </Link>
    </div>
  )
}