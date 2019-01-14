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
        navigator.serviceWorker
            .register('service-worker.js')
            .then(registration => {
                console.log('Service worker registered: ', registration);
            })
            .catch(registrationError => {
                console.log('Service worker registration failed: ', registrationError);
            });
    }

    // Ленивая загрузка изображений
    lazyLoad();
});
