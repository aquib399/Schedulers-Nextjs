import OtpPopUp from "@/components/otpPopUp";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import { server } from "../../middleware/auth";
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
  async function submit(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const fName = document.getElementById("fName").value;
    const lName = document.getElementById("lName").value;
    const email = document.getElementById("email").value;
    const userData = { username, password, fName, lName, email };
    const res = await fetch(server + "/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).catch((err) => {
      console.log(err);
      alert("Server error");
    });
    console.log(res?.status);
    if (res?.status == 200) {
      setPopUp(email);
      console.log(popUp);
    } else if (res?.status == 302) {
      alert("Username or Email already in use");
    } else if (res?.status == 500) alert("Error while sending email");
    else if (res?.status == 409) {
      const data = await res?.json();
      alert(`Please wait ${data.time} seconds before sending another OTP`);
    }
  }

  return (
    <>
      <Head>
        <title>SIGNUP | SCHEDULERS</title>
        <meta name="description" content="Signup to SCHEDULERS app to open the world of tasks" />
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
            <input placeholder="Username..." type="text" id="username" className={inputStyle} />
            <input placeholder="First Name..." type="text" id="fName" className={inputStyle} />
            <input placeholder="Last Name..." type="text" id="lName" className={inputStyle} />
            <input placeholder="Email..." type="email" id="email" className={inputStyle} />
            <input placeholder="Password..." type="password" id="password" className={inputStyle} />
            <span
              className="text-right text-xs font-bold text-blue-600 hover:underline hover:cursor-pointer"
              onClick={() => Router.replace("/login")}
            >
              Already a member?
            </span>
            <button type="submit" className={btnStyle}>
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
