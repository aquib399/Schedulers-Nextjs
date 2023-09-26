import Head from "next/head";
import TaskLayout from "@/components/TaskLayout";
import { getCookie, server } from "../../../middleware/auth";

export default function Task() {
  return (
    <>
      <Head>
        <title>Tasks | SCHEDULERS</title>
        <meta
          name="description"
          content="Optimize your task organization with our powerful SCHEDULERS app feature. Effortlessly categorize, prioritize, and arrange your tasks for maximum efficiency. Take control of your daily schedule and boost productivity like never before."
        />
      </Head>
      <TaskLayout />
      <div className="center-full">
        <h1 className="text-4xl font-bold">Add a task</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex flex-col w-full p-4 gap-y-4"
        >
          <input
            type={"text"}
            placeholder={"Title *"}
            id="title"
            className="rounded-lg border-b border-zinc-800 p-4 text-3xl font-bold italic outline-none hover:shadow-[0_1px_2px] focus:shadow-[0_1px_2px] transition-all"
            required
          />
          <textarea
            type={"text"}
            placeholder={"Description *"}
            id="description"
            className="rounded-lg border-b border-zinc-800 p-3 text-xl h-28 tracking-wide outline-none resize-none hover:shadow-[0_1px_2px] focus:shadow-[0_1px_2px] transition-all"
            required
          />
          <div className="flex items-center mx-2">
            <label htmlFor="time">Date & Time :</label>
            <input
              type={"datetime-local"}
              id="time"
              className="rounded-lg border-b border-zinc-800 m-2 p-1 text-center outline-none hover:shadow-[0_1px_2px] focus:shadow-[0_1px_2px] transition-all"
            />
          </div>
          <div className="mx-2">
            <label htmlFor="option">Select Type :</label>
            <select
              id="option"
              className="rounded-lg border-b border-zinc-800 m-2 p-2 w-40  outline-none hover:shadow-[0_1px_2px] focus:shadow-[0_1px_2px] transition-all"
              defaultValue="default"
            >
              <option value="default" disabled hidden>
                Please select...
              </option>
              <option value="daily">Daily</option>
              <option value="daily">Personal</option>
              <option value="school">School</option>
              <option value="office">Office</option>
              <option value="daily">Project</option>
              <option value="office">Shopping</option>
              <option value="office">Preparation</option>
              <option value="office">Leisure</option>
              <option value="occasion">Occasion</option>
              <option value="other">Others...</option>
            </select>
          </div>

          <button
            type="submit"
            className="rounded-lg border border-zinc-800 bg-white w-[99%] self-center p-3 text-lg font-bold outline-none shadow-[0_2px_0_rgb(39,39,42)] hover:shadow-[0_6px_0_rgb(39,39,42)] hover:translate-y-[-4px] active:translate-y-0 active:shadow-[0_2px_0_rgb(39,39,42)] transition-all"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
}
async function submit() {
  const [title, description, time, type] = ["title", "description", "time", "option"].map((e) => document.getElementById(e).value);
  const task = { title, description, time, type };
  const { username, password } = getCookie();
  try {
    const res = await fetch(server + "/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, task }),
    }).catch((err) => {
      console.log(err);
      alert("Validation or server error");
    });
    alert("Task Added successfully");
  } catch (err) {
    console.error(err);
    alert("something went wrong from client");
  }
}
