# react-i18n-multilang-rtl

Production-ready demo of an internationalized single-page React application with full LTR/RTL support.

---

## Live demo
Live app: <https://react-i18n-multilang-rtl.vercel.app/>

---

## Repo contents

- `src/i18n` – i18n initialization + lazy-loaded locale files (en, es, ja, ar)
- `src/components/LanguageSwitcher.jsx` – UI for switching languages (persists to localStorage)
- `src/utils/formatters.js` – Date/number/currency helpers using `Intl`
- `src/styles/global.css` – Uses CSS logical properties for RTL support
- `tests/` – Unit, e2e, and accessibility tests
- `screenshots/` – Required screenshots for submission
- `video-demo.mp4` – 2–4 minute walkthrough demonstrating features
- `submission.yml` – Pipeline file (required for graders)

---

## Requirements covered

This project implements:

- Support for 4 languages:  
  **English (en)**, **Spanish (es)**, **Japanese (ja)**, **Arabic (ar - RTL)**
- All UI text translated (buttons, labels, navigation, product text, dynamic content)
- Language switcher with persistence using `localStorage`
- Automatic browser-language detection on first visit
- Fallback system → English
- Locale-based formatting for:
  - Dates  
  - Numbers  
  - Currency  
- Full RTL support:
  - CSS logical properties (`margin-inline`, `padding-inline`, `text-align: start`)
  - Mirrored icons using `scaleX(-1)`
  - Automatic layout flip when language = Arabic
- Lazy-loading translation files using dynamic `import()`
- Dynamically updates `<html lang>` and `<html dir>`
- Dynamic `hreflang` meta tags for multilingual SEO


## LanguageSwitcher handles:

   - i18n.changeLanguage(code)

   - Storing selected language in localStorage

   - Updating <html lang> attribute

   - Updating <html dir> attribute (LTR ↔ RTL)

## Language detection order:

   - Check localStorage.locale

   - Check browser navigator.language

   - Fallback to English (en)

## SEO and Routing

   - Dynamic <html lang="xx">

   - Dynamic <html dir="ltr|rtl">

   - hreflang meta tags generated via react-helmet

## Helps ensure:

   - correct indexing

   - multilingual pages linked properly

   - better international SEO ranking

## RTL Support

   - Arabic language automatically triggers RTL:

   - Layout flips using CSS logical properties

   - No separate RTL stylesheet necessary

   - Icons flip using:


## Verified on:

   - Desktop

   - Mobile

   - Multiple screen sizes