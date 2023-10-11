import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import type { UserConfigFn } from 'vite';
import { overrideVaadinConfig } from './vite.generated';

const customConfig: UserConfigFn = (env) => ({
  // Here you can add custom Vite parameters
  // https://vitejs.dev/config/
  plugins: [
    react({ include: '**/*.tsx', }),
  ],
  build: {
    minify: false,
    rollupOptions: {
      input: {
        appMain: resolve(__dirname, 'frontend/index.ts'),
        webComponent: resolve(__dirname, 'frontend/web-component.tsx'),
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    },
  },
});

export default overrideVaadinConfig(customConfig);
