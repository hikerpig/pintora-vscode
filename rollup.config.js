import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-import-css'
import json from '@rollup/plugin-json'

export default [
  {
    input: './src/extension.ts',
    output: {
      file: './out/extension.js',
      format: 'commonjs',
      sourcemap: true,
    },
    external: ['vscode'],
    plugins: [nodeResolve(), commonjs(), typescript(), json()],
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
