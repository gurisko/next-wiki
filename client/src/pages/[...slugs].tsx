import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {ParsedUrlQuery} from 'querystring';
import * as React from 'react';

import {EditPage} from '../components/EditPage';
import {SITE_NAME} from '../lib/constants';
import {parseQueryString} from '../lib/queryString';
import {revertSlugify, slugify} from '../lib/slugify';
import {getPage, getPages} from '../services/pages';

const PAGE_REVALIDATION = 1; // in seconds

type WikiPageProps = {
  page: {
    title: string;
    path: string;
    rawContent: string;
    markdownContent: string;
  };
};

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<WikiPageParams>
> {
  const pages = [];
  for await (const page of getPages()) {
    pages.push(page);
  }

  return {
    paths: pages.map((page) => ({
      params: {
        slugs: [page.path] as string[],
      },
    })),
    fallback: true, // Enable statically generating additional pages
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<WikiPageParams>): Promise<
  GetStaticPropsResult<WikiPageProps>
> {
  const {slugs} = params;
  const slug = slugs.join('/');
  const slugified = slugify(slugs);

  if (slug !== slugified) {
    return {
      redirect: {
        permanent: true,
        destination: `/${slugified}`,
      },
      revalidate: false,
    };
  }

  const page = await getPage(slug);
  return {
    props: {page},
    revalidate: PAGE_REVALIDATION,
  };
}

interface WikiPageParams extends ParsedUrlQuery {
  slugs: string[];
}

function WikiPage({page}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const isEdit = 'edit' in parseQueryString<{edit: string}>(router.asPath);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (isEdit) {
    if (!page) {
      const {slugs} = router.query;
      const slug = revertSlugify(
        (Array.isArray(slugs) ? slugs : [slugs]).join('/'),
      );
      return <EditPage title={slug} />;
    }
    return <EditPage content={page.markdownContent} title={page.title} />;
  }

  if (!page) {
    return <h1>NOT FOUND</h1>;
  }

  return (
    <article>
      <Head>
        <title>
          {SITE_NAME} | {page.title}
        </title>
      </Head>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{__html: page.rawContent}} />
    </article>
  );
}

export default WikiPage;
