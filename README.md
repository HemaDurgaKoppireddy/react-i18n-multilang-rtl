<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
 -->


 # react-i18n-multilang-rtl

React + Vite sample project demonstrating internationalization (i18n) with i18next.
Supports: English (en), French (fr), Spanish (es), Arabic (ar - RTL).

## Features
- Lazy-loaded translations (i18next-http-backend)
- Language auto-detection and persistence
- RTL support (document.dir toggles)
- Locale-aware formatting with Intl
- Simple tests & submission.yml for graders

## Run locally
1. Install dependencies
2. Start dev server
   Open http://localhost:5173
3. Build


## Notes
- Place translation files in `public/locales/{lng}/translation.json`.
- Record a brief demo (2-4 minutes) showing language switching, RTL flip (Arabic), and different screen sizes.

