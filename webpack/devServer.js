const webpack = require('webpack');

let devServer;

// Перезагрузка при изменении html для использования с HotModuleReplacement
function reloadHtml() {
    const cache = {};
    const plugin = { name: 'CustomHtmlReloadPlugin' };

    this.hooks.compilation.tap(plugin, compilation => {
        compilation.hooks.htmlWebpackPluginAfterEmit.tap(plugin, data => {
            const orig = cache[data.outputName];
            const html = data.html.source();

            if (orig && orig !== html) {
                devServer.sockWrite(devServer.sockets, 'content-changed');
            }

            cache[data.outputName] = html;
        });
    });
}

// Конфигурация локального сервера для разработки
module.exports = {
    devServer: {
        // Необходимо для перезагрузки html с HMR
        before(app, server) {
            devServer = server;
        },
        // Сжатие
        compress: true,
        // Адрес хоста
        // Сменить на 0.0.0.0 для доступа с других устройств
        host: 'localhost',
        // Открытие браузера после компиляции
        open: true,
        // Порт
        port: 3000,
        // HMR
        hot: true,
        // Выключение проверки хоста
        disableHostCheck: true,
        // Избавление от лишней статистики
        stats: {
            entrypoints: false,
            children: false,
            warnings: false,
            modules: false
        }
    },
    // Плагин для HMR
    plugins: [new webpack.HotModuleReplacementPlugin(), reloadHtml]
};
