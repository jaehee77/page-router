import React from 'react';
import style from '@/styles/onebite.module.css';
import {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import { fetchOneBook } from '@/lib';
import { useRouter } from 'next/router';

/*
const mockData = {
  id: 1,
  title: '한 입 크기로 잘라 먹는 리액트',
  subTitle: '자바스크립트 기초부터 애플리케이션 배포까지',
  description:
    '자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.',
  author: '이정환',
  publisher: '프로그래밍인사이트',
  coverImgUrl:
    'https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg',
};
*/

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    fallback: false,
  };
};
/**
 * fallback 옵션 설정(없는 경로로 요청시)
 * false : 404 Not Found 반환
 * "blocking" : 즉시 생성(Like SSR)
 * -> 빌드 타임에 사전에 생성해 두지 않았던 페이지까지 페이지까지 제공
 * 사전에 생성하지 않았던 페이지를 SSR 방식으로 새롭게 생성할 때 만약 추가적인 데이터를
 * 요청해야 된다거나 해서 페이지의 생성 시간 즉, 사전 렌더링을 하는 시간이 길어질 경우에는
 * 이 시간동안 넥스트서버가 브라우저에게 아무것도 응답하지 않기 때문에 어쩔 수 없이 로딩 발생
 * 이런 상황을 원치않는다면 true 로 설정
 * true : 즉시 생성 + 페이지만 미리 반환
 */

export const getStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // 로딩이 끝난 이후에 즉, fallback 상태가 끝난 이후에도 다른 문제가 발생해서
  // 이 데이터가 정말 없는 그런 상황에서는 대처가 안되기 때문에
  // 정말 fallback 상태에 있을 때에만 로딩중이라는 것을 렌더링해 주어야 한다.

  const router = useRouter();

  // fallback 상태일 경우..
  if (router.isFallback) {
    return '로딩 중입니다.';
  }

  // 로딩이 끝났는대도 문제가 발생할 경우...
  if (!book) {
    return {
      notFound: true,
    };
  }

  const {
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = book;

  return (
    <div className={style.detail_container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url(${coverImgUrl})` }}
      >
        <img src={coverImgUrl} alt="" />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
