import Utils from '../Utils';
import ProgressBar from './ProgressBar';
import Storage from './Storage';
import Notation from './Notation';
import Dropdown from './Dropdown';

let instance = null;
/**
 *
 *
 * @class Checkboxes
 */
class Checkboxes {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  checkItem(idNumber, section, sectionName, item, storage, type) {

    const storageData = storage;

    storageData.forEach(value => {
      const el = value;

      if (idNumber === el.id) {
        switch (type) {
          case 'state':
            el.state = 'checked';
            break;

          case 'dropdown':
            el.dropdown = 'open';
            break;

          case 'visible':
            el.visible = 'hide';
            break;

          default:
            break;
        }
      }
    });

    // Inject new array with new value
    storageData.forEach((el, i, arry) => {
      localStorage.setItem(sectionName, JSON.stringify(arry));
    });

    if (type !== 'visible') {
      // Count how many key in the localStorage array
      const nbrItemsChecked = JSON.parse(
        localStorage.getItem(sectionName),
      ).length;

      // Update progress bar
      new ProgressBar().updateProgressBar(section, nbrItemsChecked);
      new Notation().updateNotation();

      new Utils().visibityEl(item, '.c-tags', 'hide');
      new Utils().visibityEl(item, '.js-dropdown', 'hide');

      item.setAttribute('data-item-check', 'true');

      new Notation().updatePriority();

      gtag('event', 'check', {
        'event_category': 'Click',
        'event_label': 'Item checked'
      });

      if (item !== null) {
        const button = item.querySelector('.js-dropdown');
        if (item.getAttribute('data-item-dropdown') === 'open') {
          new Dropdown().moveDropdown({button});
        }
      }


    }
    // TODO: à refaire // const itemExpanded = new Utils().variableList(list.item); // if (itemExpanded.checklistItem.querySelectorAll('.c-checklist__details')[0].getAttribute('aria-expanded') === true) { //   new Dropdown().moveDropdown({itemExpanded, force:true}); // }


  }
  uncheckItem(list) {
    let currentObj;
    if (list.itemId !== undefined) {
      const currentStorage = localStorage.getItem(list.sectionName);
      currentObj = JSON.parse(currentStorage);
    }
    currentObj.forEach((el, i) => {
      if (el.id === list.itemId) {
        // Remove element from current localStorage object
        currentObj.splice(i, 1);
        // Count how many key in the localStorage array
        localStorage.setItem(list.sectionName, JSON.stringify(currentObj));

        // Update the progress bar
        const nbrItemsChecked = JSON.parse(
          localStorage.getItem(list.sectionName),
        ).length;

        new ProgressBar().updateProgressBar(list.section, nbrItemsChecked);
        new Notation().updateNotation();
        new Utils().visibityEl(list.item, '.c-tags');

        // Change data-check attribute to uncheck item
        new Utils().visibityEl(list.item, '.js-dropdown');

        list.item.setAttribute('data-item-check', 'false');

        new Notation().updatePriority();

        gtag('event', 'uncheck', {
          'event_category': 'Click',
          'event_label': 'Item unchecked'
        });
      }
    });
  }
  checkboxDetection(el) {
    // List of all variables needed for checking item
    const list = new Utils().variableList(el);
    if (el.checked) {
      // Check item if unchecked
      new Storage().checkingItem(list);
    } else {
      // Uncheck item if checked
      instance.uncheckItem(list);
    }
  }
  enableCheckbox() {
    const allCheckboxes = document.querySelectorAll('input[type=checkbox]');
    allCheckboxes.forEach(el => {
      // Add a click event listener on all checkboxes
      el.addEventListener('click', () => instance.checkboxDetection(el));
    });
  }
}
const Instance = new Checkboxes();
Object.freeze(Instance);
export default Checkboxes;
