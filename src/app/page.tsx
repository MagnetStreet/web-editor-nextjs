import PageEditor from '@/components/pages/PageEditor';
import { PageParams } from '@/types';
import { getApiResponse } from '@/utils/shared/get-api-response';
import { postApiResponse } from '@/utils/shared/post-api-response';

const loadDataFromApi = async () => {
  // Fetch & cache data from 2 remote samples APIs test
  const [trulyValidateProducts] = await Promise.all([
    postApiResponse<any>({
      apiEndpoint: 'https://www.trulyengaging.com/validateProducts/market/517',
      requestData: JSON.stringify(
        'productQuantityJSON={"productsAndQuantities": [{"88340":100}], "attributeIds" : "", "colorPaletteId" : -1}'
      ),
      revalidate: 0, // no cache
    }),
  ]);

  return {
    trulyValidateProducts,
  };
};

const Home = async ({ searchParams }: PageParams) => {
  const { trulyValidateProducts } = await loadDataFromApi();
  console.log('trulyValidateProducts', trulyValidateProducts);
  return <PageEditor trulyValidateProducts={trulyValidateProducts} />;
};

export default Home;
