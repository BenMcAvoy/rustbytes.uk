import { Elysia } from 'elysia';

import { staticPlugin } from '@elysiajs/static';
import { html } from '@elysiajs/html';

import fsRouter from './router';

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(async (app) => await fsRouter(app, './routes'))
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
