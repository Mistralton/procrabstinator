import Image from "next/image";
import Link from "next/link";
import Homed from "../../public/icons/homed.png";
import Homel from "../../public/icons/homel.png";
import Statd from "../../public/icons/statd.png";
import Statl from "../../public/icons/statl.png";
import Dued from "../../public/icons/duedated.png";
import Duel from "../../public/icons/duedatel.png";
import Historyd from "../../public/icons/historyd.png";
import Historyl from "../../public/icons/historyl.png";
import Settingd from "../../public/icons/settingd.png";
import Settingl from "../../public/icons/settingl.png";

export default function Navbar() {
  const GITHUB = "https://raw.githubusercontent.com/Mistralton/procrabstinator/main/public/icons/"
  const GITHUBTEMP = "?token=GHSAT0AAAAAABYZNSSA5UCZQUOPPOPHVCL2Y6DECAA";

  return (
    <div className="absolute top-0 h-full w-36 bg-zinc-500 flex flex-col items-center justify-center gap-12">
      <div className="group w-20">
        <Link href="" className="group-hover:hidden">
          <Image src={Homed} 
          alt="homedark" width="50" height="50"></Image>
        </Link>
        <Link href="" className="hidden group-hover:flex">
          <Image src={Homel} 
          alt="homelight" width="50" height="50"></Image>
        </Link>
      </div>
      <div className="group w-20">
        <Link href="" className="group-hover:hidden">
          <Image src={Statd} 
          alt="statdark" width="50" height="50"></Image>
        </Link>
        <Link href="" className="hidden group-hover:flex">
          <Image src={Statl} 
          alt="statlight" width="50" height="50"></Image>
        </Link>
      </div>
      <div className="group w-20">
        <Link href="" className="group-hover:hidden">
          <Image src={Dued} 
          alt="duedatedark" width="50" height="50"></Image>
        </Link>
        <Link href="" className="hidden group-hover:flex">
          <Image src={Duel} 
          alt="duedatelight" width="50" height="50"></Image>
        </Link>
      </div>
      <div className="group w-20">
        <Link href="" className="group-hover:hidden">
          <Image src={Historyd} 
          alt="historydark" width="50" height="50"></Image>
        </Link>
        <Link href="" className="hidden group-hover:flex">
          <Image src={Historyl} 
          alt="historylight" width="50" height="50"></Image>
        </Link>
      </div>
      <div className="group w-20">
        <Link href="" className="group-hover:hidden">
          <Image src={Settingd} 
          alt="settingdark" width="50" height="50"></Image>
        </Link>
        <Link href="" className="hidden group-hover:flex">
          <Image src={Settingl} 
          alt="settinglight" width="50" height="50"></Image>
        </Link>
      </div>
    </div>
  )
}