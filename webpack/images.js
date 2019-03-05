// Images module

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
        // Move images from src/images to dist/images
        new CopyWebpackPlugin([
            {
                from: './src/images',
                to: './images'
            }
        ])
    ]
};
