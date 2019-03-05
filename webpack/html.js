// HTML module

const fs = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// Generate HTML pages from .pug files
function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];

        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(
                __dirname,
                `${templateDir}/${name}.${extension}`
            ),
            inject: 'body',
            minify: {
                removeComments: true,
                removeScriptTypeAttributes: true,
                useShortDoctype: true
            }
        });
    });
}

const htmlPlugins = generateHtmlPlugins('../src/pug/views');

// Concatenate all instanses of HtmlWebpackPlugin to plugins
module.exports = {
    plugins: [].concat(htmlPlugins)
};
