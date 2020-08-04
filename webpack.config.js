const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './index.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ],
    },
    module: {
        rules: [{
            use: []
        }]
    },
    plugins: [
    new CopyPlugin({
        patterns: [
        { from: 'storage', to: 'storage' },
        { from: 'public', to: 'public' },
        ],
    }),
    ],
};