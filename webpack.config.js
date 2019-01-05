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
                    parallel: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            // Разбиение файлов
            splitChunks: {
                chunks: 'all',
                minSize: 0
            }
        },
        plugins: [new CleanWebpackPlugin(['dist/*'])]
    },
    // Приращение общего модуля
    common(env, argv),
    // Приращение модулей в зависимости от режима
    argv.mode === 'development' ? devServer : null
);
