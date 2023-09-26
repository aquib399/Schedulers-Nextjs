import Head from "next/head";
import TaskLayout from "@/components/TaskLayout";
import InboxBar from "@/components/inboxBar";

export default function Inbox() {
  return (
    <>
      <Head>
        <title>Inbox | SCHEDULERS</title>
        <meta
          name="description"
          content="Streamline communication and collaboration with our SCHEDULERS app's message inbox feature. Easily exchange task-related messages, updates, and feedback with your team or collaborators. Simplify task coordination and enhance productivity with our integrated messaging solution."
        />
      </Head>
      <TaskLayout />
      <div className="flex">
        <div className="flex flex-col w-[60%] gap-2">
          <h1 className="text-3xl my-3 font-bold">Inbox</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex minus maiores consequuntur eius. Hic id numquam harum dignissimos
            ipsam qui ipsa eveniet autem! Tenetur sunt nesciunt iure sit, vel cupiditate.
          </p>
        </div>
        <InboxBar />
      </div>
    </>
  );
}
