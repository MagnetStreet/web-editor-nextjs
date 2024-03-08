import { NextResponse } from 'next/server';

import { consoleLog } from '@/utils/shared/console-log';
import { checkRequiredParams } from '@/utils/shared/verifyParamsHelper';

export async function POST(req: Request) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL;
    const reqData = await req.json();
    if (!API_BASE_URL) {
      throw new Error('Bad request: API_BASE_URL not defined in .env file');
    }
    // Check the response has all parameters
    const requiredParams = [
      'sessionId',
      'documentId',
      'viewList',
      'templateId',
      'newDocumentInfo',
    ];
    checkRequiredParams(reqData, requiredParams);

    const { sessionId, templateId, documentId, viewList, newDocumentInfo } =
      reqData;

    const templateIdFirst = templateId.split(',')[0];
    const saveChanges = reqData.saveChanges || false;

    const sessionInfoResponse = await fetch(
      `${API_BASE_URL}/ids/updateDocument?sessionId=${sessionId}&documentId=${documentId}&viewList=${viewList}&templateId=${templateIdFirst}&saveChanges=${saveChanges}&exportPageRange=ALL&exportOverprintMasks=true`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'docData=' + encodeURIComponent(JSON.stringify(newDocumentInfo)),
      }
    );
    consoleLog('response', sessionInfoResponse);

    return NextResponse.json({
      sessionInfo: sessionInfoResponse,
    });
  } catch (error: any) {
    consoleLog(error);
    throw new Error('Internal Server Error');
  }
}
