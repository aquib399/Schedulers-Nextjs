import NextTopLoader from "nextjs-toploader";
import Navbar from "./navbar";
import { Comfortaa } from "next/font/google";
const comfortaa = Comfortaa({ subsets: ["latin"], weight: [], display: "auto" });

export default function layout({ children }) {
  return (
    <main className={`${comfortaa.className} flex`}>
      <NextTopLoader />
      <Navbar user={"Aquib"} premium={false} />
      {children}
    </main>
  );
}
