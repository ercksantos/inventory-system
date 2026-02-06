// Formata valor em moeda brasileira (R$)
export const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return 'R$ 0,00';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Formata número com casas decimais
export const formatNumber = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00';
  }

  return parseFloat(value).toFixed(decimals);
};

// Formata número no padrão brasileiro (vírgula)
export const formatNumberBR = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0,00';
  }

  return parseFloat(value).toFixed(decimals).replace('.', ',');
};
