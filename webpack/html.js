// html-модуль

const fs = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// Генерация html-страниц из pug-файлов
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

// Присоединение всех сгенерированных инстансов HtmlWebpackPlugin к плагинам
module.exports = {
    plugins: [].concat(htmlPlugins)
};
