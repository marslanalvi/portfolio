# Muhammad Arslan — AI Engineer Portfolio

Personal portfolio of **Muhammad Arslan**, Senior AI Engineer and team lead working on Generative AI, LLMs, RAG, AI agents and real-time voice AI.

**Live site:** https://marslanalvi.github.io/portfolio/

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D-000000?logo=threedotjs&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222222?logo=github&logoColor=white)

## Pages

| Route | What's there |
| --- | --- |
| `/` | Introduction and highlights |
| `/experience` | Work history |
| `/projects` | Personal projects |
| `/skills` | Technical skills |
| `/research` | Published NLP papers |
| `/contact` | Email, LinkedIn and GitHub |

The site also includes an interactive 3D scene and a small built-in chat assistant that answers questions about my background.

## Tech stack

- **React 18** with **React Router** for page navigation
- **Vite** for development and production builds
- **Three.js** for the 3D background scene
- **GitHub Actions** builds and deploys the site to **GitHub Pages** on every push to `main`

## Running locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173/portfolio/.

To make a production build in `dist/`:

```bash
npm run build
```

## Project structure

```text
src/
├── data.js       # All site content: experience, projects, skills, research
├── pages.jsx     # Page components
├── Layout.jsx    # Header, navigation and footer
├── Stage.jsx     # 3D scene wrapper
├── scene.js      # Three.js scene
├── Bot.jsx       # Chat assistant
└── styles.css    # Styles
```

To change what the site says, edit `src/data.js`.

## Contact

- Email: [arslanalvi.ai@gmail.com](mailto:arslanalvi.ai@gmail.com)
- LinkedIn: [linkedin.com/in/marslanalvi](https://www.linkedin.com/in/marslanalvi)
- GitHub: [github.com/marslanalvi](https://github.com/marslanalvi)
