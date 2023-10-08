import Link from "next/link";

export default function SideEle({ children, text, href }) {
  return (
    <Link
      href={"/schedule" + href}
      className="group flex items-center gap-2 w-full ull p-2 rounded hover:bg-zinc-800 hover:text-white transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-zinc-800 group-hover:fill-white transition-all"
      >
        {children}
      </svg>
      <span>{text}</span>
    </Link>
  );
}
