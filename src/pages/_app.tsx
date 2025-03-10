import GlobalLayout from "@/layout/GlobalLayout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
  disableGlobalLayout?: boolean;
};

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  // 루트 컴포넌트에서 Component.getLayout 에 전달받아
  // 전달 받은 함수(getLayout)를 호출
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  const page = getLayout(<Component {...pageProps} />);

  if (Component.disableGlobalLayout) {
    return page;
  }

  return <GlobalLayout>{page}</GlobalLayout>;
}
