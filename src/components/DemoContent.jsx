import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate, formatCurrency } from '../utils/format';

export default function DemoContent() {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'en';
  const now = new Date();
  const price = 12345.67;
  const currency = locale === 'fr' ? 'EUR' : 'USD';

  return (
    <section className="demo">
      <h1>{t('title')}</h1>
      <p className="muted">{t('description')}</p>

      <p><strong>{t('greeting', { name: 'Hema' })}</strong></p>

      <p>{t('currentDate', { date: formatDate(now, locale) })}</p>

      <p>{t('price', { price: formatCurrency(price, locale, currency) })}</p>

      <div className="card">
        <p>{t('sampleText')}</p>
      </div>
    </section>
  );
}
