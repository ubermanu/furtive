import uglify from 'rollup-plugin-uglify';

export default {
    input: 'src/reveal.js',
    plugins: [
        uglify()
    ],
    output: {
        file: 'build/reveal.min.js',
        format: 'umd'
    }
}