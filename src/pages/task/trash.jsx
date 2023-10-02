import Head from "next/head";
import TaskLayout from "@/components/TaskLayout";

export default function Trash() {
  return (
    <>
      <Head>
        <title>Deleted Schedule | SCHEDULERS</title>
        <meta
          name="description"
          content="Recover or permanently delete schedule with ease using our SCHEDULERS app's trash bin feature. Keep your Schedule list tidy and manage discarded items effortlessly. Regain control of your Schedule management with our intuitive trash bin functionality."
        />
      </Head>
      <TaskLayout />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl my-3 font-bold">Trash Bin</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex minus maiores consequuntur eius. Hic id numquam harum dignissimos
          ipsam qui ipsa eveniet autem! Tenetur sunt nesciunt iure sit, vel cupiditate.
        </p>
      </div>
    </>
  );
}
