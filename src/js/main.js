'use strict';

// Стили
import '../sass/styles.sass';

// Библиотеки
import objectFitImages from 'object-fit-images';

// Модули
import lazyLoad from './imports/lazyLoad';

document.addEventListener('DOMContentLoaded', () => {
    // После загрузки DOM
    objectFitImages();

    window.addEventListener('load', () => {
        // После загрузки страницы

        // Ленивая загрузка изображений
        lazyLoad();

        // Регистрация Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js');
        }
    });
});
