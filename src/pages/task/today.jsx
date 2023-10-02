import TaskLayout from "@/components/TaskLayout";
import TaskDetailLayout from "@/components/TaskDetailLayout";
import Head from "next/head";

export default function Today() {
  return (
    <>
      <Head>
        <title>Today Schedule | SCHEDULERS</title>
        <meta
          name="description"
          content="Enhance your daily productivity with our SCHEDULERS app's daily schedule management feature. Efficiently plan, organize, and complete your daily to-dos. Simplify your routine and stay on top of your goals using our user-friendly schedule management tool."
        />
      </Head>
      <TaskLayout />
      <div className="flex">
        <div className="flex flex-col gap-2 w-[60%]">
          <h1 className="text-3xl my-3 font-bold">Today</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex minus maiores consequuntur eius. Hic id numquam harum dignissimos
            ipsam qui ipsa eveniet autem! Tenetur sunt nesciunt iure sit, vel cupiditate.
          </p>
        </div>
        <TaskDetailLayout/>
      </div>
    </>
  );
}
