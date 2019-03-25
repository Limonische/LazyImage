// Main webpack configuration

const path = require('path');
const merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const common = require('./webpack/common');
const devServer = require('./webpack/devServer');

module.exports = (env, argv) => merge(
    {
        // Entry JavaScript files
        entry: {
            main: './src/js/main.js',
        },
        // Output JavaScript files
        output: {
            filename: './js/[name].bundle.js',
            chunkFilename: './js/[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        // Remove unnecessary stats
        stats: {
            entrypoints: false,
            children: false,
            warnings: false,
            modules: false,
        },
        optimization: {
            // Plugins for CSS and JavaScript minification
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: argv.mode === 'development',
                }),
                new OptimizeCSSAssetsPlugin({}),
            ],
            // Split JavaScript files into separate chunks
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true,
                    },
                },
            },
        },
        // Add source maps for development
        devtool: argv.mode === 'development' ? 'source-map' : false,
        plugins: [new CleanWebpackPlugin()],
    },
    // Merge common module
    common(env, argv),
    // Merge other modules depending on mode
    argv.mode === 'development' ? devServer(env, argv) : null,
);
