"use client";
import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useState } from "react";

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    if (date && name && priority) closeModal
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="bg-orange-300 rounded-md p-2 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30"
        >
          Add Task
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-3 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-center leading-6 text-gray-900"
                  >
                    Enter A New Task
                  </Dialog.Title>
                  <form className="m-4 w-full" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-8 place-items-center text-left mr-16">
                      <p className="w-28">Task Name:</p>
                      <input
                        className="w-full m-2"
                        placeholder="File your taxes"
                        required
                        type={"string"}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8 place-items-center text-left mr-16">
                      <p className="w-28">Task Due Date:</p>
                      <input
                        className="w-full m-2"
                        type="date"
                        required
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8 place-items-center text-left mr-16">
                      <p className="w-28">Task Priority:</p>
                      <input
                        className="w-full m-2"
                        placeholder={"0"}
                        required
                        pattern="/^[0-9]+$/"
                        onChange={(e) => setPriority(e.target.value)}
                      />
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        type="submit"
                        className="rounded-md bg-green-400 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-opacity-30"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
