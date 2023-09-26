import TaskLayout from "@/components/TaskLayout";
import Head from "next/head";

export default function Completed() {
  return (
    <>
      <Head>
        <title>Completed | SCHEDULERS</title>
        <meta
          name="description"
          content="Track your achievements and stay organized with our SCHEDULERS app's completed  page. Review and celebrate your accomplished goals and completed to-dos. Keep a clear record of your successes and boost motivation with our  management tool."
        />
      </Head>
      <TaskLayout />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl my-3 font-bold">Completed</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex minus maiores consequuntur eius. Hic id numquam harum dignissimos
          ipsam qui ipsa eveniet autem! Tenetur sunt nesciunt iure sit, vel cupiditate.
        </p>
      </div>
    </>
  );
}
