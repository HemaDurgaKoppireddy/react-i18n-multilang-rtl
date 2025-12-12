# react-i18n-multilang-rtl

A production-ready, multilingual React application demonstrating full internationalization (i18n) with **English, Spanish, Japanese, and Arabic (RTL)** language support. The project includes **lazy-loaded translations, RTL layout flipping, Intl-based formatting, SEO hreflang tags, and persistence across sessions**.



## Live Demo  
https://react-i18n-multilang-rtl.vercel.app/


# Project Setup Instructions (Required for Submission)

This section explains how to **set up the project, install dependencies, run it locally, and execute all tests**.


## 1️.Clone the Repository

git clone https://github.com/HemaDurgaKoppireddy/react-i18n-multilang-rtl.git
cd react-i18n-multilang-rtl


## 2️.Install Dependencies

npm install


## 3️.Run the Application in Development Mode

npm run dev

The app will start at:

http://localhost:5173


## 4️.Build for Production

npm run build

Output folder: dist/


## 5️.Preview Production Build (Optional)

npm run preview


## 6️.Running Tests

### Unit Tests (Vitest)

npm test


### E2E Tests (Cypress) — After installation

npx cypress open      
npx cypress run       


### Accessibility Tests (Axe / Lighthouse)

npm run accessibility

  - These test commands are referenced inside `submission.yml` for automated grading.


# Repo Structure

- `src/i18n/` – i18n setup + lazy-loaded translation namespaces  
- `src/components/LanguageSwitcher.jsx` – Language selector with persistence  
- `src/utils/formatters.js` – Intl date, number, and currency formatting  
- `src/styles/global.css` – Logical CSS properties for RTL support  
- `screenshots/` – Required screenshots for assessment  
- `submission.yml` – Automated grader pipeline  
- `video-demo.mp4` – External hosted demo video (Google Drive link below)  


# Features Implemented (Meets All Requirements)

### Four Languages Supported  
- English (en)  
- Spanish (es)  
- Japanese (ja)  
- Arabic (ar – RTL)

### LanguageSwitcher Handles:
- `i18n.changeLanguage(code)`
- Saving selected language in **localStorage**
- Updating:
  - `<html lang="…">`
  - `<html dir="ltr|rtl">`

### Language Detection Order
1. Check `localStorage.locale`  
2. Check `navigator.language`  
3. Fallback → English  

### SEO & Routing
- Dynamic `<html lang>`  
- Dynamic `<html dir>`  
- Dynamic **hreflang** meta tags for multilingual SEO

### RTL Support (Arabic)
- Automatic layout flip  
- CSS logical properties  
- Icon mirroring (`scaleX(-1)`)  
- No separate RTL CSS file needed  

### Verified On
- Desktop  
- Mobile  
- Multiple screen resolutions  



# Date, Number & Currency Formatting

Implemented using the native **Intl API**:

new Intl.DateTimeFormat(locale).format(new Date());
new Intl.NumberFormat(locale).format(12500);
new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }).format(499);



# Screenshots

All required screenshots are included in the `/screenshots` directory:
- Desktop + mobile (EN, ES, JA, AR)
- RTL layout demonstration
- Date & number formatting
- Persistence across reload
- SEO hreflang tags in `<head>`


# Demo Video  
Due to GitHub’s 100MB file limit, the full demo video is hosted externally:

**Video Demo:**  
https://drive.google.com/file/d/1aaahSrshMCfG2IPNg0T1UcttF9_btd7_/view?usp=sharing



# Additional Notes

- Translations are **lazy-loaded** for better performance.
- App is fully accessible with semantic HTML.
- Architecture ensures clean separation of concerns for i18n.
- RTL and LTR styling is dynamic and automatic.


#  submission.yml

Included in the repo root — required for automated testing of:
- Build  
- Lint  
- Unit tests  
- E2E tests  
- Accessibility tests