import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

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
    resolve({
      extensions: ['.ts'],
    }),
    babel({
      extensions: ['.js', '.ts'],
    }),
    needUglify && uglify(),
  ],
}
