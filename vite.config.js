import { defineConfig } from 'vite';

export default defineConfig({
  // Относительные пути работают и на GitHub Pages в подпапке репозитория,
  // и при открытии собранной папки dist на любом статическом хостинге.
  base: './',
});
