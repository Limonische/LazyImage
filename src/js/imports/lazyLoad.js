// Lazy loading for images
const lazyLoadImages = () => {
    let lazyImages = [...document.querySelectorAll('img.lazy')];
    let active = false;

    const lazyLoad = () => {
        if (active === false) {
            active = true;

            setTimeout(() => {
                lazyImages.forEach(lazyImage => {
                    const { top, bottom } = lazyImage.getBoundingClientRect();
                    const { display } = getComputedStyle(lazyImage);

                    if (top <= window.innerHeight && bottom >= 0 && display !== 'none') {
                        const src = lazyImage.getAttribute('data-src');
                        const srcSet = lazyImage.getAttribute('data-srcset');

                        lazyImage.src = src || '';
                        lazyImage.srcset = srcSet || '';
                        lazyImage.classList.remove('lazy');

                        lazyImages = lazyImages.filter(image => image !== lazyImage);

                        if (lazyImages.length === 0) {
                            document.removeEventListener('scroll', lazyLoad);
                            window.removeEventListener('resize', lazyLoad);
                            window.removeEventListener('orientationchange', lazyLoad);
                        }
                    }
                });

                active = false;
            }, 200);
        }
    };

    lazyLoad();
    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationchange', lazyLoad);
};

export default lazyLoadImages;
