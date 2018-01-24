import Utils from '../Utils';
import Dropdown from './Dropdown';
import Checkboxes from './Checkboxes';
import Storage from './Storage';

let instance = null;
/**
 *
 *
 * @class Tools
 */
class Tools {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.checkAllButton = document.querySelectorAll('.js-check-all');
    this.uncheckAllButton = document.querySelectorAll('.js-uncheck-all');

    this.collapseAllButton = document.querySelectorAll('.js-collapse-all');
    this.expandAllButton = document.querySelectorAll('.js-expand-all');

    this.hideSectionButton = document.querySelectorAll('.js-hide-section');

    return instance;
  }

  /**
   * Chech or uncheck all items in a specific section
   *
   * @param {any} btn
   * @param {string} state
   * @memberof Tools
   */
  checkUncheckAll(btn, state) {
    const list = new Utils().variableList(btn);
    const checklistItem = list.section.querySelectorAll('.js-item');

    checklistItem.forEach(el => {
      if (state === 'true') {
        // if element is not already checked
        if (el.getAttribute('data-item-check') !== 'true') {
          // Change each item state
          el.setAttribute('data-item-check', state);

          const list2 = new Utils().variableList(el);

          new Storage().checkingItem(list2);
        }
      } else {
        // Change each item state
        el.setAttribute('data-item-check', state);

        const list2 = new Utils().variableList(el);

        new Checkboxes().uncheckItem(list2);
      }
    });
  }

  uncheckOption(list, keyName) {
    let currentObj;

    if (list.itemId === undefined) {
      const currentStorage = localStorage.getItem(keyName);
      currentObj = JSON.parse(currentStorage);
    }

    currentObj.forEach((el, i) => {
      if (el.id === list.sectionId) {
        // Remove element from current localStorage object
        currentObj.splice(i, 1);

        localStorage.setItem(keyName, JSON.stringify(currentObj));
      }
    });
  }

  /**
   * Hide the body
   *
   * @param {any} btn
   * @memberof Tools
   */
  hideShow(btn) {
    const list = new Utils().variableList(btn);
    const body = list.section.querySelectorAll('.js-checklist-body')[0];

    if (body !== undefined) {
      const status = body.getAttribute('data-body-visibility');

      if (status === 'visible') {

        btn.classList.add('is-active');

        btn.querySelector('.icon-eye').classList.add('icon-eye-hide');

        body.setAttribute('data-body-visibility', 'hide');
        body.setAttribute('aria-hidden', 'true');

        new Storage().checkingOption(list, 'hide-sections');


      } else {

        btn.classList.remove('is-active');

        btn.querySelector('.icon-eye').classList.remove('icon-eye-hide');

        body.setAttribute('data-body-visibility', 'visible');
        body.setAttribute('aria-hidden', 'false');

        instance.uncheckOption(list, 'hide-sections');
      }
    }
  }

  enableTools() {
    // Check all checkboxes
    this.checkAllButton.forEach(btn => {
      btn.addEventListener(
        'click',
        () => {
          instance.checkUncheckAll(btn, 'true');
        }
      );
    });

    // Uncheck all checkboxes
    this.uncheckAllButton.forEach(btn => {
      btn.addEventListener(
        'click',
        () => {
          instance.checkUncheckAll(btn, 'false');
        }
      );
    });

    // Collapse all dropdowns
    this.collapseAllButton.forEach(btn => {
      btn.addEventListener(
        'click',
        () => {
          new Dropdown().allDropdown({btn});
        }
      );
    });

    // Expand all dropdowns
    this.expandAllButton.forEach(btn => {
      btn.addEventListener(
        'click',
        () => {
          new Dropdown().allDropdown({btn});
        }
      );
    });

    // Hide section
    this.hideSectionButton.forEach(btn => {
      btn.addEventListener(
        'click',
        () => {
          instance.hideShow(btn);
        }
      );
    });
  }
}

const Instance = new Tools();
Object.freeze(Instance);

export default Tools;
// enableReset() {
//   const uncheckAll = document.querySelectorAll(".js-uncheck-section");
//   const checkAll = document.querySelectorAll(".js-check-section");
//   uncheckAll.forEach((el, i, array) => {
//     el.addEventListener('click', e => {
//       e.preventDefault();
//       const section = new Utils().getClosest(el, '.js-section');
//       const sectionName = section.getAttribute('data-section');
//       const checklistItem = new Utils().getClosest(el, '.js-item ');
//       localStorage.removeItem(sectionName);
//       instance.resetItems(section, sectionName);
//     });
//   });
//   checkAll.forEach((el, i, array) => {
//     el.addEventListener('click', e => {
//       e.preventDefault();
//       const section = new Utils().getClosest(el, '.js-section');
//       const sectionName = section.getAttribute('data-section');
//       const checklistItem = new Utils().getClosest(el, '.js-item ');
//       localStorage.addItem(sectionName);
//     });
//   });
// }
