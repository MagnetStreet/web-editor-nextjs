import { NextResponse } from 'next/server';

import { getApiResponse } from '@/utils/shared/get-api-response';

import DocumentInformation from '@/types/DesignStudioItem';

export async function POST(req: Request) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL;
    const reqData = await req.json();

    if (
      !reqData.sessionId ||
      !reqData.documentId ||
      !reqData.viewListString ||
      !reqData.templateIdFirst
    ) {
      throw new Error('Bad request: Missing Parameter at getDocument Request');
    }

    const { sessionId, documentId, viewListString, templateIdFirst } = reqData;
    const getDocumentResponse = await getApiResponse<DocumentInformation>({
      apiEndpoint: `${API_BASE_URL}/ids/getDocument?sessionId=${sessionId}&documentId=${documentId}&viewList=${viewListString}&templateId=${templateIdFirst}&skipImageRender=true&initialColorPalette=null`,
      revalidate: 0, // no cache
    });

    if (!getDocumentResponse) {
      throw new Error('getDocument Request null');
    }
    return NextResponse.json<{ documentInfo: DocumentInformation }>({
      documentInfo: getDocumentResponse,
    });
  } catch (error) {
    console.log('Server error', error);
    throw new Error('Get Document: Internal server error');
  }
}