type GetNumberDisplayOptions = {
  prefix?: string;
  suffix?: string;
  comma?: boolean;
  decimalPlaces?: number;
  defaultValue?: string;
};

export function getNumberDisplay(input: number | string, options?: GetNumberDisplayOptions) {
  const { prefix, suffix, comma = true, decimalPlaces = 0, defaultValue = '-' } = options || {};

  if (!input) return defaultValue;

  let number = comma ? input.toLocaleString() : `${input}`;
  if (typeof decimalPlaces === 'number') {
    const [int, dec = ''] = number.split('.');
    const decimal = dec.slice(0, decimalPlaces).padStart(decimalPlaces, '0');

    if (decimal) {
      number = `${int}.${decimal}`;
    } else {
      number = int;
    }
  }

  if (prefix) {
    number = `${prefix}${number}`;
  }

  if (suffix) {
    number = `${number}${suffix}`;
  }

  return number;
}
