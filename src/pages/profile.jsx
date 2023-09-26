import Head from "next/head";
import { clearCookie } from "../../middleware/auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Profile | SCHEDULERS</title>
        <meta
          name="description"
          content="Manage your SCHEDULERS app account and personalize your experience with our user profile feature. Update your information, preferences, and settings seamlessly. Take control of your schedule management journey with our user-friendly profile management tools."
        />
      </Head>
      <h1 className="text-3xl my-3 font-bold">Profile</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, rerum delectus ex odio quod aut non obcaecati natus vero
        reprehenderit earum repellat, veritatis dignissimos quis eligendi, id iusto molestias blanditiis!
      </p>{" "}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          clearCookie();
          router.replace("/login");
        }}
      >
        <button type="submit" className="border-2 border-black p-1 px-3 w-32 rounded hover:bg-black hover:text-white transition-all">
          Logout
        </button>
      </form>
    </div>
  );
}
