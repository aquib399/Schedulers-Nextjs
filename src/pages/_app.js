import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { verifyCookie } from "../../middleware/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname == "/signup") return;
    verifyCookie().then((found) => {
      if (!found) router.replace("/login");
    });
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
