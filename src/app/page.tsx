import PageEditor, {
  EditorPageServerData,
} from '@/components/pages/PageEditor';

import documentInfoMock from '@/mocks/documentInfoMock';

import { PageParams } from '@/types';

const loadDataFromApi = async (): Promise<EditorPageServerData> => {
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
      documentInformationMock: documentInfoMock,
    };
  } catch (error) {
    console.log('Error fetching data:', error);
    return {
      documentInformationMock: documentInfoMock,
    };
  }
};

const Home = async ({ searchParams }: PageParams) => {
  const pids = searchParams?.pids;
  const isTest = searchParams?.isTest;
  const qs = searchParams?.qs;
  const m = searchParams?.qs;

  const { productInfo, visitorInfo, documentInformationMock } =
    await loadDataFromApi();
  return (
    <PageEditor
      visitorInfo={visitorInfo}
      productInfo={productInfo}
      isTest={!!isTest || false}
      documentInformationMock={documentInformationMock} //TODO remove
    />
  );
};
export default Home;
