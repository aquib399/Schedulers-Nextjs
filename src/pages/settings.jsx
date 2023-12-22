import Head from "next/head";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../util/axios";
import { EDIT_PROFILE, GET_PROFILE } from "../../util/api";
export default function Settings() {
  const [profileData, setProfileData] = useState({});
  async function save(e) {
    e.preventDefault();
    const fName = e.target.fName.value;
    const lName = e.target.lName.value;
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;
    const matchPassword = e.target.matchPassword.value;
    if (newPassword !== matchPassword) {
      toast.error("Password not matched");
      return;
    }
    if (newPassword.toString().length < 8) {
      toast.error("Password should be at least 8 characters long");
      return;
    }
    const reqBody = { oldPassword, newPassword, fName, lName };
    try {
      const { data } = await axiosInstance.post(EDIT_PROFILE, reqBody);
      if (data?.error) throw { message: data?.message };
      toast.success(data?.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  }
  async function getProfile() {
    try {
      const { data } = await axiosInstance.get(GET_PROFILE);
      if (data?.error) throw { message: data?.message };
      setProfileData(data.payload);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  }
  const inputstyle = `w-60 py-2 px-4 border outline-none hover:border-b-black focus:border-b-black transition-all`;
  return (
    <>
      <Head>
        <title>Setting | SCHEDULERS</title>
        <meta
          name="description"
          content="Customize your SCHEDULERS app experience effortlessly with our settings page. Tailor the app to your preferences, from notifications to themes. Take control of your schedule management environment and make it truly your own with our intuitive settings."
        />
      </Head>
      <div className="w-full flex-col">
        <h1 className="text-3xl my-3 font-bold text-center">Settings</h1>
        <form onSubmit={save} className="flex flex-col justify-center items-center h-[80vh] gap-y-10">
          <button
            type="button"
            onClick={getProfile}
            className="py-2 px-4 w-auto font-bold border border-black hover:bg-black hover:text-white hover:scale-105 active:text-white active:scale-100 active:bg-[rgb(70,70,70)] transition-all"
          >
            Bring old details
          </button>
          <div className="flex flex-col">
            <span>NAME</span>
            <div className="flex gap-4">
              <input /* value={profileData?.fName || ""} */ name="fName" type="text" placeholder="First Name..." className={inputstyle} required />
              <input /* value={profileData?.lName || ""} */ name="lName" type="text" placeholder="Last Name..." className={inputstyle} required />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="flex justify-between">
              Password
              <span className="text-xs invisible font-bold text-red-600" name="matched">
                Must be equal*
              </span>
            </span>
            <div className="flex flex-col gap-4">
              <input name="oldPassword" type="password" placeholder="Old Password..." className={inputstyle} required />
              <div className="flex gap-4">
                <input name="newPassword" type="password" placeholder="New Password..." className={inputstyle} required />
                <input name="matchPassword" type="password" placeholder="Retype Password..." className={inputstyle} required />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="py-2 w-40 font-bold border border-black hover:bg-black hover:text-white hover:scale-105 active:text-white active:scale-100 active:bg-[rgb(70,70,70)] transition-all"
          >
            SAVE
          </button>
        </form>
      </div>
    </>
  );
}
