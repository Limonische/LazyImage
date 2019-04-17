const lazyLoadImages = async () => {
    if (
        !('IntersectionObserver' in window)
        || !('IntersectionObserverEntry' in window)
        || !('intersectionRatio' in window.IntersectionObserverEntry.prototype)
    ) {
        await import(/* webpackChunkName: 'intersection-observer' */ 'intersection-observer');
    }

    if (!('requestIdleCallback' in window)) {
        await import(/* webpackChunkName: 'request-idle-callback' */ 'requestidlecallback-polyfill');
    }

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
