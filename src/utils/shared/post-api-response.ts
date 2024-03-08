import { IS_PROD } from '@/constants';
import { consoleLog } from '@/utils/shared/console-log';

export const postApiFormData = async <T>({
  apiEndpoint,
  formData,
  revalidate = IS_PROD ? 3600 : 120, // cache data in seconds
  headers,
}: {
  apiEndpoint: string;
  formData: FormData;
  revalidate?: number;
  headers?: HeadersInit;
}) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      body: formData,
      headers,
      next: {
        revalidate,
      },
    });
    consoleLog('🚀 headers', headers);

    if (!response.ok) {
      throw new Error(
        `${response.status}/${response.statusText} - ${apiEndpoint}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    consoleLog('postApiFormData error:', error);
  }

  return null;
};
