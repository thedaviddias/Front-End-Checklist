let instance = null;
/**
 *
 *
 * @class ProgressBar
 */
class ProgressBar {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.main = document.getElementById('js-main');

    return instance;
  }

  /**
   * Count all items based on a section
   *
   * @param {any} el
   * @returns the number of items
   * @memberof ProgressBar
   */
  allItemsCounter(el) {
    const nbrItems = el.querySelectorAll('.js-item').length;

    return nbrItems;
  }

  /**
   * Update the main progress bar in the top of the page
   *
   * @depends updateProgressBar
   * @memberof ProgressBar
   */
  updateMainProgressBar() {
    const mainCount = this.main.querySelectorAll('[data-item-check="true"]').length;
    new ProgressBar().updateProgressBar(this.main, mainCount, 'main');
  }

  /**
   *
   *
   * @param {any} section
   * @param {any} checkedItems
   * @param {any} type
   * @memberof ProgressBar
   */
  updateProgressBar(section, checkedItems, type) {
    const currentSection = section;
    // Total items in the list
    // const checklistItem = section.querySelectorAll('.js-item');
    const totalItems = instance.allItemsCounter(section);

    let progressBar;

    switch (type) {
      // Main progress bar
      case 'main':
        progressBar = section.querySelector('.js-all-progress');
        break;

      default:
        progressBar = section.querySelector('.js-progress');
        break;
    }

    const getPercent = parseInt(checkedItems / totalItems * 100, 10);

    progressBar.setAttribute('value', getPercent);

    currentSection.querySelector('.c-progress__label',
    ).innerHTML = `${getPercent} %`;

    // section.getAttribute('data-section')
    document.querySelectorAll(
      '#js-nav-' + section.getAttribute('data-section'),
    )[0].setAttribute('data-notation', getPercent);
  }

  /**
   * Update all progress bar, the main and on each section
   *
   * @param {any} section
   * @param {number} items
   * @memberof ProgressBar
   */
  updateAllProgressBars(section, items) {
    new ProgressBar().updateProgressBar(section, items);
    // new ProgressBar().updateMainProgressBar();
  }
}

const Instance = new ProgressBar();
Object.freeze(Instance);

export default ProgressBar;
