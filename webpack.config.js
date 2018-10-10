/* eslint-disable */

const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const rel = (p) => path.resolve(__dirname, p);
const isDev = (process.env.NODE_ENV !== 'production');
const plugins = [];

if (!isDev) {
    plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
    }));
}

module.exports = {
    mode: isDev ? 'development' : 'production',

    entry: './demo',

    output: {
        path: rel('build'),
        filename: 'demo.js'
    },

    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            use: 'eslint-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.(css|html|jpe?g|png)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }]
        }]
    },

    devServer: {
        contentBase: rel('build'),
        compress: true,
        port: 8000
    },

    watchOptions: {
        aggregateTimeout: 500
    },

    plugins: [
        ...plugins
    ]
};
