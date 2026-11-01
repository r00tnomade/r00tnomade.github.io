import { defineConfig } from 'astro/config';
import { site } from './src/content/site.ts';

export default defineConfig({
  site: site.url,
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
});
