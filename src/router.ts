import path from 'node:path';
import { glob } from 'glob';
import Elysia from 'elysia';

export default async function fsRouter(app: Elysia, groupsDir = 'groups') {
  const groupsPath = path.join(path.dirname(Bun.main), groupsDir);
  const files = await glob('**/index.{ts,tsx}', { cwd: groupsPath, absolute: true });

  for (const file of files) {
    const { default: group } = await import(file);
    const folderName = path.dirname(file).replace(groupsPath, '');
    app.use((app) => group(app, folderName));
  }
  return app;
}

