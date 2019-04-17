// Styles
import '../sass/styles.sass';

// Libraries

// Modules
import LazyImage from './imports/LazyImage';
import lazyLoadImages from './imports/lazyLoadImages';

customElements.define('lhm-lazy-image', LazyImage);

window.addEventListener('load', () => {
    lazyLoadImages();
});
