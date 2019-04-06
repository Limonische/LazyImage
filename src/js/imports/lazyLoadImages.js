// Lazy loading for images
const lazyLoadImages = async () => {
    const lazyImages = [...document.querySelectorAll('img.lazy')];

    const loadLazyImage = lazyImage => {
        const { src, srcset } = lazyImage.dataset;

        lazyImage.src = src || '';
        lazyImage.srcset = srcset || '';
        lazyImage.classList.remove('lazy');
    };

    if (!('IntersectionObserver' in window)
        || !('IntersectionObserverEntry' in window)
        || !('intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
        await import(/* webpackChunkName: 'intersection-observer' */ 'intersection-observer');
    }

    const lazyImageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;

                loadLazyImage(lazyImage);
                lazyImageObserver.unobserve(lazyImage);
            }
        });
    });

    if (!('requestIdleCallback' in window)) {
        await import(/* webpackChunkName: 'request-idle-callback' */ 'requestidlecallback-polyfill');
    }

    lazyImages.forEach(lazyImage => {
        lazyImageObserver.observe(lazyImage);

        requestIdleCallback(() => {
            loadLazyImage(lazyImage);
        });
    });
};

export default lazyLoadImages;
