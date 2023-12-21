import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import setSession from "../../util/session";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token && token.toString().length > 70) setSession(token);
    else router.push("/login");
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
