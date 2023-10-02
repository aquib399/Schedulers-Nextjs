export default function TaskDetailLayout({ _id, title, description, time, type }) {
  return (
    <div className="flex flex-col h-screen min-w-[40%] gap-2 p-3">
      <h1 className="text-center text-3xl font-bold">Schedule Detail</h1>
      {!_id ? (
        <div className="text-xl italic animate-bounce text-center mt-8 ">Type a Schedule to view details</div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="mt-4 text-xl font-bold">{title}</p>
          <p className="text-justify">{description}</p>
        </div>
      )}
      <p>{time}</p>
      <p>{type}</p>
    </div>
  );
}
