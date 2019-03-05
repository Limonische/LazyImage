const webpack = require('webpack');

let devServer;

// Reload on html change for Hot Module Replacement
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

// Local development server configuration
module.exports = (env, argv) => {
    return {
        devServer: {
            // Is needed for html reload with HMR
            before(app, server) {
                devServer = server;
            },
            // Compression
            compress: true,
            // Change host name depending on mode
            host: argv.share ? '0.0.0.0' : 'localhost',
            // Open default browser after compilation
            open: true,
            port: 3000,
            // Hot Module Replacement
            hot: true,
            disableHostCheck: true,
            // Remove unnecessary stats
            stats: {
                entrypoints: false,
                children: false,
                warnings: false,
                modules: false
            }
        },
        plugins: [new webpack.HotModuleReplacementPlugin(), reloadHtml]
    }
};
