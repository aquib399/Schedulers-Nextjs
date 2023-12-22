import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "../../util/axios";
import { GET_PROFILE } from "../../util/api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  function getUserData() {
    axiosInstance
      .get(GET_PROFILE)
      .then(({ data }) => {
        if (data?.error) throw { message: data?.message };
        setUserData(data?.payload);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.message || "Something went wrong ");
      });
  }
  useEffect(getUserData, []);
  function logout() {
    Cookies.remove("authToken");
    router.replace("/signin");
  }
  return (
    <>
      <Head>
        <title>Profile | SCHEDULERS</title>
        <meta
          name="description"
          content="Manage your SCHEDULERS app account and personalize your experience with our user profile feature. Update your indivation, preferences, and settings seamlessly. Take control of your schedule management journey with our user-friendly profile management tools."
        />
      </Head>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl my-3 font-bold">Profile</h1>
        <div className="flex flex-col items-center gap-4"></div>
        {userData &&
          Object.keys(userData).length &&
          Object.entries(userData).map(([key, val]) => {
            return (
              <div key={key}>
                {key} : {val}
              </div>
            );
          })}
        <div
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <button onClick={logout} className="border-2 border-black p-1 px-3 w-32 rounded hover:bg-black hover:text-white transition-all">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
