import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setSession from "../../util/session";

export default function App({ Component, pageProps }) {
  setSession();
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
