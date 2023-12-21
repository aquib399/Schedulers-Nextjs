import Head from "next/head";
export default function Settings() {
  let equal = false;
  function match() {}
  async function save(e) {
    e.preventDefault();
    if (!equal) {
      alert("Password must be matched");
      return;
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
        <form className="flex flex-col justify-center items-center h-[80vh] gap-y-10" onSubmit={save}>
          <div className="flex flex-col">
            <span>NAME</span>
            <div className="flex gap-4">
              <input id="fName" type="text" placeholder="First Name..." className={inputstyle} required />
              <input id="lName" type="text" placeholder="Last Name..." className={inputstyle} required />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="flex justify-between">
              Password
              <span className="text-xs invisible font-bold text-red-600" id="matched">
                Must be equal*
              </span>
            </span>
            <div className="flex flex-col gap-4">
              <input
                id="oldPassword"
                type="password"
                placeholder="Old Password..."
                className={inputstyle}
                required
                onKeyUp={match}
              />
              <div className="flex gap-4">
                <input
                  id="password1"
                  type="password"
                  placeholder="New Password..."
                  className={inputstyle}
                  required
                  onKeyUp={match}
                />
                <input
                  id="password2"
                  type="password"
                  placeholder="Retype Password..."
                  className={inputstyle}
                  required
                  onKeyUp={match}
                />
              </div>
            </div>
          </div>
          <button className="py-2 w-40 font-bold border border-black hover:bg-black hover:text-white hover:scale-105 active:text-white active:scale-100 active:bg-[rgb(70,70,70)] transition-all">
            SAVE
          </button>
        </form>
      </div>
    </>
  );
}
