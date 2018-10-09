/* eslint-disable */

const { BABEL_MODULES = false } = process.env;

module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "targets": "> 0.25%, not dead",
            "modules": BABEL_MODULES,
            "useBuiltIns": "usage"
        }],
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ]
}
