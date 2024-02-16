import { NextResponse } from 'next/server';

import { getApiResponse } from '@/utils/shared/get-api-response';

export async function POST(req: Request) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL;
    const reqData = await req.json();

    const { sessionId, templateId, documentId, viewName, templateIdFirst } =
      reqData;

    if (!sessionId || !templateId || !documentId) {
      throw new Error('Bad request: Missing Parameter at getView Request');
    }
    const viewBlob = await getApiResponse<Blob>({
      apiEndpoint: `${API_BASE_URL}/ids/getDocumentView?sessionId=${sessionId}&documentId=${documentId}&viewName=${viewName}&templateId=${templateIdFirst}`,
      revalidate: 0, // no cache
    });

    if (!viewBlob) {
      throw new Error('Internal Server: Null returned image getView Request');
    }
    const headers = new Headers();
    headers.set('Content-Type', 'image/*');
    return new NextResponse(viewBlob, {
      status: 200,
      statusText: 'OK',
      headers,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Get View: Internal server error' });
  }
}
