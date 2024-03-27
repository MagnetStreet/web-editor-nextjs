import { getDocumentView } from '@/services/getDocumentView';

import DesignStudioItem from '@/types/DesignStudioItem';
import ProductInformation from '@/types/ProductInformation';
import SessionInfomation from '@/types/SessionInfomation';

const updateDocumentHistoryService = async (
  sessionId: string,
  documentId: string,
  templateId: string,
  productInfo?: ProductInformation,
  sessionInformation?: SessionInfomation,
  historyDocumentInfo?: DesignStudioItem
): Promise<{
  updatedDocumentInfo?: DesignStudioItem;
  viewBlob?: Blob;
  error?: unknown;
}> => {
  try {
    if (!sessionId || !documentId || !templateId) {
      throw Error('Missing one of the IDs');
    }
    if (!historyDocumentInfo) {
      throw Error('Missing DocumentInfo');
    }
    if (!productInfo) {
      throw Error('ProductInfo is not set');
    }
    if (!sessionInformation) {
      throw Error('SessionInformation not set');
    }

    //Make the Service Call to update
    await fetch(`/api/updateDocument`, {
      method: 'POST',
      body: JSON.stringify({
        sessionId,
        documentId,
        templateId: templateId.split(',')[0],
        viewList: historyDocumentInfo.views.map((x) => x.sceneName),
        newDocumentInfo: historyDocumentInfo,
        saveChanges: false,
        exportPageRange: 'ALL',
        exportOverprintMasks: true,
      }),
    });
    const { viewBlob } = await getDocumentView(
      sessionInformation,
      historyDocumentInfo,
      productInfo
    );

    if (viewBlob instanceof Blob) {
      return {
        updatedDocumentInfo: historyDocumentInfo,
        viewBlob,
      };
    } else {
      throw Error('Fetch updated view failed');
    }
  } catch (error) {
    console.log('Save Action', error);
    return {
      error,
    };
  }
};

export default updateDocumentHistoryService;
