import { useState } from "react";

export default function Modal() {
  const [open, setOpen] = useState(true);
  const close = () => setOpen(false);
  return (
    <>
      {open && (
        <div className="bg-black/60 fixed center-full animate-[fadeIn_300ms]">
          <div className="fixed flex flex-col items-center justify-center gap-4 p-10 w-[30rem] h-[16rem] bg-white rounded-3xl shadow-2xl">
            <p className="text-2xl font-bold text-center">Welcome back.</p>
            <button onClick={close} className="border border-black p-1 px-3 w-32 rounded hover:bg-black hover:text-white transition-all">
              Alright!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
