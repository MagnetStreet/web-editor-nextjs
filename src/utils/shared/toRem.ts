export default function toRem(pixelVal: string | number): string {
  let numericValue: number;

  if (typeof pixelVal === 'string') {
    if (pixelVal.endsWith('px')) {
      // Remove 'px' and parse the numeric value
      numericValue = parseFloat(pixelVal.slice(0, -2));
    } else {
      // If it doesn't end with 'px', directly parse the numeric value
      numericValue = parseFloat(pixelVal);
    }

    if (isNaN(numericValue)) {
      throw new Error('Invalid pixel value');
    }
  } else if (typeof pixelVal === 'number') {
    numericValue = pixelVal;
  } else {
    throw new Error('Invalid input type');
  }

  return `${numericValue / 16}rem`;
}
