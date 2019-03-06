// Styles
import '../sass/styles.sass';

// Libraries
// import objectFitImages from 'object-fit-images';

// Modules
import lazyLoadImages from './imports/lazyLoad';

// object-fit for browsers without support
// objectFitImages();

// Lazy loading for images
lazyLoadImages();

// window.addEventListener('load', () => {
//     // Register Service Worker
//     if ('serviceWorker' in navigator) {
//         navigator.serviceWorker
//             .register('service-worker.js')
//             .then(registration => {
//                 console.log('Service worker registered: ', registration);
//             })
//             .catch(registrationError => {
//                 console.log('Service worker registration failed: ', registrationError);
//             });
//     }
// });
