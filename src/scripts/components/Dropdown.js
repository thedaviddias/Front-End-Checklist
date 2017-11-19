import Utils from '../Utils';
import postscribe from 'postscribe';

let instance = null;
/**
 *
 *
 * @class Dropdown
 */
class Dropdown {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  // never called directly
  dropdownIcon(btn) {
    const item = new Utils().getClosest(btn, '.js-item');
    const ariaStatus = item.getAttribute('data-item-dropdown');

    if (ariaStatus === 'open') {
      item.querySelector('.icon-arrow').classList.add('icon-rotate');
    } else {
      item.querySelector('.icon-arrow').classList.remove('icon-rotate');
    }
  }

  allDropdown(options) {

    const el = options;

    const section = new Utils().getClosest(el.btn, '.js-section');
    const eachItem = section.querySelectorAll('.js-item[data-item-check="false"]');

    eachItem.forEach(item => {
      if (el.btn.classList.value.includes('js-collapse-all') === true) {
        item.setAttribute('data-item-dropdown', 'close');
        instance.removeCode(item);
      } else {
        item.setAttribute('data-item-dropdown', 'open');
        instance.loadCode(item);
      }
    });
  }

  removeCode(el) {
    const codeContainer = el.querySelector('.js-code');
    const loader = el.querySelector('.js-loader');

    if (codeContainer !== null) {
      while (codeContainer.hasChildNodes()) {
        codeContainer.removeChild(codeContainer.lastChild);
      }
      loader.style.display = 'inherit';
    }
  }

  loadCode(el) {
    const codeContainer = el.querySelector('.js-code');

    if (codeContainer !== null) {
      const scriptUrl = codeContainer.getAttribute('data-code-url');

      let script = document.createElement('script');
      script.src = scriptUrl;

        postscribe(codeContainer, script.outerHTML, {
          // eslint-disable-next-line func-names
          done: () => {
            const loader = el.querySelector('.js-loader');
            loader.style.display = 'none';
          },
        });
    }

  }

  moveDropdown(options) {
    const el = options;

    if (el.button !== null) {
      const eachItem = new Utils().getClosest(el.button, '.js-item');
      const ariaStatus = eachItem.getAttribute('data-item-dropdown');

      if (ariaStatus === 'open') {
        eachItem.setAttribute('data-item-dropdown', 'close');
        instance.removeCode(eachItem);
        instance.dropdownIcon(el.button);
        gtag('event', 'close-dropdown', {
          'event_category': 'Click',
          'event_label': 'Close dropdown'
        });
      } else if (ariaStatus === 'close') {
        eachItem.setAttribute('data-item-dropdown', 'open');
        instance.dropdownIcon(el.button);
        instance.loadCode(eachItem);
        gtag('event', 'open-dropdown', {
          'event_category': 'Click',
          'event_label': 'Open dropdown'
        });
      }
      else {}
    }
  }

  collapseAllDropdown(options) {
    const el = options;

    const eachSection = new Utils().getClosest(el.button, '.js-section') ||
      el.section;
    const itemsBySection = eachSection.querySelectorAll('.js-item');

    itemsBySection.forEach(item => {
      item.setAttribute('data-item-dropdown', 'close');
    });

    gtag('event', 'collapse-dropdown', {
      'event_category': 'Click',
      'event_label': 'Collapse all dropdown'
    });
    // update local storage state dropdown hide
  }

  /**
   * Enable all dropdown buttons to be clickable
   *
   * @param {array} dropdownButtons
   * @memberof Dropdown
   */
  enableDropdown(dropdownButtons) {
    dropdownButtons.forEach(btn => {
      btn.addEventListener(
        'click',
        e => {
          e.preventDefault();

          // If dropdown button clicked then close / open
          instance.moveDropdown({button: btn});

          e.stopImmediatePropagation();
        },
        false,
      );
    });
  }
}

const Instance = new Dropdown();
Object.freeze(Instance);

export default Dropdown;
