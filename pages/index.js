import { useContext } from "react";
import Link from "next/link";
import { UserContext } from "./_app";

export default function Index() {
  const context = useContext(UserContext);
  return <>{!context && <Link href="/signin">Авторизация</Link>}</>;
}
