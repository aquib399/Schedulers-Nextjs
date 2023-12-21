import OtpPopUp from "@/components/otpPopUp";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import { Bitter } from "next/font/google";
const bitter = Bitter({ subsets: ["latin"], weight: [], display: "auto" });
export default function Signup() {
  const Router = useRouter();
  const [popUp, setPopUp] = useState(false);

  function closePopUp() {
    setPopUp(false);
  }
  function onSubmit() {
    setPopUp(false);
  }
  const inputStyle = `w-80 py-2 px-4 border outline-none hover:border-b-black focus:border-b-black transition-all`;
  const btnStyle = `py-2 w-80 font-bold tracking-[4px] border border-black 
  hover:bg-black hover:text-white hover:scale-105 active:text-white active:scale-100 active:bg-[rgb(70,70,70)] transition-all`;
  let flag = true;
  async function submit(e) {
    e.preventDefault();
  }
  return (
    <>
      <Head>
        <title>SIGNUP | SCHEDULERS</title>
        <meta name="description" content="Signup to SCHEDULERS app to open the world of Schedules" />
      </Head>
      <div className="flex justify-center align-center h-screen w-screen fixed bg-white">
        <div
          className={`flex flex-col items-center justify-center bg-gradient-to-tr from-black to-zinc-800 min-w-[55%] font-bold text-7xl max-lg:hidden ${bitter.className}`}
        >
          <div className="flex flex-col">
            <span className="text-blue-300">NEW MEMBER?</span>
            <span className="text-slate-300">YOUR'RE ON</span>
            <span className="text-amber-500">RIGHT PLACE</span>
            <span className="flex bg-gradient-to-r from-blue-500 to-amber-500 bg-clip-text text-transparent">
              SCHEDULERS<span className="flex text-3xl p-1">®</span>
            </span>
          </div>
        </div>
        <div className="min-w-[45%] flex flex-col gap-10 justify-center items-center">
          <span
            className={`font-bold text-3xl bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent ${bitter.className}`}
          >
            REGISTER YOURSELF.
          </span>
          <form className="flex flex-col gap-3" onSubmit={submit}>
            <input className={inputStyle} required placeholder="Username...  " type="text" id="username" />
            <input className={inputStyle} required placeholder="First Name..." type="text" id="fName" />
            <input className={inputStyle} required placeholder="Last Name... " type="text" id="lName" />
            <input className={inputStyle} required placeholder="Email...     " type="email" id="email" />
            <input
              className={inputStyle}
              required
              placeholder="Password...  "
              type="password"
              id="password"
            />
            <span
              className="text-right text-xs font-bold text-blue-600 hover:underline hover:cursor-pointer"
              onClick={() => Router.replace("/login")}
            >
              Already a member?
            </span>
            <button id="submitBtn" type="submit" className={btnStyle}>
              SIGNUP
            </button>
          </form>
        </div>
      </div>
      {popUp && (
        <OtpPopUp
          onSubmit={onSubmit}
          username={`${document.getElementById("username").value}`}
          password={`${document.getElementById("password").value}`}
          email={popUp}
          onCancel={closePopUp}
        />
      )}
    </>
    //
  );
}
