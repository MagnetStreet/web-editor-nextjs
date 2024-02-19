import PageEditor from '@/components/pages/PageEditor';

import { PageParams } from '@/types';

const loadDataFromApi = async () => {
  try {
    const LOCAL_API_BASE_URL = process.env.LOCAL_API_BASE_URL;
    //const slug = query.slug;
    let [visitorInfo, productInfo] = await Promise.all([
      await fetch(`${LOCAL_API_BASE_URL}/visitorInfo`),
      await fetch(`${LOCAL_API_BASE_URL}/productInformation`),
    ]);

    // call the next request here with
    productInfo = await productInfo?.json();
    visitorInfo = await visitorInfo?.json();
    return {
      productInfo,
      visitorInfo,
    };
  } catch (error) {
    console.log('Error fetching data:', error);
    return {
      productInfo: null,
      visitorInfo: null,
    };
  }
};

const Home = async ({ searchParams }: PageParams) => {
  const pids = searchParams?.pids;
  const qs = searchParams?.qs;
  const m = searchParams?.qs;

  const { productInfo, visitorInfo } = await loadDataFromApi();
  return <PageEditor visitorInfo={visitorInfo} productInfo={productInfo} />;
};
export default Home;
