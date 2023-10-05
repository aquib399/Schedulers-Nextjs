import { getCookie, server } from "../../middleware/auth";

export default function TaskDetailLayout({ _id, title, description, time, type, complete }) {
  async function completeTask() {
    const btn = document.getElementById("complete");
    btn.innerText = btn.innerText == "COMPLETED" ? "NOT COMPLETED" : "COMPLETED";
    btn.disabled = true;

    const { username, password } = getCookie();
    const res = await fetch(server + "/completeTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, _id }),
    }).catch((err) => {
      console.error(err);
      alert("Something went wrong while updating");
    });
    if (res?.status == 200) {
      alert("Task completed successfully");
      const msg = document.getElementById("completion");
      if (msg.innerText == "Pending") msg.innerText = "Completed";
      else msg.innerText = "Pending";
    } else if (res?.status == 404) alert("Something went wrong; cant update");
    btn.disabled = false;
  }
  async function deleteTask() {
    const btn = document.getElementById("delete");
    const flag = confirm("Are you sure you want to delete this task");
    if (flag) {
      const { username, password } = getCookie();
      const res = await fetch(server + "/deleteTask", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, _id }),
      }).catch((err) => {
        console.error(err);
        alert("Something went wrong, refresh this page");
      });
      if (res?.status == 200) alert("Task deleted succesfully");
      else if (res?.status == 404) alert(`Not found; code : ${res?.status}`);
    }
  }

  const btnStyle = `py-2 w-40 text-xs font-bold border border-black hover:bg-black hover:text-white
  hover:scale-105 active:text-white active:scale-100 active:bg-[rgb(70,70,70)] transition-all`;

  return (
    <div className="flex flex-col h-screen min-w-[40%] gap-2 p-3">
      <h1 className="text-center text-3xl font-bold">Schedule Detail</h1>
      {!_id ? (
        <div className="text-xl italic animate-bounce text-center mt-8 ">Type a Schedule to view details</div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="mt-4 text-xl font-bold">{title}</p>
          <p className="text-justify">{description}</p>
          <p>{time}</p>
          <p>{type}</p>
          <button id="complete" onClick={completeTask} className={btnStyle}>
            {complete ? "COMPLETED" : "NOT COMPLETED"}
          </button>
          <button id="delete" onClick={deleteTask} className={btnStyle}>
            DELETE
          </button>
        </div>
      )}
    </div>
  );
}
