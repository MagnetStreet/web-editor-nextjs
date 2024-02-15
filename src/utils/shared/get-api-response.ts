import { IS_PROD } from '@/constants';
import { consoleLog } from '@/utils/shared/console-log';

export const getApiResponse = async <T>({
  apiEndpoint,
  requestData,
  method = 'GET',
  revalidate = IS_PROD ? 3600 : 120, // cache data in seconds
  headers,
}: {
  apiEndpoint: string;
  requestData?: BodyInit;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  revalidate?: number;
  headers?: HeadersInit;
}) => {
  try {
    const response = await fetch(apiEndpoint, {
      method,
      body: requestData,
      headers,
      next: {
        revalidate,
      },
    });
    if (!response.ok) {
      consoleLog('🚀 Debug getApiResponse requestData:', requestData);

      throw new Error(
        `${response.status}/${response.statusText} - ${apiEndpoint}`
      );
    }

    // Check if the response is an image
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.startsWith('image')) {
      return (await response.blob()) as unknown as T; // Cast to T, assuming T is compatible with Blob
    }

    return (await response.json()) as T;
  } catch (error) {
    consoleLog('getApiResponse error:', error);
  }

  return null;
};
