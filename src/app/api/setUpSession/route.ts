import { NextResponse } from 'next/server';

import { getViewListSceneValue } from '@/utils/getViewListSceneValue';
import { getApiResponse } from '@/utils/shared/get-api-response';

import DocumentInformation from '@/types/DocumentInformation';
import DocumentListItem from '@/types/DocumentListItem';
import { EditorPageServerData } from '@/types/pageData';

export async function POST(req: Request) {
  try {
    //TODO Move part of this logic to the getSessionData
    //TODO Split this twoi calls into to different calls
    const API_BASE_URL = process.env.API_BASE_URL;
    const reqData = await req.json();
    const { visitorInfo, productInfo }: EditorPageServerData = reqData;
    const { visitorImprints } = visitorInfo;
    const { documentList } = productInfo;
    let documentId = 'NEW-DOCUMENT-FROM-TEMPLATE';
    let sessionId = 'NEW-SESSION';

    // Check if We have a active sessiojn on the vistorImprints
    if (visitorImprints && visitorImprints.currentSessionId) {
      sessionId = visitorImprints.currentSessionId!;
    }
    // Get the TempalteIds
    const templateIdFirst = documentList[0].productStylecode;
    const templateId: string = documentList.reduce(
      (acc: string, item: DocumentListItem, index: number) => {
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

    if (!API_BASE_URL) {
      return NextResponse.json({
        message: 'Bad request: API_BASE_URL not defined in .env file',
      });
    }

    const sessionInfoResponse = await getApiResponse<any>({
      apiEndpoint: `${API_BASE_URL}/ids/setupSession?sessionId=${sessionId}&documentId=${documentId}&templateId=${templateId}`,
      revalidate: 0, // no cache
    });

    if (!sessionInfoResponse.description) {
      return NextResponse.json({
        message: 'Bad request: No setupSession Description',
      });
    }

    const sessionDescription = sessionInfoResponse.description;
    const SessionObj = sessionDescription.split(':');
    sessionId = SessionObj[0]; // Get The sessionID
    documentId = SessionObj[1].split(',')[0]; // Get The first documentID

    const viewListString = getViewListSceneValue(documentList);

    const getDocumentResponse = await getApiResponse<DocumentInformation>({
      apiEndpoint: `${API_BASE_URL}/ids/getDocument?sessionId=${sessionId}&documentId=${documentId}&viewList=${viewListString}&templateId=${templateIdFirst}&skipImageRender=false&initialColorPalette=null`,
      revalidate: 0, // no cache
    });

    const viewName = getDocumentResponse?.views[0]?.sceneName;

    const getViewBlob = await getApiResponse<Blob | MediaSource>({
      apiEndpoint: `${API_BASE_URL}/ids/getDocumentView?sessionId=${sessionId}&documentId=${documentId}&viewName=${viewName}&templateId=${templateIdFirst}`,
      revalidate: 0, // no cache
    });

    console.log('getViewBlob', getViewBlob);
    let viewURL = '';
    if (getViewBlob) {
      viewURL = URL.createObjectURL(getViewBlob as Blob);
      console.log('viewUrl', viewURL);
    }

    return NextResponse.json({
      viewURL,
      getDocumentResponse,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' });
  }
}
