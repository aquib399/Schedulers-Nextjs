export default function TaskDetailLayout({ _id, title, description, time, type }) {
  return (
    <div className="flex flex-col h-screen w-[40%] gap-2 border-l border-zinc-400">
      <h1 className="text-3xl my-3 font-bold">Task Detail</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero perspiciatis nobis quis expedita laborum necessitatibus nesciunt
        iusto dicta est tenetur quam nemo, pariatur quaerat ad optio rerum mollitia saepe eaque.{" "}
      </p>
      <p>{_id}</p>
      <p>{title}</p>
      <p>{description}</p>
      <p>{time}</p>
      <p>{type}</p>
    </div>
  );
}
