import OtpPopUp from "@/components/otpPopUp";
import Head from "next/head";
import { useState } from "react";
import { clearCookie, server } from "../../middleware/auth";
export default function Signup() {
  const [popUp, setPopUp] = useState(false);

  function closePopUp() {
    setPopUp(false);
  }
  function onSubmit() {
    setPopUp(false);
  }

  return (
    <>
      <Head>
        <title>LOGIN | SCHEDULERS</title>
        <meta name="description" content="Signup to SCHEDULERS app to open the world of tasks" />
      </Head>
      <div className="flex flex-col gap-20 justify-center items-center h-screen w-screen fixed bg-white">
        <form
          onSubmit={async (e) => {
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
            console.log(res.status);
            if (res.status == 200) setPopUp(email);
            else if (res.status == 302) {
              alert("Username or Email already in use");
            } else if (res.status == 500) alert("Error while sending email");
            else if (res.status == 409) {
              const data = await res.json();
              alert(`Please wait ${data.time} seconds before sending another OTP`);
            }
          }}
          className="border-2 border-black gap-2 py-8 flex flex-col justify-center items-center w-96"
        >
          <input placeholder="Username..." type="text" id="username" className="border-2 border-black p-1 px-3 w-48" />
          <input placeholder="First Name..." type="text" id="fName" className="border-2 border-black p-1 px-3 w-48" />
          <input placeholder="Last Name..." type="text" id="lName" className="border-2 border-black p-1 px-3 w-48" />
          <input placeholder="Email..." type="email" id="email" className="border-2 border-black p-1 px-3 w-48" />
          <input placeholder="Password..." type="password" id="password" className="border-2 border-black p-1 px-3 w-48" />
          <button type="submit" className="border-2 border-black p-1 px-3 w-32 rounded hover:bg-black hover:text-white transition-all">
            Signup
          </button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const res = confirm("Are you sure");
            if (res) clearCookie();
          }}
        >
          <button type="submit" className="border-2 border-black p-1 px-3 w-32 rounded hover:bg-black hover:text-white transition-all">
            Remove cookie
          </button>
        </form>
      </div>
      {popUp && (
        <OtpPopUp
          onSubmit={onSubmit}
          username={document.getElementById("username").value}
          password={document.getElementById("password").value}
          email={popUp}
          onCancel={closePopUp}
        />
      )}
    </>
    //
  );
}
