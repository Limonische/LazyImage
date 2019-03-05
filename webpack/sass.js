// Module for sass, scss and css

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    return {
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // Change loader depending on mode
                        argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            // Extract css into separate files for production
            new MiniCssExtractPlugin({
                filename: './css/[name].css'
            })
        ]
    };
};
