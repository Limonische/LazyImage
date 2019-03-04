const path = require('path');
const merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const common = require('./webpack/common');
const devServer = require('./webpack/devServer');

module.exports = (env, argv) => merge(
    {
        // Входные файлы
        entry: {
            main: './src/js/main.js'
        },
        // Выходные файлы
        output: {
            filename: './js/[name].bundle.js',
            chunkFilename: './js/[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        // Избавление от лишней статистики в консоли
        stats: {
            entrypoints: false,
            children: false,
            warnings: false,
            modules: false
        },
        optimization: {
            // Плагины для сжатия CSS и JavaScript
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: argv.mode === 'development' ? true : false
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            // Разбиение файлов
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    }
                }
            }
        },
        devtool: argv.mode === 'development' ? 'source-map' : false,
        plugins: [new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: 'dist/*'})]
    },
    // Приращение общего модуля
    common(env, argv),
    // Приращение модулей в зависимости от режима
    argv.mode === 'development' ? devServer(env, argv) : null
);
