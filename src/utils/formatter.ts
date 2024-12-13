const createCurrencyFormatter = () => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

export const formatCurrency = (value: number) => createCurrencyFormatter().format(value);

export const unFormatCurrency = (formattedValue = '') => {
  const formatter = createCurrencyFormatter();
  const parts = formatter.formatToParts(12345.67);
  const groupSeparator = parts.find(part => part.type === 'group')!.value;
  const decimalSeparator = parts.find(part => part.type === 'decimal')!.value;

  const cleanValue = formattedValue
    ?.replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
    ?.replace(decimalSeparator, '.')
    ?.replace(/[^\d.-]/g, '');

  return Number(cleanValue);
}

export function unFormatNumber(value: string): number {
  let unFormattedValue = value.replace(/\D/g, "");
  return Number(unFormattedValue) / 100;
}

export function maskNumber(value: string) {
  let formattedValue = value;
  
  if (!formattedValue) return '';

  formattedValue = formattedValue.replace(/\D/g, "");
  formattedValue = (Number(formattedValue) / 100).toFixed(2).toString();
  formattedValue = formattedValue.replace(".", ",");

  return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function maskDate(value: string) {
  let formattedValue = value;

  formattedValue = formattedValue.replace(/\D/g, "");

  if (formattedValue.length > 2) {
    formattedValue = formattedValue.substring(0, 2) + "/" + formattedValue.substring(2);
  }

  return formattedValue.substring(0, 7);
}
