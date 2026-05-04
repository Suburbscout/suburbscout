import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://suburbscout.com.au',
  output: 'static',
  build: {
    assets: '_assets'
  },
  compressHTML: true,
});
