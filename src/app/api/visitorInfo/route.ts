import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

import { getApiResponse } from '@/utils/shared/get-api-response';

export async function GET(req: NextApiRequest, res: NextResponse) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL;
    if (!API_BASE_URL) {
      throw Error('API_BASE_URL not defined in .env file');
    }
    //TODO Actually load cookies
    const response = await getApiResponse<any>({
      apiEndpoint: `${API_BASE_URL}/auth/getVisitorInfo/`,
      headers: {
        visitorCookie: '3f0606fb-1576-4480-8d75-040c29fee2f2' || '',
        Expires: 'Wed, 30-Jul-2081 20:44:27 GMT',
        Path: '/',
      },
      revalidate: 0, // no cache
    });

    // Extract the visitor information from the response
    const { visitorImprints, currentDiscounts, visitorId } = response.data;
    const visitorInfo = {
      visitorImprints,
      currentDiscounts,
      visitorId,
    };
    return NextResponse.json(visitorInfo);
  } catch (error) {
    console.error('Error fetching visitor info:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
