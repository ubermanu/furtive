import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import copy from 'rollup-plugin-copy'
import pkg from './package.json' assert { type: 'json' }

const output = {
  file: pkg.main,
  format: 'umd',
  sourcemap: true,
  globals: {
    jquery: '$',
  },
}

export default [
  {
    input: 'src/plugin.js',
    output: [
      output,
      {
        ...output,
        file: pkg.main.replace(/.js$/, '.min.js'),
        plugins: [terser()],
      },
    ],
    plugins: [json()],
    external: ['jquery'],
  },
  {
    input: 'src/furtive.js',
    output: [
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      copy({
        targets: [{ src: 'src/furtive.css', dest: 'dist' }],
      }),
    ],
    external: ['jquery'],
  },
]
