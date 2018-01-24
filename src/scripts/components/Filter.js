let instance = null;
/**
 *
 *
 * @class Filter
 */
class Filter {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  highlightButton(nameFilter, type) {

    const button = document.querySelector(
      '[data-' + type + '="' + nameFilter + '"]',
    );
    const buttons = document.querySelectorAll('[data-' + type + ']');

    // Remove all filter-active class on all buttons
    buttons.forEach(el => {
      el.classList.remove('filter-active');
    })

    // Add class to highlight button
    button.classList.add('filter-active');
  }

  addFilter(el, storageName) {
    let storage = [];
    const name = storageName;

    if (localStorage.getItem(name) === null) {
      storage = [{'filter': 'all'}];
    } else {
      let item = {'filter': el};
      storage.push(item);

      instance.highlightButton(item.filter, storageName);
    }

    localStorage.setItem(name, JSON.stringify(storage));
  }

  selectBy(dataName) {
    let items = document.querySelectorAll('.js-item');

    items.forEach((el, i) => {
      if ((' ' + items[i].className + ' ').indexOf(' ' + dataName + ' ') < 0) {
        items[i].setAttribute('data-item-visible', false);
        items[i].setAttribute('aria-hidden', true);
      } else {
        items[i].setAttribute('data-item-visible', true);
        items[i].setAttribute('aria-hidden', false);
      }
    });
  }

  readFilterStorage(name) {

    let storage2 = [{'filter': 'all'}];

    if (localStorage.getItem(name) !== null) {
      const storage = JSON.parse(localStorage.getItem(name));

      storage.forEach(el => {
        instance.selectBy(el.filter);
        instance.highlightButton(el.filter, name);
      })
    }
    else {
      localStorage.setItem(name, JSON.stringify(storage2));
      instance.selectBy('all');
      instance.highlightButton('all', 'tag');
    }
  }

  enableFilter(name, dataName, filterClass) {
    const filterNames = document.querySelectorAll(filterClass);

    filterNames.forEach(el => {
      el.addEventListener(
        'click',
        e => {
          e.preventDefault();

          instance.selectBy(e.target.getAttribute(dataName));
          instance.addFilter(e.target.getAttribute(dataName), name);
        },
        false,
      );
    });
  }
}

const Instance = new Filter();
Object.freeze(Instance);

export default Filter;
