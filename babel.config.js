// Конфигурация Babel

module.exports = api => {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                modules: false,
                // Автоматическая иньекция только нужных полифилов
                useBuiltIns: 'usage'
            }
        ]
    ];
    const plugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
        '@babel/plugin-syntax-dynamic-import'
    ];

    return {
        presets,
        plugins,
        sourceMaps: true,
        retainLines: true
    };
};
