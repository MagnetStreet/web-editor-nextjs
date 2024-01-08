import ExamplePage from '@/components/pages/ExamplePage';

import { getApiResponse } from '@/utils/shared/get-api-response';

import { NpmData, PageParams } from '@/types';

const loadDataFromApi = async (slug?: string) => {
  if (slug === 'testError500') {
    throw new Error('This is mock a ssr 500 test error');
  }

  // Fetch & cache data from 2 remote samples APIs test
  const [reactNpmData, nextJsNpmData] = await Promise.all([
    getApiResponse<NpmData>({
      apiEndpoint: 'https://registry.npmjs.org/react/latest',
      revalidate: 60 * 60 * 24, // 24 hours cache
    }),
    getApiResponse<NpmData>({
      apiEndpoint: 'https://registry.npmjs.org/next/latest',
      revalidate: 0, // no cache
    }),
  ]);

  return {
    reactNpmData,
    nextJsNpmData,
  };
};

const Home = async ({ searchParams }: PageParams) => {
  const slug = searchParams?.slug;
  const { reactNpmData, nextJsNpmData } = await loadDataFromApi(slug);

  return (
    <ExamplePage
      reactVersion={reactNpmData?.version}
      nextJsVersion={nextJsNpmData?.version}
    />
  );
};

export default Home;
