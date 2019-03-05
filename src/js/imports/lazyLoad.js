'use strict';

// Lazy loading for images
const lazyLoadImages = () => {
    let lazyImages = [...document.querySelectorAll('img.lazy')];
    let active = false;

    const lazyLoad = () => {
        if (active === false) {
            active = true;

            setTimeout(() => {
                for (let lazyImage of lazyImages) {
                    let { top, bottom } = lazyImage.getBoundingClientRect();
                    let { display } = getComputedStyle(lazyImage);

                    if (top <= window.innerHeight && bottom >= 0 && display !== 'none') {
                        let src = lazyImage.getAttribute('data-src');
                        let srcSet = lazyImage.getAttribute('data-srcset');

                        lazyImage.src = src ? src : '';
                        lazyImage.srcset = srcSet ? srcSet : '';
                        lazyImage.classList.remove('lazy');

                        lazyImages = lazyImages.filter((image) => image !== lazyImage);

                        if (lazyImages.length === 0) {
                            document.removeEventListener('scroll', lazyLoad);
                            window.removeEventListener('resize', lazyLoad);
                            window.removeEventListener('orientationchange', lazyLoad);
                        }
                    }
                }

                active = false;
            }, 200);
        }
    };

    lazyLoad();
    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationchange', lazyLoad);
};

export { lazyLoadImages };
