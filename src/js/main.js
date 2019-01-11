'use strict';

// Стили
import '../sass/styles.sass';

// Библиотеки
import objectFitImages from 'object-fit-images';

// Модули
import lazyLoad from './imports/lazyLoad';

// Object-fit для браузеров без его поддержки
objectFitImages();

window.addEventListener('load', () => {
    // Регистрация Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }

    // Ленивая загрузка изображений
    lazyLoad();
});
