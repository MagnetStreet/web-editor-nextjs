import DSItemJSON from '@/types/DSItemJSON';
import ProductInformation from '@/types/ProductInformation';
import SessionData from '@/types/SessionInfomation';
import { VisitorInfo } from '@/types/VisitorInfo';

export const setUpSessionData = async (
  visitorInfo: VisitorInfo,
  productInfo: ProductInformation
): Promise<SessionData> => {
  try {
    const { visitorImprints } = visitorInfo;
    const { documentList } = productInfo;
    const headers = {
      'Content-Type': 'application/json',
    };
    const documentId = 'NEW-DOCUMENT-FROM-TEMPLATE';
    let sessionId = 'NEW-SESSION';

    // Check if We have a active sessiojn on the vistorImprints
    if (visitorImprints && visitorImprints.currentSessionId) {
      sessionId = visitorImprints.currentSessionId;
    }

    if (!documentList || !documentList[0]) {
      throw Error('DocumentList from productInfo  NOT FOUND');
    }

    // Get the TempalteIds
    const templateId: string = documentList.reduce(
      (acc: string, item: DSItemJSON, index: number) => {
        // we Need to remove the stock items from this lists
        if (item.itemType === 'STOCK') {
          return acc;
        }
        acc += item.productStylecode;
        if (index !== documentList.length - 1) {
          acc += ',';
        }
        return acc;
      },
      ''
    );

    const sessionInfoResponse = await fetch(`/api/setUpSession/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ sessionId, templateId, documentId }),
    });

    const { sessionInfo } = await sessionInfoResponse.json();
    return {
      ...sessionInfo,
    };
  } catch (error) {
    console.log('setUpSessionData Error:', error);
    return {
      status: 'FAILED',
      description: '',
    };
  }
};
