import Utils from '../Utils';
import ProgressBar from './ProgressBar';
import Checkboxes from './Checkboxes';

let instance = null;
/**
 *
 *
 * @class Storage
 */
class Storage {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.body = document.querySelectorAll('[data-section-id]');

    return instance;
  }

  checkingOption(list, keyName) {
    let storage = [];

    if (localStorage.getItem(keyName) === null) {
      storage = [];
    } else {
      // Parse the serialized data back into an aray of objects
      storage = JSON.parse(localStorage.getItem(keyName));
    }

    if (storage === []) {
      storage.forEach(el => {
        if (el.id === list.sectionId && list.itemId === null) {
          new Checkboxes().checkItem(
            list.sectionId,
            list.section,
            keyName,
            list.item,
            storage,
            'visible',
          );
        } else {
          console.log('error');
        }
      });
    } else {
      if (list.itemId === undefined) {
        new Storage().addItemStorage(list.sectionId, storage, keyName);

        new Checkboxes().checkItem(
          list.sectionId,
          list.section,
          keyName,
          list.item,
          storage,
          'visible',
        );
      } else {
        console.log('error');
      }
    }
  }

  checkingItem(list) {
    let storage = [];

    if (list.item !== null) {
      if (localStorage.getItem(list.sectionName) === null) {
        storage = [];
      } else {
        // Parse the serialized data back into an aray of objects
        storage = JSON.parse(localStorage.getItem(list.sectionName));
      }
    } else {
      console.log('error');
    }

    if (storage === []) {
      storage.forEach(el => {
        if (el.id === list.itemId) {
          new Checkboxes().checkItem(
            list.itemId,
            list.section,
            list.sectionName,
            list.item,
            storage,
            'state',
          );
        } else {
          console.log('error');
        }
      });
    } else {
      if (list.itemId !== undefined) {
        new Storage().addItemStorage(list.itemId, storage, list.sectionName);

        new Checkboxes().checkItem(
          list.itemId,
          list.section,
          list.sectionName,
          list.item,
          storage,
          'state',
        );
      } else {
        console.log('error');
      }
    }
  }

  loadItems(checklistItem, currentObj) {
    let listItem = checklistItem;
    let ids = [];

    currentObj.map(el => {
      return ids.push(el.id);
    });

    listItem.forEach(el => {
      if (ids.indexOf(el.getAttribute('data-item-id')) > -1) {
        el.setAttribute('data-item-check', 'true');

        const checkObj = el.querySelectorAll('input[type=checkbox]');

        document.getElementById(checkObj[0].id).checked = true;

        new Utils().visibityEl(el, '.c-tags', 'hide');
        new Utils().visibityEl(el, '.js-dropdown', 'hide');
      }
    });
  }

  readItems(el, i, sections) {
    const sectionName = el.getAttribute('data-section');

    if (
      localStorage.getItem(sectionName) !== null ||
      localStorage.getItem(sectionName) === undefined
    ) {
      const currentStorage = localStorage.getItem(sectionName);
      const currentObj = JSON.parse(currentStorage);
      const checkedItems = currentObj.length;
      const itemsBySection = el.querySelectorAll('.js-item');

      instance.loadItems(itemsBySection, currentObj);

      // Update progress bars
      new ProgressBar().updateProgressBar(sections[i], checkedItems);
    }
  }

  readHideSections() {
    let storage;

    if (localStorage.getItem('hide-sections') !== null) {
      // Parse the serialized data back into an aray of objects
      storage = JSON.parse(localStorage.getItem('hide-sections'));

      this.body.forEach(element => {
        storage.forEach(el => {
          if (element.getAttribute('data-section-id') === el.id) {
            element.querySelectorAll(
              '.js-checklist-body',
            )[0].setAttribute('data-body-visibility', 'hide');
            element.querySelectorAll(
              '.js-checklist-body',
            )[0].setAttribute('aria-hidden', 'true');
            element.querySelectorAll(
              '.js-hide-section',
            )[0].querySelector('.icon-eye').classList.add('icon-eye-hide');

            element.querySelectorAll(
              '.js-hide-section',
            )[0].classList.add('is-active');
          }
        });
      });
    }
  }

  /**
   * Add new item into the localStorage
   *
   * @param {number} itemId
   * @param {any} storage
   * @param {string} keyName
   * @memberof Storage
   */
  addItemStorage(itemId, storage, keyName) {
    const newItem = {id: itemId};

    storage.push(newItem);

    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem(keyName, JSON.stringify(storage));
  }
}

const Instance = new Storage();
Object.freeze(Instance);

export default Storage;
