import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-import-css'
import json from '@rollup/plugin-json'
import nativePlugin from 'rollup-plugin-natives';

export default [
  {
    input: './src/extension.ts',
    output: {
      file: './out/extension.js',
      format: 'commonjs',
      sourcemap: true,
    },
    external: ['vscode', '@pintora/cli'],
    plugins: [nodeResolve(), commonjs(), typescript(), json(),
      nativePlugin({
      // Where we want to physically put the extracted .node files
      copyTo: 'out/libs',

      // Path to the same folder, relative to the output bundle js
      destDir: './libs',

      // Use `dlopen` instead of `require`/`import`.
      // This must be set to true if using a different file extension that '.node'
      dlopen: false,

      // Generate sourcemap
      sourcemap: true
  })],
  },
  {
    input: './src/previewer/index.ts',
    output: {
      file: './out/previewer/index.js',
      format: 'umd',
      sourcemap: true,
    },
    external: ['vscode'],
    plugins: [
      nodeResolve(),
      typescript(),
      css({
        output: 'bundled.css'
      }),
    ],
  },
  {
    input: './src/markdown-script.ts',
    output: {
      file: './out/markdown-script.js',
      format: 'umd',
      sourcemap: true,
    },
    external: ['vscode'],
    plugins: [nodeResolve(), commonjs(), typescript()],
  },
]
