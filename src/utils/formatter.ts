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
