import ProductInformation from '@/types/ProductInformation';
import SessionData from '@/types/SessionData';
import { VisitorInfo } from '@/types/VisitorInfo';

export const getSessionData = async (
  visitorInfo: VisitorInfo,
  productInfo: ProductInformation
): Promise<SessionData> => {
  const response = await fetch(`/api/setUpSession/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ visitorInfo, productInfo }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const { viewURL, getDocumentResponse } = await response.json();
  console.log('getViewResponse', viewURL);
  console.log('getDocumentResponse', getDocumentResponse);

  return {
    viewURL,
    getDocumentResponse,
  };
};
