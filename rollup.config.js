import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
    input: 'src/furtive.js',
    plugins: [
        json(),
        babel(babelrc()),
        uglify()
    ],
    output: {
        file: 'build/furtive.min.js',
        format: 'umd'
    }
}
