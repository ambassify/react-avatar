/* eslint-disable */

const { BABEL_MODULES = false } = process.env;

module.exports = {
    targets: '> 0.25%, not dead',
    presets: [
        [ '@babel/preset-env', { modules: BABEL_MODULES } ],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime',
        [ 'polyfill-corejs3', { method: 'usage-pure' } ],
    ]
};
