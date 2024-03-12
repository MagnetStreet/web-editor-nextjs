import { getDocumentView } from '@/services/getDocumentView';
import deepCopy from '@/utils/shared/deepCopy';

import DesignStudioItem from '@/types/DesignStudioItem';
import ProductInformation from '@/types/ProductInformation';
import SessionInfomation from '@/types/SessionInfomation';
import SwatchColor from '@/types/SwatchColor';

const updateDocumentColorService = async (
  newColor: SwatchColor,
  sessionId: string,
  documentId: string,
  templateId: string,
  productInfo?: ProductInformation,
  sessionInformation?: SessionInfomation,
  selectedColor?: SwatchColor,
  stateDocumentInfo?: DesignStudioItem
): Promise<{
  updatedDocumentInfo?: DesignStudioItem;
  viewBlob?: Blob;
  error?: unknown;
}> => {
  try {
    if (!sessionId || !documentId || !templateId) {
      throw Error('Missing one of the IDs');
    }
    if (!selectedColor) {
      throw Error('Missing activeSwatchColor');
    }
    if (!stateDocumentInfo) {
      throw Error('Missing DocumentInfo');
    }
    if (!productInfo) {
      throw Error('ProductInfo is not set');
    }
    if (!sessionInformation) {
      throw Error('SessionInformation not set');
    }

    // Create the new Property
    const newColorSwatch = {
      ...selectedColor,
      redValue: newColor.redValue,
      magentaValue: newColor.magentaValue,
      greenValue: newColor.greenValue,
      cyanValue: newColor.cyanValue,
      blueValue: newColor.blueValue,
      blackValue: newColor.blackValue,
      yellowValue: newColor.yellowValue,
      modified: true,
    };
    const newDocumentInfo = deepCopy(stateDocumentInfo);
    const index = newDocumentInfo.swatches.findIndex(
      (x) => x.swatchName === selectedColor.swatchName
    );

    if (index === -1) {
      throw Error('Name missmatch looking for swatch name');
    }
    // Update the document Properties
    newDocumentInfo.swatches[index] = newColorSwatch;

    //Make the Service Call to update
    await fetch(`/api/updateDocument`, {
      method: 'POST',
      body: JSON.stringify({
        sessionId,
        documentId,
        templateId: templateId.split(',')[0],
        viewList: newDocumentInfo.views.map((x) => x.sceneName),
        newDocumentInfo,
        saveChanges: false,
        exportPageRange: 'ALL',
        exportOverprintMasks: true,
      }),
    });
    const { viewBlob } = await getDocumentView(
      sessionInformation,
      newDocumentInfo,
      productInfo
    );

    if (viewBlob instanceof Blob) {
      return {
        updatedDocumentInfo: newDocumentInfo,
        viewBlob,
      };
    } else {
      throw Error('Fetch updated view failed');
    }
  } catch (error) {
    console.log('Save Action Error:', error);
    return {
      error,
    };
  }
};

export default updateDocumentColorService;
