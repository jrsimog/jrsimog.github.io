# jrsimog.github.io — Portfolio

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-181717?style=flat-square&logo=github&logoColor=white)](https://jrsimog.github.io)

Portfolio personal de José Ramón Simó — desarrollador backend con experiencia en Elixir/Phoenix, PHP/Symfony y cloud.

## Stack

- **React 19** + **Vite 8** + **Tailwind CSS 4**
- **React Router 7** para navegación SPA
- **Google Analytics 4** (solo en producción)
- i18n manual ES/EN con `LanguageContext`
- Tema claro/oscuro con `ThemeContext`
- Animaciones con `ScrollReveal` (Intersection Observer)

## Desarrollo local

```bash
npm install
npm run dev
```

## Build y deploy

```bash
npm run build      # genera /dist
npm run preview    # previsualiza el build
```

El deploy a GitHub Pages es automático vía GitHub Actions al hacer push a `master`.

## Estructura

```
src/
├── components/     # ProjectCard, ThemeToggle, LangToggle, ScrollReveal
├── context/        # ThemeContext, LanguageContext
├── data/           # projects, experience, education, posts, techIcons
├── i18n/           # translations.js (ES/EN)
├── pages/          # Home, Blog, NotFound + posts/
└── utils/          # analytics.js
```
