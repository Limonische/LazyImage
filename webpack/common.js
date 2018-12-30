// Общий модуль для development и production

const merge = require('webpack-merge');

const pug = require('./pug');
const sass = require('./sass');
const images = require('./images');
const fonts = require('./fonts');
const js = require('./js');
const html = require('./html');

// Сращивание всех общих модулей
module.exports = (env, argv) => merge(
    sass(env, argv),
    pug,
    images,
    fonts,
    js,
    html
);
