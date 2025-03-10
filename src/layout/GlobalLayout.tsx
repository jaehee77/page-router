import Link from "next/link";
import { ReactNode } from "react";
import style from "@/styles/onebite.module.css";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={`/`}>📚 ONEBITE BOOKS</Link>
      </header>
      <main>{children}</main>
      <footer className={style.footer}>제작 @jaiyah</footer>
    </div>
  );
}
