export function checkRequiredParams(
  reqData: any,
  requiredParams: string[]
): void {
  const missingParams: string[] = [];
  requiredParams.forEach((param) => {
    if (!reqData[param]) {
      missingParams.push(param);
    }
  });

  if (missingParams.length > 0) {
    throw new Error(
      `Bad request: Missing parameters (${missingParams.join(', ')})`
    );
  }
}
