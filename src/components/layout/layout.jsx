import Navbar from "./navbar";
import { Comfortaa } from "next/font/google";
const comfortaa = Comfortaa({ subsets: ["latin"], weight: [], display: "auto" });

export default function layout({ children }) {
  return (
    <div className={`${comfortaa.className} flex`}>
      <Navbar user={"Aquib"} premium={false} />
      {children}
    </div>
  );
}
