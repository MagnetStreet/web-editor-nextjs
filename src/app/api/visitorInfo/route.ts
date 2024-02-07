import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL;
    if (!API_BASE_URL) {
      return NextResponse.json({
        message: 'API_BASE_URL not defined in .env file',
      });
    }
    const visitorCookie = req.headers.cookie;
    const response = await axios.get(`${API_BASE_URL}/auth/getVisitorInfo/`, {
      headers: {
        Cookie: visitorCookie || '',
      },
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
