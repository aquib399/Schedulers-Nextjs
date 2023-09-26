import Head from "next/head";
import TaskLayout from "@/components/TaskLayout";
import TaskDetailLayout from "@/components/TaskDetailLayout";
import { server, getCookie } from "../../../middleware/auth";
import { useState, useEffect } from "react";

export default function All() {
  let cnt = 1;
  const [task, setTask] = useState([]);
  const [userTask, setUserTask] = useState([]);
  const { username, password } = getCookie();
  useEffect(() => {
    fetch(server + "/getTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then(setTask)
      .catch((err) => {
        console.log(err);
        alert("Something gone wrong");
      });
  }, []);
  return (
    <>
      <Head>
        <title>All Task | SCHEDULERS</title>
        <meta
          name="description"
          content="Stay organized and boost productivity with our SCHEDULERS app for every SCHEDULE. Easily plan, track, and complete your to-dos efficiently. Manage your time effectively and accomplish your goals with our user-friendly task management tool."
        />
      </Head>
      <TaskLayout />
      <div className="flex">
        <div className="flex flex-col gap-4 pb-5 w-[60%] items-center px-12 max-h-[100vh] overflow-y-scroll scrollbar">
          <h1 className="text-3xl my-3 font-bold">All Task</h1>
          {task.map((e) => {
            return (
              <div
                key={e._id}
                className="flex flex-col items-center border border-zinc-800 px-4 gap-1 pt-4 pb-1 pb w-full h-auto rounded-xl text-gray-700 text-sm hover:bg-zinc-900 group hover:text-white transition-all"
                onClick={() => {
                  setUserTask(e);
                }}
              >
                <div className="w-full text-xl font-bold tracking-wider text-black group-hover:text-white transition-all">
                  {e.title.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                  })}
                </div>
                <div className="w-full line-clamp-1">
                  {e.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam libero eum possimus quas? Nulla earum quam
                  aliquid autem placeat optio nostrum. Dolorum iste asperiores laudantium perferendis quos modi nemo dolores.
                </div>
                <div className="flex justify-between items-center w-full text-xs ">
                  <span className="border py-1 px-2 rounded-3xl flex items-center group-hover:border-[rgb(100,100,100)] transition-[border]">
                    {e.type}
                  </span>
                  <span className="">{e.time}</span>
                </div>
              </div>
            );
          })}
        </div>
        <TaskDetailLayout
          _id={userTask._id}
          title={userTask.title}
          description={userTask.description}
          time={userTask.time}
          type={userTask.type}
        />
      </div>
    </>
  );
}
