import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  return (
    <>
      <Head>
        <title>Profile | SCHEDULERS</title>
        <meta
          name="description"
          content="Manage your SCHEDULERS app account and personalize your experience with our user profile feature. Update your information, preferences, and settings seamlessly. Take control of your schedule management journey with our user-friendly profile management tools."
        />
      </Head>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl my-3 font-bold">Profile</h1>
        <div className="flex flex-col items-center gap-4"></div>
        {Object.entries(userData).map(([key, val]) => {
          return (
            <div key={key}>
              {key} : {val}
            </div>
          );
        })}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <button
            type="submit"
            className="border-2 border-black p-1 px-3 w-32 rounded hover:bg-black hover:text-white transition-all"
          >
            Logout
          </button>
        </form>
      </div>
    </>
  );
}
