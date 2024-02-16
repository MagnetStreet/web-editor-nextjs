import { NextResponse } from 'next/server';

import { getApiResponse } from '@/utils/shared/get-api-response';

export async function POST(req: Request) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL;
    const reqData = await req.json();

    if (!API_BASE_URL) {
      throw new Error('Bad request: API_BASE_URL not defined in .env file');
    }
    if (!reqData.sessionId || !reqData.templateId || !reqData.documentId) {
      throw new Error('Bad request: Missing Parameter at setUpSession Request');
    }

    const { sessionId, templateId, documentId } = reqData;
    const sessionInfoResponse = await getApiResponse<any>({
      apiEndpoint: `${API_BASE_URL}/ids/setupSession?sessionId=${sessionId}&documentId=${documentId}&templateId=${templateId}`,
      revalidate: 0, // no cache
    });

    if (!sessionInfoResponse.description) {
      throw new Error('Server Error: No setupSession Description');
    }

    return NextResponse.json({
      sessionInfo: sessionInfoResponse,
    });
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}
