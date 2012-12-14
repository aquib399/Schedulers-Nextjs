import Head from "next/head";
import ScheduleLayout from "@/components/ScheduleLayout";
import { getCookie, server } from "../../../middleware/auth";
import { ToastContainer, toast } from "react-toastify";

export default function Schedule() {
  return (
    <>
      <Head>
        <title>Schedules | SCHEDULERS</title>
        <meta
          name="description"
          content="Optimize your schedule organization with our powerful SCHEDULERS app feature. Effortlessly categorize, prioritize, and arrange your Schedules for maximum efficiency. Take control of your daily schedule and boost productivity like never before."
        />
      </Head>
      <ScheduleLayout />
      <div className="center-full">
        <h1 className="text-4xl font-bold">Add a Schedule</h1>
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
              required
            />
          </div>
          <div className="mx-2">
            <label htmlFor="option">Select Type :</label>
            <select
              id="option"
              className="rounded-lg border-b border-zinc-800 m-2 p-2 w-40  outline-none hover:shadow-[0_1px_2px] focus:shadow-[0_1px_2px] transition-all"
              defaultValue="default"
              required
            >
              <option value="Daily">Daily</option>
              <option value="Personal">Personal</option>
              <option value="School">School</option>
              <option value="Office">Office</option>
              <option value="Project">Project</option>
              <option value="Shopping">Shopping</option>
              <option value="Preparation">Preparation</option>
              <option value="Leisure">Leisure</option>
              <option value="Occasion">Occasion</option>
              <option value="Other">Others...</option>
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
  const schedule = { title, description, time, type };
  console.log(schedule);
  const { username, password } = getCookie();
  try {
    const res = await fetch(server + "/addSchedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, schedule }),
    }).catch((err) => {
      console.log(err);
      alert("Validation or server error");
    });
    alert("schedule Added successfully");
    toast.success("schedule Added successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } catch (err) {
    console.error(err);
    alert("something went wrong from client");
  }
}
