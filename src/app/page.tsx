import PageEditor from '@/components/pages/PageEditor';
import { PageParams } from '@/types';
import { getApiResponse } from '@/utils/shared/get-api-response';
import { postApiResponse } from '@/utils/shared/post-api-response';

const loadDataFromApi = async () => {
  const formData = new URLSearchParams();
  formData.append(
    'productQuantityJSON',
    JSON.stringify({
      productsAndQuantities: [{ '88340': 100 }],
      attributeIds: '',
      colorPaletteId: -1,
    })
  );

  const [dsInfo] = await Promise.all([
    postApiResponse<any>({
      apiEndpoint:
        'https://v3019-dwww.magnetstreet.net/designStudio/ds4/load?pids=84906,38939&qs=100,100&m=517',
      requestData: formData.toString(),
      revalidate: 0, // no cache
    }),
  ]);

  return {
    dsInfo,
  };
};

const Home = async ({ searchParams }: PageParams) => {
  const { dsInfo } = await loadDataFromApi();
  // console.log('validate', validate);
  console.log('dsInfo', dsInfo);
  return <PageEditor dsInfo={dsInfo} />;
};

export default Home;
