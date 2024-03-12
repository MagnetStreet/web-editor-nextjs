import { getViewListSceneValue } from '@/utils/getViewListSceneValue';

import DocumentInfoAndViewResponse from '@/types/DocumentInfoAndViewResponse';
import DSItemJSON from '@/types/DSItemJSON';
import ProductInformation from '@/types/ProductInformation';
import SessionInfomation from '@/types/SessionInfomation';

export const getDocumentInfoAndView = async (
  productInfo: ProductInformation,
  sessionInformation: SessionInfomation
): Promise<DocumentInfoAndViewResponse> => {
  try {
    const { documentList } = productInfo;
    const { description } = sessionInformation;
    const headers = {
      'Content-Type': 'application/json',
    };

    if (!documentList || !documentList[0]) {
      throw Error('DocumentList from productInfo  NOT FOUND');
    }

    // Get the TempalteIds
    const templateIdFirst = documentList[0].productStylecode;
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

    const SessionObj = description.split(':');
    const sessionId = SessionObj[0]; // update The sessionID
    const documentId = SessionObj[1].split(',')[0]; // update The first documentID
    const viewListString = getViewListSceneValue(documentList);

    const getDocumentResponse = await fetch(`/api/getDocument/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sessionId,
        documentId,
        viewListString,
        templateIdFirst,
      }),
    });

    const { documentInfo } = await getDocumentResponse.json();
    return {
      sessionId,
      documentId,
      templateId,
      documentInfo,
    };
  } catch (error) {
    console.log('getSessionData Error:', error);
    return {
      documentId: '',
      sessionId: '',
      templateId: '',
    };
  }
};
