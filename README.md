# Muhammad Arslan – portfolio (React + Vite)

Real routes: `/`, `/experience`, `/projects`, `/skills`, `/research`, `/contact`.

    npm install
    npm run dev       # local development
    npm run build     # production build in dist/

Deploy `dist/` to Netlify or Vercel (SPA rewrites are already included). After you have a domain, add
`<link rel="canonical">`, `og:url` and `og:image` to `index.html`, plus a `sitemap.xml`.
Content lives in `src/data.js`; the 3D scene is `src/scene.js`; styles are in `src/styles.css`.
