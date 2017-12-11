let instance = null;

class Ui {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.nav = document.querySelector('.c-nav');
    this.scrollToggle = document.querySelectorAll('.js-scroll');

    return instance;
  }

  lazyLoadImg(item) {
    [].forEach.call(item.querySelectorAll('img[data-src]'), (img) => {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function() {
        img.removeAttribute('data-src');
      };
    });
  }

  isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;

    // Only completely visible elements return true:
    var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    // Partially visible elements return true:
    // isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  smoothScroll(anchor, duration) {
    // Calculate how far and how fast to scroll
    const startLocation = window.pageYOffset;
    const endLocation = anchor.offsetTop + 300;
    const distance = endLocation - startLocation;
    const increments = distance / (duration / 16);
    let stopAnimation;

    // Scroll the page by an increment, and check if it's time to stop
    const animateScroll = () => {
      window.scrollBy(0, increments);
      stopAnimation();
    };

    // Loop the animation function
    const runAnimation = setInterval(animateScroll, 16);

    // If scrolling down
    if (increments >= 0) {
      // Stop animation when you reach the anchor OR the bottom of the page
      stopAnimation = () => {
        const travelled = window.pageYOffset;
        if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
          clearInterval(runAnimation);
        }
      };
    }
    // If scrolling up
    else {
      // Stop animation when you reach the anchor OR the top of the page
      stopAnimation = () => {
        const travelled = window.pageYOffset;
        if ( travelled <= (endLocation || 0) ) {
          clearInterval(runAnimation);
        }
      };
    }
  }

  scrollAnchor() {

    // For each smooth scroll link
    this.scrollToggle.forEach(toggle => {
      // When the smooth scroll link is clicked
      toggle.addEventListener('click', e => {
        // Prevent the default link behavior
        e.preventDefault();
        // Get anchor link and calculate distance from the top
        const dataID = toggle.getAttribute('href');
        const dataTarget = document.querySelector(dataID);
        const dataSpeed = toggle.getAttribute('data-speed');
        // If the anchor exists
        if (dataTarget) {
          // Scroll to the anchor
          instance.smoothScroll(dataTarget, dataSpeed || 3000);

          // Push new state history to dynamically change the URL
          if(history.pushState) {
            history.pushState(null, null, '/'+dataID);
          }
          else {
              location.hash = '/'+dataID;
          }
        }
      }, false);
    });
  }

  navScroll() {

    let lastScrollPosition = 0;
    let ticking = false;

    window.addEventListener(
      'scroll',
      () => {

        lastScrollPosition = window.scrollY;

        if (!ticking) {

          window.requestAnimationFrame(() => {

            // Execute only on desktop and when the menu is already on the side
            if (window.innerWidth > 1265) {
              if (
                instance.isScrolledIntoView(this.nav) ===
                  false
              ) {
                this.nav.classList.add('c-nav__sidebar');
              } else {
                this.nav.classList.remove('c-nav__sidebar');
              }
            }

            ticking = false;
          });

          ticking = true;
        }

      }, {passive: true});
  }

  enableUi() {
    // instance.scrollAnchor();
    instance.navScroll();
  }
}

const Instance = new Ui();
Object.freeze(Instance);

export default Ui;
