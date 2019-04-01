// Styles
import '../sass/styles.sass';

// Libraries
// import objectFitImages from 'object-fit-images';

// Modules
import lazyLoadImages from './imports/lazyLoad';

// object-fit for browsers without support
// objectFitImages();

window.addEventListener('load', () => {
    // Lazy loading for images
    lazyLoadImages();
});
