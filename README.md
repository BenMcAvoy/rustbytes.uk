# RustBytes

The source for [rustbytes.uk](https://rustbytes.uk), my personal website and programming blog. It is built with Astro and includes a small collection of posts about programming and software projects.

## What is in the repo

- Astro pages and shared components in `src/pages` and `src/components`
- Blog posts in `src/content/blog`
- An RSS feed at `/rss.xml`
- Sitemap generation for the deployed site

## Run locally

You will need Node.js and npm.

```sh
npm ci
npm run dev
```

Astro prints the local address when the development server starts. To check a production build and preview it locally:

```sh
npm run build
npm run preview
```

The site URL and shared title and description are configured in `astro.config.mjs` and `src/consts.ts`.
