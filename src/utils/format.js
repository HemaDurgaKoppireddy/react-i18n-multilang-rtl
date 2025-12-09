export function formatDate(date, locale) {
  // Accept Date or ISO string
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
}

export function formatNumber(number, locale) {
  return new Intl.NumberFormat(locale).format(number);
}

export function formatCurrency(number, locale, currency = 'USD') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
}
