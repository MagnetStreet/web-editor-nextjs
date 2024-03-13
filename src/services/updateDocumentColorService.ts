import { getDocumentView } from '@/services/getDocumentView';
import deepCopy from '@/utils/shared/deepCopy';

import DesignStudioItem from '@/types/DesignStudioItem';
import ProductInformation from '@/types/ProductInformation';
import SessionInfomation from '@/types/SessionInfomation';
import SwatchColor from '@/types/SwatchColor';
import { TextStyleRange } from '@/types/TextBox';

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

    const newDocumentInfo = deepCopy(stateDocumentInfo);

    // Two Options here: Color or Text Color
    if (selectedColor.createdFromTextBox) {
      //Textbox path
      const compareSwatchColor = (
        textStyleRange: TextStyleRange,
        swatchColor: SwatchColor
      ): boolean => {
        return (
          textStyleRange.fillColorC === swatchColor.origCyanValue &&
          textStyleRange.fillColorM === swatchColor.origMagentaValue &&
          textStyleRange.fillColorY === swatchColor.origYellowValue &&
          textStyleRange.fillColorB === swatchColor.origBlackValue &&
          textStyleRange.fillColorR === swatchColor.origRedValue &&
          textStyleRange.fillColorG === swatchColor.origGreenValue
        );
      };
      // Update the document Properties
      newDocumentInfo.textBoxes.forEach((textBox) => {
        let modified = false;
        textBox.contentFormatted.forEach((content) => {
          content.textStyleRanges.forEach((textStyleRange) => {
            if (compareSwatchColor(textStyleRange, selectedColor)) {
              textStyleRange.fillColorC = newColor.cyanValue;
              textStyleRange.fillColorM = newColor.magentaValue;
              textStyleRange.fillColorY = newColor.yellowValue;
              textStyleRange.fillColorK = newColor.blackValue;
              textStyleRange.fillColorR = newColor.redValue;
              textStyleRange.fillColorG = newColor.greenValue;
              textStyleRange.fillColorB = newColor.blackValue;
              modified = true;
            }
          });
        });
        if (modified) {
          textBox.modified = true;
        }
      });
    } else {
      //Color swatch path
      const index = newDocumentInfo.swatches.findIndex(
        (x) => x.swatchName === selectedColor.swatchName
      );
      if (index === -1) {
        throw Error('Name missmatch looking for swatch name');
      }
      // Create the new Swatch Property
      const newColorSwatch = {
        ...selectedColor,
        redValue: newColor.redValue,
        blueValue: newColor.blueValue,
        greenValue: newColor.greenValue,
        cyanValue: newColor.cyanValue,
        magentaValue: newColor.magentaValue,
        blackValue: newColor.blackValue,
        yellowValue: newColor.yellowValue,
        modified: true,
      };
      // Update the document Properties
      newDocumentInfo.swatches[index] = newColorSwatch;
    }

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
    console.log('Save Action', error);
    return {
      error,
    };
  }
};

export default updateDocumentColorService;
