// Модуль Workbox для Service Worker

const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    plugins: [
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            importsDirectory: 'workbox-assets'
        })
    ]
};
