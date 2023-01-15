import Image from "next/image";
import Link from "next/link";
import Homed from "../../public/icons/homed.png";
import Statd from "../../public/icons/statd.png";
import Dued from "../../public/icons/duedated.png";
import Historyd from "../../public/icons/historyd.png";
import Settingd from "../../public/icons/settingd.png";

export default function Navbar() {
  return (
    <div className="absolute top-0 h-full w-36 bg-orange-800 flex flex-col items-center justify-center gap-12">
      <Link href="" className="">
        <Image src={Homed} className="hover:brightness-150"
        alt="homedark" width="50" height="50"></Image>
      </Link>
      <Link href="" className="">
        <Image src={Statd} className="hover:brightness-150"
        alt="statdark" width="50" height="50"></Image>
      </Link>
      <Link href="" className="">
        <Image src={Dued} className="hover:brightness-150"
        alt="duedatedark" width="50" height="50"></Image>
      </Link>
      <Link href="" className="">
        <Image src={Historyd} className="hover:brightness-150"
        alt="historydark" width="50" height="50"></Image>
      </Link>
      <Link href="" className="">
        <Image src={Settingd} className="hover:brightness-150"
        alt="settingdark" width="50" height="50"></Image>
      </Link>
    </div>
  )
}