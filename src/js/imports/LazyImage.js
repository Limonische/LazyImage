class LazyImage extends HTMLElement {
    loaded = false;

    firstSrc = true;

    firstSrcset = true;

    srcset = null;

    src = null;

    image = new Image();

    wrapper = document.createElement('div');

    static get observedAttributes() {
        return ['srcset', 'src', 'sizes', 'alt', 'image-class', 'image-id', 'width', 'height', 'fit', 'position'];
    }

    constructor() {
        super();

        this.wrap();
        this.addEventListeners();
        this.addInitialStyles();
    }

    set visible(visible) {
        if ((!this.srcset && !this.src) || !visible || this.loaded) return;

        if (this.srcset) this.image.srcset = this.srcset;
        if (this.src) this.image.src = this.src;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
        case 'srcset':
            if (oldValue === newValue) break;
            if (this.firstSrcset) {
                this.srcset = newValue;
                this.loaded = false;
                this.firstSrcset = false;
            } else {
                this.image.srcset = newValue;
                this.loaded = false;
                this.showWrapper();
            }
            break;
        case 'src':
            if (oldValue === newValue) break;
            if (this.firstSrc) {
                this.src = newValue;
                this.loaded = false;
                this.firstSrc = false;
            } else {
                this.image.src = newValue;
                this.loaded = false;
                this.showWrapper();
            }
            break;
        case 'sizes':
            this.image.sizes = newValue;
            break;
        case 'alt':
            this.image.alt = newValue;
            break;
        case 'image-class':
            this.image.className = newValue;
            break;
        case 'image-id':
            this.image.id = newValue;
            break;
        case 'width':
            this.style.width = newValue;
            break;
        case 'height':
            this.style.height = newValue;
            break;
        case 'fit':
            this.style.objectFit = newValue;
            break;
        case 'position':
            this.style.objectPosition = newValue;
            break;
        default:
            break;
        }
    }

    addEventListeners() {
        this.image.addEventListener('load', this.onImageLoad);
    }

    onImageLoad = () => {
        this.loaded = true;
        this.appendChild(this.image);
        this.hideWrapper();
    }

    onWrapperTransitionEnd = () => {
        this.wrapper.style.display = 'none';
    }

    wrap() {
        this.wrapper.innerHTML = this.innerHTML;
        this.innerHTML = '';
        this.appendChild(this.wrapper);
    }

    addInitialStyles() {
        this.style.display = 'block';
        this.style.position = 'relative';

        this.image.style.width = '100%';
        this.image.style.height = '100%';
        this.image.style.objectFit = 'inherit';
        this.image.style.objectPosition = 'inherit';

        this.wrapper.style.transition = 'opacity .5s ease-in-out';
        this.wrapper.style.position = 'absolute';
        this.wrapper.style.top = 0;
        this.wrapper.style.right = 0;
        this.wrapper.style.bottom = 0;
        this.wrapper.style.left = 0;
    }

    hideWrapper() {
        setTimeout(() => {
            if (this.loaded) {
                this.wrapper.style.opacity = 0;
                this.wrapper.addEventListener('transitionend', this.onWrapperTransitionEnd, { once: true });
            }
        }, 100);
    }

    showWrapper() {
        this.wrapper.style.display = 'block';

        setTimeout(() => {
            if (!this.loaded) this.wrapper.style.opacity = 1;
        }, 100);
    }
}

export default LazyImage;
