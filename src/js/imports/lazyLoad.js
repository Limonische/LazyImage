'use strict';

// Ленивая загрузка изображений
const lazyLoadImages = () => {
    let lazyImages = [...document.querySelectorAll('img[data-src]')];

    lazyImages.forEach(lazyImage => {
        const dataSrcset = lazyImage.getAttribute('data-srcset');
        const dataSrc = lazyImage.getAttribute('data-src');

        if (dataSrcset) lazyImage.srcset = dataSrcset;

        lazyImage.src = dataSrc;
        lazyImage.removeAttribute('data-srcset');
        lazyImage.removeAttribute('data-src');
    });
};

export { lazyLoadImages };
