import { SelectOption } from '@/types';

export default function getOptionsForSelect(
  original: string[] | number[]
): SelectOption[] {
  return original.map((option) => {
    return {
      value: Number(option),
      label: `${option}`,
    };
  });
}
