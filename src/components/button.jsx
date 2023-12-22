import { useState } from "react";
import Loader from "./loader";

export default function Button({ key, type, className, onClick, children, loaderClassname, stop }) {
  const [loading, setLoading] = useState(false);
  return (
    <button key={key} type={type} onClick={onClick} className={"flex justify-center items-center " + className}>
      {loading || stop ? <Loader className={loaderClassname} /> : children}
    </button>
  );
}
