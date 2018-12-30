'use strict';

// Ленивая загрузка изображений
const lazyLoad = () => {
    // Замена srcset во всех картинках страницы
    [].forEach.call(document.querySelectorAll('img[data-srcset]'), img => {
        img.setAttribute('srcset', img.getAttribute('data-srcset'));
        img.addEventListener('load', () => {
            img.removeAttribute('data-srcset');
        });
    });

    // Замена src во всех картинках страницы
    [].forEach.call(document.querySelectorAll('img[data-src]'), img => {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.addEventListener('load', () => {
            img.removeAttribute('data-src');
        });
    });
};

export default lazyLoad;
