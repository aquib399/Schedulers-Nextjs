import Head from "next/head";
import { Bitter } from "next/font/google";
import { useRouter } from "next/router";
import axiosInstance from "../../util/axios";
import setSession from "../../util/session";
import { SIGN_IN } from "../../util/api";
import { toast } from "react-toastify";
const bitter = Bitter({ subsets: ["latin"], weight: [], display: "auto" });

export default function Login() {
  const router = useRouter();
  async function userLogin(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const reqBody = { username, password };
    try {
      const { data } = await axiosInstance.post(SIGN_IN, reqBody);
      if (data?.error) throw { message: data?.message };
      toast.success(data?.message);
      setSession(data?.payload?.token, true);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  }

  return (
    <>
      <Head>
        <title>LOGIN | SCHEDULERS</title>
        <meta name="description" content="Login to SCHEDULERS app to open the world of schedule" />
      </Head>
      <div className="flex h-screen w-screen justify-center fixed bg-white">
        <div
          className={`flex flex-col items-center justify-center bg-gradient-to-tr from-black to-zinc-800 min-w-[55%] font-bold md:text-6xl lg:text-7xl max-md:hidden duration-1000 ${bitter.className}`}
        >
          <div className="flex flex-col">
            <span className="text-blue-300">WORK GOES</span>
            <span className="text-slate-300">EASY WITH</span>
            <span className="flex bg-gradient-to-r from-blue-500 to-amber-500 bg-clip-text text-transparent">
              SCHEDULERS<span className="flex text-3xl p-1">®</span>
            </span>
            <span className="text-amber-500">JOIN NOW.</span>
          </div>
        </div>
        <div className="min-w-[45%] flex flex-col gap-10 justify-center items-center">
          <span
            className={`font-bold text-4xl w-80 bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent ${bitter.className}`}
          >
            WELCOME BACK.
          </span>
          <form className="flex flex-col gap-3" onSubmit={userLogin}>
            <input
              name="username"
              type="text"
              placeholder="Username or email..."
              className="w-80 py-2 px-4 border outline-none hover:border-b-black focus:border-b-black transition-all"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password..."
              className="w-80 py-2 px-4 border outline-none hover:border-b-black focus:border-b-black transition-all"
              required
            />
            <span className="text-right text-xs font-bold text-blue-600 hover:underline hover:cursor-pointer">
              Forget Password?
            </span>
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
              type="button"
              className="py-2 w-80 font-bold tracking-[4px] border border-black hover:bg-black hover:text-white hover:scale-105 active:text-white active:scale-100 active:bg-[rgb(70,70,70)] transition-all"
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
