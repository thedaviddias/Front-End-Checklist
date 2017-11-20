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

  isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;

    // Only completely visible elements return true:
    var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    // Partially visible elements return true:
    // isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  codeSponsor() {
    // Your personal token
    const token = "DLYkTVJg-n5euzNvb3kU5A";
    // DOM variables elements
    const sponsorLink = document.querySelector('.cs__footer a');
    const blurb = document.querySelector('.cs__blurb');
    const blurbStrong = document.querySelector('.cs__blurb__name');
    const blurbSpan = document.querySelector('.cs__blurb__tagline');
    const pixel = document.querySelector('.cs__pixel');
    // Text variables
    const blurbStrongText = 'CodeSponsor.io';
    const blurbSpanText = " - get paid by adding one line of code to your README";
    // New request variables
    const initOptions = { method: 'GET'};
    const codeSponsorRequest = new Request('https://app.codesponsor.io/p/' + token + '/message.json', initOptions);

    sponsorLink.setAttribute('href', 'https://codesponsor.io/?utm_source=widget&utm_medium=banner&utm_campaign=' + token);

    fetch(codeSponsorRequest)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(results => {
        blurb.setAttribute('href', results.link_href);
        blurbStrong.innerHTML = results.title;
        blurbSpan.innerHTML = results.body;
        pixel.setAttribute('src', results.pixel_href);
      })
      .catch(error => {
        blurbStrong.innerHTML = blurbStrongText;
        blurbSpan.innerHTML = blurbSpanText;

        // console.log('There has been a problem with your fetch operation: ' + error.message);
      });
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
          instance.smoothScroll(dataTarget, dataSpeed || 300);

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
    instance.scrollAnchor();
    instance.navScroll();
    instance.codeSponsor();
  }

}

const Instance = new Ui();
Object.freeze(Instance);

export default Ui;
