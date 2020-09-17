import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
const needUglify = process.argv.includes('--uglify')
export default {
  input: 'src/storage-idb-message.ts',
  output: [
    {
      file: 'storage-idb-message.js',
      format: 'umd',
      name: 'StorageIdbMessage',
    },
  ],
  plugins: [
    commonjs(),
    resolve({
      extensions: ['.ts', '.js'],
    }),
    babel({
      extensions: ['.js', '.ts'],
      exclude: [/\/core-js\//],
    }),
    needUglify &&
      uglify({
        compress: {
          // drop_console: true, //清除 console
          pure_funcs: ['console.log'],
        },
      }),
  ],
}
