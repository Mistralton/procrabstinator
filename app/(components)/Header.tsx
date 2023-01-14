import MyModal from "./Modal";

export default function Header() {

  return (
    <header className="flex justify-end p-4 items-center bg-zinc-700 h-16 float-right w-[calc(100%-9rem)]">
      <MyModal />
    </header>
  )
}