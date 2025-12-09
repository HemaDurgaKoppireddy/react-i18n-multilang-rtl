import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'ar', label: 'العربية' }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  function change(lang) {
    i18n.changeLanguage(lang);
    // set html attributes and persist
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('i18nextLng', lang);
  }

  const current = i18n.resolvedLanguage || i18n.language || 'en';

  return (
    <div className="lang-switcher" role="toolbar" aria-label="Language switcher">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => change(l.code)}
          aria-pressed={current === l.code}
          className={current === l.code ? 'active' : ''}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
