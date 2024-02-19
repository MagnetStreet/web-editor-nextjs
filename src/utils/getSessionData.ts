import { getViewListSceneValue } from '@/utils/getViewListSceneValue';

import DSItemJSON from '@/types/dsItemJSON';
import ProductInformation from '@/types/ProductInformation';
import SessionData from '@/types/SessionData';
import { VisitorInfo } from '@/types/VisitorInfo';

export const getSessionData = async (
  visitorInfo: VisitorInfo,
  productInfo: ProductInformation
): Promise<SessionData> => {
  try {
    const { visitorImprints } = visitorInfo;
    const { documentList } = productInfo;
    const headers = {
      'Content-Type': 'application/json',
    };
    let documentId = 'NEW-DOCUMENT-FROM-TEMPLATE';
    let sessionId = 'NEW-SESSION';

    // Check if We have a active sessiojn on the vistorImprints
    if (visitorImprints && visitorImprints.currentSessionId) {
      sessionId = visitorImprints.currentSessionId;
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

    const sessionInfoResponse = await fetch(`/api/setUpSession/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ sessionId, templateId, documentId }),
    });

    const { sessionInfo } = await sessionInfoResponse.json();
    const sessionDescription = sessionInfo.description;
    const SessionObj = sessionDescription.split(':');
    sessionId = SessionObj[0]; // update The sessionID
    documentId = SessionObj[1].split(',')[0]; // update The first documentID
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
    const viewName = documentInfo?.views[0]?.sceneName;

    const viewResponse = await fetch(`/api/getView/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sessionId,
        documentId,
        templateId,
        viewName,
        templateIdFirst,
      }),
    });

    const viewBlob = await viewResponse.blob();
    return {
      viewBlob,
      documentInfo,
    };
  } catch (error) {
    console.log('getSessionData Error:', error);
    return {};
  }
};
