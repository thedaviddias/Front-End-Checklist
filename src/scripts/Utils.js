let instance = null;

class Utils {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  variableList(el) {
    const section = instance.getClosest(el, '.js-section');
    const sectionName = section.getAttribute('data-section');
    const sectionId = section.getAttribute('data-section-id');

    const item = instance.getClosest(el, '.js-item ');

    let itemId;
    let itemCheck;
    let itemDropdown;

    if (item !== null) {
      itemId = item.getAttribute('data-item-id');
      itemCheck = item.getAttribute('data-item-check');
      itemDropdown = item.getAttribute('data-item-dropdown');
    }

    return {
      sectionId,
      section,
      sectionName,
      item,
      itemId,
      itemCheck,
      itemDropdown,
    };
  }

  visibityEl(container, el, status) {
    const tags = container.querySelectorAll(el)[0];

    if (tags !== undefined) {
      if (status === 'hide') {
        tags.style.display = 'none';
      } else {
        tags.style.display = 'flex';
      }
    }
  }

  detailsContainer(section) {
    const sectionClass = section.classList[1];
    const sectionObj = document.querySelectorAll('.' + sectionClass);
    const detailsContainer = sectionObj[0].querySelectorAll('.js-details');

    return detailsContainer;
  }

  /* eslint-disable */
  getClosest(elem, selector) {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function parse(s) {
          let matches = (this.document || this.ownerDocument).querySelectorAll(
            s);
          let i = matches.length;
          while ((--i >= 0 && matches.item(i) !== this)) {}
          return i > -1;
        };
    }

    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }

    return null;
  }
  /* eslint-enable */
}

const Instance = new Utils();
Object.freeze(Instance);

export default Utils;
