import { useRouter } from "next/navigation";
import { verifyCookie, setCookie } from "../../middleware/auth";
import { Bitter } from "next/font/google";

const bitter = Bitter({ subsets: ["latin"], weight: [], display: "auto" });

import Head from "next/head";
export default function Login() {
  const router = useRouter();
  verifyCookie().then((found) => {
    if (found) router.replace("/");
  });
  return (
    <>
      <Head>
        <title>LOGIN | SCHEDULERS</title>
        <meta name="description" content="Login to SCHEDULERS app to open the world of schedule" />
      </Head>
      <div className="flex h-screen w-screen fixed bg-white">
        <div
          className={
            "flex flex-col items-center justify-center bg-gradient-to-tr from-black to-zinc-800 min-w-[50%] font-bold text-7xl " +
            bitter.className
          }
        >
          <div className="flex flex-col">
            <span className="text-blue-300">TASK GOES</span>
            <span className="text-slate-300">EASY WITH</span>
            <span className="flex bg-gradient-to-r from-blue-500 to-amber-500 bg-clip-text text-transparent">
              SCHEDULERS<span className="flex text-3xl p-1">®</span>
            </span>
            <span className="text-amber-500">JOIN NOW.</span>
          </div>
        </div>
        <div className="min-w-[50%] flex flex-col gap-10 justify-center items-center">

          <span
            className={
              "font-bold text-4xl w-80 bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent " + bitter.className
            }
          >
            WELCOME BACK.
          </span>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              const username = document.getElementById("username").value;
              const password = document.getElementById("password").value;
              setCookie(username, password);
              verifyCookie().then((found) => {
                if (found) router.replace("/");
                else alert("Wrong username or password");
              });
            }}
          >
            <input
              id="username"
              type="text"
              placeholder="Username or email..."
              className="w-80 py-2 px-4 border outline-none hover:border-b-black focus:border-b-black transition-all"
              required
            />
            <input
              id="password"
              type="password"
              placeholder="Password..."
              className="w-80 py-2 px-4 border outline-none hover:border-b-black focus:border-b-black transition-all"
              required
            />
            <span className="text-right text-xs font-bold text-blue-600 hover:underline hover:cursor-pointer">Forget Password?</span>
            <button
              type="submit"
              className=" py-2 w-80 font-bold tracking-[4px] border border-black hover:bg-black hover:text-white hover:scale-105 active:text-white active:scale-100 active:bg-[rgb(70,70,70)] transition-all"
            >
              LOGIN
            </button>
            <div className="flex items-center">
              <hr className="flex-grow border-black" />
              <span className="px-4">OR</span>
              <hr className="flex-grow border-black" />
            </div>
            <button
              className=" py-2 w-80 font-bold tracking-[4px] border border-black hover:bg-black hover:text-white hover:scale-105 active:text-white active:scale-100 active:bg-[rgb(70,70,70)] transition-all"
              onClick={() => {
                router.push("/signup");
              }}
            >
              SIGNUP
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

{
  /* <form
  className="flex flex-col items-center"
  onSubmit={(e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    setCookie(username, password);
    verifyCookie().then((found) => {
      if (found) router.replace("/");
    });
  }}
>
  <input placeholder="Username..." type="text" id="username" className="border-2 border-black p-1 px-3 w-48" />
  <input placeholder="Password..." type="text" id="password" className="border-2 border-black p-1 px-3 w-48" />
  <button type="submit" className="border-2 border-black p-1 px-3 w-32 rounded hover:bg-black hover:text-white 
  </butt[101 active:[rgb(70,70,70)]]
</form>; */
}