import Head from "next/head";
import ScheduleLayout from "@/components/ScheduleLayout";
import ScheduleDetailLayout from "@/components/ScheduleDetailLayout";
import { server, getCookie } from "../../../middleware/auth";
import { useState, useEffect } from "react";

export default function Completed() {
  const spanStyle = "flex items-center py-1 px-2 border rounded-3xl group-hover:border-[rgb(150,150,150)] transition-[border]";
  const [schedule, setSchedule] = useState([]);
  const [userSchedule, setUserSchedule] = useState([]);
  const { username, password } = getCookie();
  useEffect(() => {
    fetch(server + "/getSchedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then(setSchedule)
      .catch((err) => {
        console.log(err);
        alert("Something gone wrong");
      });
  }, []);
  return (
    <>
      <Head>
        <title>Completed Schedule | SCHEDULERS</title>
        <meta name="description" content="Track your completed schedules" />
      </Head>
      <ScheduleLayout />
      <div className="flex w-full">
        <div
          className={`flex flex-col gap-4 pb-5 ${
            schedule.length ? "min-w-[60%]" : "min-w-full"
          } items-center px-12 max-h-[100vh] overflow-y-scroll scrollbar`}
        >
          <h1 className="text-3xl my-3 font-bold">Completed Schedule</h1>
          {schedule.map((e) => {
            if (e.completed)
              return (
                <div
                  key={e._id}
                  className="flex flex-col items-center border border-zinc-800 px-4 gap-1 pt-4 pb-1 pb w-full h-auto rounded-xl text-gray-700 text-sm hover:bg-zinc-900 group hover:text-white transition-all"
                  onClick={() => {
                    setUserSchedule(e);
                  }}
                >
                  <div className="w-full text-xl font-bold tracking-wider text-black group-hover:text-white transition-all">
                    {e.title.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}
                  </div>
                  <div className="w-full line-clamp-1">{e.description}</div>
                  <div className="flex justify-between items-center w-full text-xs mt-1">
                    <span className={spanStyle}>{e.type}</span>
                    <span id="completion" className={spanStyle + ` gap-x-2 ${e.completed && "bg-blue-100 group-hover:text-black"}`}>
                      {e.completed ? "Completed" : "Pending"}
                    </span>
                    <span className={spanStyle}>{e.time}</span>
                  </div>
                </div>
              );
          })}
        </div>
        {schedule.length ? (
          <ScheduleDetailLayout
            _id={userSchedule._id}
            title={userSchedule.title}
            description={userSchedule.description}
            time={userSchedule.time}
            type={userSchedule.type}
            completed={userSchedule.completed}
          />
        ) : null}
      </div>
    </>
  );
}
