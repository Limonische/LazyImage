// Common module for development and production

const merge = require('webpack-merge');

const pug = require('./pug');
const sass = require('./sass');
const images = require('./images');
const fonts = require('./fonts');
const js = require('./js');
const html = require('./html');
const workbox = require('./workbox');

// Merge all common modules
module.exports = (env, argv) => merge(
    sass(env, argv),
    pug,
    images,
    fonts,
    js,
    html,
    workbox
);
