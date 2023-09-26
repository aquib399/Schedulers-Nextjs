import Link from "next/link";

export default function NavEle({title, href, children }) {
  return (
    <Link href={href} className="h-6 w-6 hover:scale-110 transition-all">
      <abbr title={title}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="fill-zinc-800 hover:fill-blue-700 transition-all"
        >
          {children}
        </svg>
      </abbr>
    </Link>
  );
}
