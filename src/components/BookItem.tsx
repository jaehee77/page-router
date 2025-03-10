import React from "react";
import type { Bookdata } from "@/types";
import Link from "next/link";
import style from "@/styles/onebite.module.css";

export default function BookItem({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
}: Bookdata) {
  return (
    <Link href={`/book/${id}`} className={style.book_item}>
      <img src={coverImgUrl} alt="" />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
