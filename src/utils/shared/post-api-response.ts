import { IS_PROD } from '@/constants';
import { consoleLog } from '@/utils/shared/console-log';

export const postApiResponse = async <T>({
  apiEndpoint,
  requestData,
  revalidate = IS_PROD ? 3600 : 120, // cache data in seconds
}: {
  apiEndpoint: string;
  requestData?: BodyInit;
  revalidate?: number;
}): Promise<T | null> => {
  try {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie:
        '__cf_bm=pAM7tPOKtib3V.pcVePjFuk0j39_nWx9FFJHVhR2l00-1706548846-1-ASjurRy+UeV5UvcQeq23wTeiRQyt6Lcprmn0QjGXR/ZP7eZsAfLYqlhYuPlQd4NSQQ9enud9bHqDpTxd3+IiB2I=; Cookie_1=value; JSESSIONID=D1698D8BCC03958DABBB10AE29060268; __cflb=02DiuGqNEnbeYhzVWe5PUB2FyxdqqahmXQ8myNCc1qf1m; visitorCookie=d8108dd8-e028-4fb1-909b-d368f6ab803b',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
    });
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

    return (await response.json()) as T;
  } catch (error) {
    consoleLog('postApiResponse error:', error);
  }

  return null;
};
