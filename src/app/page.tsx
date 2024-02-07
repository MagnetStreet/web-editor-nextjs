import PageEditor from '@/components/pages/PageEditor';
import { NextPageContext } from 'next';
const loadDataFromApi = async (context: NextPageContext) => {
  try {
    const { req, res, query } = context;
    const LOCAL_API_BASE_URL = process.env.LOCAL_API_BASE_URL;
    //const slug = query.slug;
    const [visitorInfo, productInfo] = await Promise.all([
      await fetch(`${LOCAL_API_BASE_URL}/visitorInfo/`),
      await fetch(`${LOCAL_API_BASE_URL}/productInformation/`),
    ]);
    return {
      productInfo: await productInfo?.json(),
      visitorInfo: await visitorInfo?.json(),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      productInfo: null,
      visitorInfo: null,
    };
  }
};

interface EditorPageServerData {
  productInfo: any;
  visitorInfo: any;
}

const Home = async (context: NextPageContext) => {
  const { productInfo, visitorInfo } = await loadDataFromApi(context);
  console.log('productInfoHome', productInfo);
  console.log('visitorInfo', visitorInfo);
  return <PageEditor dsInfo={productInfo} />;
};
export default Home;
