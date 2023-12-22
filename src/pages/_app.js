import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setSession from "../../util/session";
import axiosInstance from "../../util/axios";
import { VALIDATE } from "../../util/api";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    setSession();
    axiosInstance.post(VALIDATE).catch(console.error);
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
