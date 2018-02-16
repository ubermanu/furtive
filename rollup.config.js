import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
    input: 'src/reveal.js',
    plugins: [
        babel(babelrc()),
        uglify()
    ],
    output: {
        file: 'build/reveal.min.js',
        format: 'umd'
    }
}