import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import {
  uglify
}
from 'rollup-plugin-uglify'
export default [{
  input: 'src/Router/Browser/index.js',
  output: {
    file: 'build/Browser/index.js',
    name: 'browser',
    format: 'umd'
  },
  plugins: [
    cjs(),
    resolve({
      jsnext: true
    }),
    babel({
      babelrc: false,
      presets: [
        ["env", {
          useBuiltIns: false,
          modules: false
        }]
      ],
      plugins: ["transform-object-rest-spread", "external-helpers"],
      exclude: 'node_modules/**' // only transpile our source code
    }),
    uglify({
      compress: {
        ie8: true,
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ]
}, {
  input: 'src/Router/React/index.js',
  output: {
    file: 'build/React/index.js',
    name: 'react',
    format: 'umd'
  },
  plugins: [
    cjs({
      include: 'node_modules/**',
      namedExports: {
        './node_modules/react/react.js': ['cloneElement', 'createElement', 'PropTypes', 'Children', 'Component'],
      }
    }),
    resolve({
      jsnext: true,
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
    babel({
      babelrc: false,
      presets: [
        ["env", {
          useBuiltIns: false,
          modules: false
        }], 'react',
      ],
      plugins: ["transform-object-rest-spread", "external-helpers"],
      exclude: 'node_modules/**' // only transpile our source code
    }),
    uglify({
      compress: {
        ie8: true,
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ]
}, {
  input: 'src/Router/index.js',
  output: {
    file: 'build/index.js',
    name: 'router',
    format: 'umd'
  },
  plugins: [
    cjs({
      include: 'node_modules/**',
      namedExports: {
        './node_modules/react/react.js': ['cloneElement', 'createElement', 'PropTypes', 'Children', 'Component'],
      }
    }),
    resolve({
      jsnext: true,
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
    babel({
      babelrc: false,
      presets: [
        ['env', {
          useBuiltIns: false,
          modules: false
        }], 'react',
      ],
      plugins: ["transform-object-rest-spread", "external-helpers"],
      exclude: 'node_modules/**' // only transpile our source code
    }),
    uglify({
      compress: {
        ie8: true,
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ]
}];
