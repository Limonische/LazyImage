const lazyLoadImages = async () => {
    const polyfills = [];

    if (
        !('IntersectionObserver' in window)
        || !('IntersectionObserverEntry' in window)
        || !('intersectionRatio' in window.IntersectionObserverEntry.prototype)
    ) {
        const intersectionObserverPolyfill = import(/* webpackChunkName: 'intersection-observer' */ 'intersection-observer');

        polyfills.push(intersectionObserverPolyfill);
    }

    if (!('requestIdleCallback' in window)) {
        const requestIdleCallbackPolyfill = import(/* webpackChunkName: 'request-idle-callback' */ 'requestidlecallback-polyfill');

        polyfills.push(requestIdleCallbackPolyfill);
    }

    await Promise.all(polyfills);

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.visible = entry.isIntersecting;
        });
    });

    const lazyImages = [...document.querySelectorAll('lhm-lazy-image')];

    lazyImages.forEach(image => {
        io.observe(image);

        requestIdleCallback(() => {
            image.visible = true;
        });
    });
};

export default lazyLoadImages;
