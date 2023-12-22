import { toast } from "react-toastify";
import axiosInstance from "../../util/axios";
import { DELETE_SCHEDULE, SET_SCHEDULE_STATUS } from "../../util/api";

export default function ScheduleDetailLayout({ id, title, description, time, type, complete, refresh }) {
  async function setScheduleStatus() {
    try {
      const { data } = await axiosInstance.post(SET_SCHEDULE_STATUS, { id });
      if (data?.error) throw { message: data?.message };
      refresh();
      toast.success(data?.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  }
  async function deleteSchedule() {
    try {
      const { data } = await axiosInstance.post(DELETE_SCHEDULE, { id });
      if (data?.error) throw { message: data?.message };
      refresh();
      toast.success(data?.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  }

  const btnStyle = `py-2 w-40 text-xs font-bold border border-black hover:bg-black hover:text-white
  hover:scale-105 active:text-white active:scale-100 active:bg-[rgb(70,70,70)] transition-all`;

  return (
    <div className="flex flex-col h-screen min-w-[40%] gap-2 p-3 overflow-scroll">
      <h1 className="text-center text-3xl font-bold">Schedule Detail</h1>
      {!id ? (
        <div className="text-xl italic animate-bounce text-center mt-8 ">Type a Schedule to view details</div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="mt-4 text-xl font-bold break-words">{title}</p>
          <p className="text-justify break-words">{description}</p>
          <p>{time}</p>
          <p>{type}</p>
          <button onClick={setScheduleStatus} className={btnStyle}>
            {complete ? "COMPLETED" : "NOT COMPLETED"}
          </button>
          <button onClick={deleteSchedule} className={btnStyle}>
            DELETE
          </button>
        </div>
      )}
    </div>
  );
}
