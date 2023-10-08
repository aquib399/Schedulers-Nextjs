import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function NotFound404() {
  const [time, setTime] = useState(4);
  const [tick1, setTick1] = useState("‎ ");
  const [tick2, setTick2] = useState("‎ ");
  const [tick3, setTick3] = useState("‎ ");
  const router = useRouter();

  useEffect(() => {
    time && setTimeout(() => setTime((time - 0.01).toFixed(2)), 10);
    setTimeout(() => {
      if (tick2 == "." && tick3 == "‎ ") setTick3(".");
      else if (tick1 == "." && tick3 == "‎ ") setTick2(".");
      else setTick1(".");
      if (tick1 == "." && tick2 == "." && tick3 == ".") {
        setTick1("‎ ");
        setTick2("‎ ");
        setTick3("‎ ");
      }
    }, 500);
    time == 0 && router.push("/");
  }, [time]);

  return (
    <>
      <Head>
        <title>Page not found</title>
        <meta
          name="description"
          content="Oops! It looks like you've wandered off the schedule list. Our apologies for the detour. Return to organized productivity with our todo app, where your ScheduleS are always on track."
        />
      </Head>
      <div className="fixed center-full bg-white font-['Cartograph_CF']">
        <h1 className="my-3 text-6xl italic font-bold animate-bounce">404! NOT FOUND!!</h1>
        <p className="italic text-center">Good news that is you're returning back to the home page in</p>
        <p className="font-mono itali">
          {time} seconds{tick1 + tick2 + tick3} {"‎ "}
        </p>
      </div>
    </>
  );
}
