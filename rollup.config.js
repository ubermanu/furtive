import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import copy from 'rollup-plugin-copy'
import pkg from './package.json' assert { type: 'json' }

export default [
  {
    input: 'src/plugin.js',
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        sourcemap: false,
        globals: {
          jquery: '$',
        },
      },
    ],
    plugins: [json(), terser()],
    external: ['jquery'],
  },
  {
    input: 'src/furtive.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
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
