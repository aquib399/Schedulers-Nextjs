import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <title>Home | SCHEDULERS</title>
        <meta
          name="description"
          content="Discover the ultimate SCHEDULERS app to streamline your life. Simplify task management, set priorities, and achieve your goals effortlessly. Take control of your day with our intuitive and feature-rich SCHEDULERS application"
        />
      </Head>
      <div className="flex flex-col">
        <h1 className="text-3xl my-3 font-bold">Home</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam reprehenderit eveniet quisquam ad enim consectetur
          voluptatum! Fuga sequi numquam, molestiae placeat maiores, repellendus fugit porro exercitationem beatae labore eius.
        </p>
      </div>
    </>
  );
}
