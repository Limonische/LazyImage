// Модуль css, sass и scss

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    return {
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // Смена loader-а в зависимости от режима
                        argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            // Вынос стилей в отдельные файлы для production
            new MiniCssExtractPlugin({
                filename: './css/[name].css'
            })
        ]
    };
};
