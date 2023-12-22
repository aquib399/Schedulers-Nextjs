import Head from "next/head";
import ScheduleLayout from "@/components/ScheduleLayout";
import { toast } from "react-toastify";
import { ADD_SCHEDULE } from "../../../util/api";
import axiosInstance from "../../../util/axios";

export default function Schedule() {
  async function submit(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const time = e.target.time.value;
    const type = e.target.type.value;
    const reqBody = { title, description, time, type };
    try {
      const { data } = await axiosInstance.post(ADD_SCHEDULE, reqBody);
      if (data?.error) throw { message: data?.message };
      toast.success(data?.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  }
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
        <form onSubmit={submit} className="flex flex-col w-full p-4 gap-y-4">
          <input
            type={"text"}
            placeholder={"Title *"}
            name="title"
            className="rounded-lg border-b border-zinc-800 p-4 text-3xl font-bold italic outline-none hover:shadow-[0_1px_2px] focus:shadow-[0_1px_2px] transition-all"
            required
          />
          <textarea
            type={"text"}
            placeholder={"Description *"}
            name="description"
            className="rounded-lg border-b border-zinc-800 p-3 text-xl h-28 tracking-wide outline-none resize-none hover:shadow-[0_1px_2px] focus:shadow-[0_1px_2px] transition-all"
            required
          />
          <div className="flex items-center mx-2">
            <label htmlFor="time">Date & Time :</label>
            <input
              type={"datetime-local"}
              name="time"
              className="rounded-lg border-b border-zinc-800 m-2 p-1 text-center outline-none hover:shadow-[0_1px_2px] focus:shadow-[0_1px_2px] transition-all"
              required
            />
          </div>
          <div className="mx-2">
            <label htmlFor="option">Select Type :</label>
            <select
              name="type"
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
