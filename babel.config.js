// Babel configuration

module.exports = api => {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                modules: false,
                // Auto-inject only those polyfills that are needed
                useBuiltIns: 'usage',
                corejs: 3,
            },
        ],
    ];
    const plugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
        '@babel/plugin-syntax-dynamic-import',
    ];

    return {
        presets,
        plugins,
        sourceMaps: true,
        retainLines: true,
    };
};
