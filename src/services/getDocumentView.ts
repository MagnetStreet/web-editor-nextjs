import DocumentInformation from '@/types/DesignStudioItem';
import DSItemJSON from '@/types/DSItemJSON';
import ProductInformation from '@/types/ProductInformation';
import SessionInfomation from '@/types/SessionInfomation';

export const getDocumentView = async (
  sessionInformation: SessionInfomation,
  documentInfo?: DocumentInformation,
  productInfo?: ProductInformation
): Promise<{
  viewBlob?: Blob;
}> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (!documentInfo) {
      throw Error('documentInfo NOT FOUND');
    }
    if (!productInfo) {
      throw Error('productInfo NOT FOUND');
    }

    const { documentList } = productInfo;
    const { description } = sessionInformation;

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
        r: Math.random(),
      }),
    });

    const viewBlob = await viewResponse.blob();
    return {
      viewBlob,
    };
  } catch (error) {
    console.log('getSessionData Error:', error);
    return {};
  }
};
