import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import vue from "@astrojs/vue";
export const SITE = {
  name: 'AstroWind',
  origin: 'https://bootladder.com/',
  basePathname: '/',
  title: 'Bootladder Engineering',
  description: 'Firmware for the 21st Century'
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));



// https://astro.build/config
export default defineConfig({
  // Astro uses this full URL to generate your sitemap and canonical URLs in your final build
  site: SITE.origin,
  base: SITE.basePathname,
  output: 'static',
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sitemap(), image(), vue()],
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  }
});