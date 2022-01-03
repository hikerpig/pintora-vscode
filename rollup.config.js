import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-import-css'

export default [
  {
    input: './src/extension.ts',
    output: {
      file: './out/extension.js',
      format: 'cjs',
      sourcemap: true,
    },
    external: ['vscode'],
    plugins: [nodeResolve(), commonjs(), typescript()],
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
      typescript({ lib: ['es5', 'es6', 'dom'], target: 'es6', module: 'es6' }),
      css({
        output: 'bundled.css'
      }),
    ],
  },
]
