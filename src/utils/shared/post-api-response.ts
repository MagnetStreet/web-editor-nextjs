import { IS_PROD } from '@/constants';
import { consoleLog } from '@/utils/shared/console-log';

export const postApiResponse = async <T>({
  apiEndpoint,
  requestData,
  revalidate = IS_PROD ? 3600 : 120, // cache data in seconds
}: {
  apiEndpoint: string;
  requestData?: BodyInit;
  headers?: Headers;
  revalidate?: number;
}): Promise<T | null> => {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      body: requestData,
      headers,
      credentials: 'include',
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
    consoleLog('postApiResponse error:', error);
  }

  return null;
};
