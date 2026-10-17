<div align="center">

# 🎬 Laboratorio 09 — Desarrollo de Aplicaciones Web Avanzado

### Introducción a Next.js — Galería de Películas y Series (OMDb API)

![Next.js](https://img.shields.io/badge/Next.js-16.4.2-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/status-completado-brightgreen?style=for-the-badge)

*Tecsup · Diseño y Desarrollo de Software · 5 - C24 - Sección A-B*

</div>

---

## 📖 Tabla de contenidos

- [Descripción general](#-descripción-general)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Configuración](#-configuración)
- [Página Principal — SSR](#-página-principal--ssr)
- [Búsqueda interactiva — CSR](#-búsqueda-interactiva--csr)
- [Detalle de película/serie](#-detalle-de-películaserie)
- [Justificación SSR vs CSR](#-justificación-ssr-vs-csr)
- [Cómo ejecutar el proyecto](#-cómo-ejecutar-el-proyecto)
- [Stack técnico](#-stack-técnico)
- [Autor](#-autor)

---

## 📌 Descripción general

Aplicación construida con **Next.js (App Router)** que combina las dos estrategias de renderizado del framework — **SSR** (Server-Side Rendering) y **CSR** (Client-Side Rendering) — consumiendo la API pública de **OMDb** para mostrar una galería de películas y series, con búsqueda en tiempo real y vista de detalle.

---

## 🗂 Estructura del proyecto

```
my-first-project/
├── app/
│   ├── page.tsx                  # Home (SSR) — lista de populares
│   ├── search/
│   │   └── page.tsx               # Búsqueda (CSR)
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   └── MovieModal.tsx             # Modal de detalle (reutilizable)
│
├── lib/
│   └── omdb.ts                    # Funciones centralizadas de consumo a OMDb
│
├── types/
│   └── movie.ts                   # Interfaces TypeScript (OMDb)
│
├── .env.local                     # No se sube (API key de OMDb)
└── next.config.ts
```

---

## ⚙️ Configuración

```bash
npm install
```

Crea `.env.local` en la raíz:

```dotenv
NEXT_PUBLIC_OMDB_API_KEY=tu_api_key_aqui
```

La key se obtiene gratis (1000 requests/día) en [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx).

```bash
npm run dev
```

---

## 🏠 Página Principal — SSR

`app/page.tsx` es un **Server Component asíncrono**: pide el detalle de una lista curada de 8 IDs de OMDb mediante `Promise.all` (en paralelo) y renderiza la grilla completa en el servidor, antes de enviar el HTML al navegador.

---

## 🔍 Búsqueda interactiva — CSR

`app/search/page.tsx` usa `'use client'`, `useState` y `useEffect` con **debounce** (500ms): la búsqueda se dispara automáticamente mientras el usuario escribe, sin recargar la página y sin disparar una petición por cada tecla.

---

## 🎞️ Detalle de película/serie

Al hacer clic en un resultado de la búsqueda, `components/MovieModal.tsx` pide el detalle completo (`plot=full`) por `imdbID` y lo muestra en una ventana modal superpuesta, sin navegar a otra URL.

---

## ⚖️ Justificación SSR vs CSR

<details open>
<summary>Ver justificación</summary>
<br>

- **Home → SSR:** el contenido (populares) es el mismo para todos los visitantes y no depende de ninguna interacción previa — ideal para que el HTML llegue completo desde el primer request, sin estado de carga visible.
- **Búsqueda → CSR:** depende enteramente de lo que el usuario escribe en tiempo real; no hay nada que el servidor pueda precalcular, y recargar la página en cada letra rompería la experiencia de "resultados en vivo" que pide el enunciado.

</details>

---

## ▶️ Cómo ejecutar el proyecto

```bash
git clone https://github.com/diegoninam-ship-it/Lab09-DAWA.git
cd Lab09-DAWA
npm install
# crear .env.local con tu API key de OMDb
npm run dev
```

Visita `http://localhost:3000` (Home) y `http://localhost:3000/search` (Búsqueda).

---

## 🧰 Stack técnico

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)

</div>

---

## 👤 Autor

**Diego** — Estudiante de Diseño y Desarrollo de Software, Tecsup
📍 Laboratorio 09 · Desarrollo de Aplicaciones Web Avanzado

<div align="center">

⭐ *Si este repo te sirvió de guía, no olvides dejar una estrella* ⭐

</div>