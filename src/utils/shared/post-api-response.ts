import { IS_PROD } from '@/constants';
import { consoleLog } from '@/utils/shared/console-log';

export const postApiResponse = async <T>({
  apiEndpoint,
  requestData,
  revalidate = IS_PROD ? 3600 : 120, // cache data in seconds
  headers,
}: {
  apiEndpoint: string;
  requestData?: BodyInit;
  revalidate?: number;
  headers?: HeadersInit;
}): Promise<T | null> => {
  try {
    const startTime = Date.now();
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      body: requestData,
      headers,
      next: {
        revalidate,
      },
    });

    if (!response.ok) {
      consoleLog('🚀 Debug getApiResponse requestData:', requestData);

      throw new Error(
        `postApiResponse failed: ${response.status}/${response.statusText} - ${apiEndpoint}`
      );
    }

    const duration = Date.now() - startTime;

    consoleLog(
      `postApiResponse: ${(duration / 1000).toFixed(2)}s ${
        duration > 2000 ? '💔' : '-'
      } ${apiEndpoint}`
    );

    return (await response.json()) as T;
  } catch (error) {
    consoleLog('getApiResponse error:', error);
  }

  return null;
};
