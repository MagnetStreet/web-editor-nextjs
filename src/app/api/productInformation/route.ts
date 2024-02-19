import { NextRequest, NextResponse } from 'next/server';

import { getApiResponse } from '@/utils/shared/get-api-response';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    //const { pids, qs, m } = req.query;
    const API_BASE_URL = process.env.API_BASE_URL;

    // if (!pids || !qs || !m) {
    //   return res.status(400).json({ message: 'Bad Request: Required parameters are missing' });
    // }
    if (!API_BASE_URL) {
      throw Error('API_BASE_URL not defined in .env file');
    }
    // TODO Make a GET request to the external API with parameters
    const productInfo = await getApiResponse<any>({
      apiEndpoint: `${API_BASE_URL}/designStudio/ds4/load?pids=86787,86790,86791,86774,86783,86799,38939&qs=100,100,100,100,100,100,100&m=517`,
      revalidate: 0, // no cache
    });
    return NextResponse.json(productInfo);
  } catch (error) {
    // Handle errors
    console.error('Error fetching product info:', error);
  }
}
