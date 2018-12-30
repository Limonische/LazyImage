// Модуль картинок

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: '../images'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // Переносим картинки из папки src/images в dist/images
        new CopyWebpackPlugin([
            {
                from: './src/images',
                to: './images'
            }
        ])
    ]
};
