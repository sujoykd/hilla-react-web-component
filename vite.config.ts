import react from '@vitejs/plugin-react';
import { dirname, resolve, relative } from 'node:path';
import type { OutputAsset, OutputChunk } from 'rollup';
import type { UserConfigFn, Plugin } from 'vite';
import { vaadinConfig } from './vite.generated.js';

const index = resolve(__dirname, 'frontend/index.html');
const app = resolve(__dirname, 'frontend/index.ts');
const webComponent = resolve(__dirname, 'frontend/web-component.tsx');
const vaadin = resolve(__dirname, 'frontend/generated/vaadin.ts');

function makeCSSCode(style: string): string {
  return `var css = new CSSStyleSheet();
css.replaceSync("${style.split('\n').map((line) => line.trim()).join('')}");
export { css };
`
}

function constructedStyleSheetPlugin(): Plugin {
  return {
    apply: 'build',
    enforce: 'post',
    name: 'constructed-style-sheet-plugin',
    generateBundle(_, bundle) {
      const keys = Object.keys(bundle);
      const styleCssKey = keys.find(
        (i) =>
          bundle[i].type == 'asset' &&
          bundle[i].fileName.endsWith('.css')
      );

      const sharedJsKey = keys.find((i) => bundle[i].fileName.includes('shared'));

      const style = (bundle[styleCssKey] as OutputAsset).source as string;
      delete bundle[styleCssKey];

      (bundle[sharedJsKey] as OutputChunk).code = `${makeCSSCode(style)}${(bundle[sharedJsKey] as OutputChunk).code}`;

      const appKey = keys.find((i) => bundle[i].fileName.includes('index') || !bundle[i].fileName.includes('html'));
      const webComponentKey = keys.find((i) => bundle[i].fileName.includes('webComponent'));

      const buildDir = dirname(appKey);
      (bundle[appKey] as OutputChunk).code = `import {css} from './${relative(buildDir, sharedJsKey)}';\n${(bundle[appKey] as OutputChunk).code.replace(/__IMPORTED_STYLES__/ugm, 'css')}`;
      (bundle[webComponentKey] as OutputChunk).code = `import {css} from './${relative(buildDir, sharedJsKey)}';\n${(bundle[webComponentKey] as OutputChunk).code.replace(/__IMPORTED_STYLES__/ugm, 'css')}`;
    },
    transformIndexHtml: {
      enforce: 'post',
      transform(html) {
        return html.replace(/<link rel="stylesheet".*$/mgu, '');
      }
    }
  }
}

const customConfig: UserConfigFn = async (env) => {
  const def = await vaadinConfig(env);

  return ({
    ...def,
    // Here you can add custom Vite parameters
    // https://vitejs.dev/config/
    plugins: [
      ...def.plugins,
      constructedStyleSheetPlugin(),
      react({ include: '**/*.tsx', }),
    ],
    optimizeDeps: {},
    build: {
      ...def.build,
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        ...def.build?.rollupOptions,
        input: {
          index,
          vaadin,
          webComponent,
        },
        output: {
          manualChunks(id) {
            if (app.includes(id) || index.includes(id)) {
              return 'app-main';
            }

            if (webComponent.includes(id)) {
              return 'web-component';
            }

            if (vaadin.includes(id)) {
              return 'vaadin';
            }

            return 'shared';
          }
        }
      },
    },
  });
};

export default customConfig;
