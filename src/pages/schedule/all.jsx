import Head from "next/head";
import ScheduleLayout from "@/components/ScheduleLayout";
import ScheduleDetailLayout from "@/components/ScheduleDetailLayout";
import { useState } from "react";

export default function All() {
  const spanStyle =
    "flex items-center py-1 px-2 border rounded-3xl group-hover:border-[rgb(150,150,150)] transition-[border]";
  const [schedule, setSchedule] = useState([]);
  const [userSchedule, setUserSchedule] = useState([]);

  return (
    <>
      <Head>
        <title>All Schedule | SCHEDULERS</title>
        <meta
          name="description"
          content="Stay organized and boost productivity with our SCHEDULERS app for every SCHEDULE. Easily plan, track, and complete your to-dos efficiently. Manage your time effectively and accomplish your goals with our user-friendly Schedule management tool."
        />
      </Head>
      <ScheduleLayout />
      <div className="flex w-full">
        <div
          className={`flex flex-col gap-4 pb-5 ${
            schedule.length ? "min-w-[60%] max-w-[60%]" : "min-w-full"
          } items-center px-12 max-h-[100vh] overflow-y-scroll scrollbar`}
        >
          <h1 className="text-3xl my-3 font-bold">All Schedule</h1>
          {schedule.map((e) => {
            {
              console.log(e);
            }
            return (
              <div
                key={e._id}
                className="flex flex-col items-center border border-zinc-800 px-4 gap-1 pt-4 pb-1 pb w-full h-auto rounded-xl text-gray-700 text-sm hover:bg-zinc-900 group hover:text-white transition-all"
                onClick={() => {
                  setUserSchedule(e);
                }}
              >
                <div className="break-words w-full text-xl font-bold tracking-wider text-black group-hover:text-white transition-all">
                  {e.title.replace(
                    /\w\S*/g,
                    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  )}
                </div>
                <div className="w-full break-words line-clamp-2">{e.description}</div>
                <div className="flex justify-between items-center w-full text-xs mt-1">
                  <span className={spanStyle}>{e.type}</span>
                  <span
                    className={spanStyle + ` gap-x-2 ${e.completed && "bg-blue-100 group-hover:text-black"}`}
                  >
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
