import MyModal from "./Modal";

export default function Header() {

  return (
    <header className="flex justify-end p-4 items-center bg-orange-900 h-16 float-right w-[calc(100%-9rem)]">
      <MyModal />
    </header>
  )
}