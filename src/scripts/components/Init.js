import Filter from './Filter';
import Dropdown from './Dropdown';
import Storage from './Storage';
import Checkboxes from './Checkboxes';
import Notation from './Notation';
import Tools from './Tools';
import Report from './Report';
import Ui from './Ui';
import Analytics from './Analytics';

let instance = null;
/**
 *
 *
 * @class Init
 */
class Init {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.sections = document.querySelectorAll('.js-section');
    this.main = document.getElementById('js-main');

    this.checkboxesInit();
    this.dropdownInit(this.sections);
    this.filterInit();
    this.itemsInit(this.sections);
    this.notationInit();
    this.toolsInit();
    this.reportInit();
    this.uiInit();
    this.AnalyticsInit();

    return instance;
  }

  /**
   * Initialize all elements in the header which are used in the report
   *
   * @memberof Init
   */
  reportInit() {
    new Report().enableReport();
  }

  /**
   * Initialize Storage and load the content
   *
   * @memberof Init
   */
  itemsInit(sections) {
    // Load all items by each section based on localStorage
    sections.forEach((section, i) => {
      new Storage().readItems(section, i, sections);
    });
    // Hide sections based on the localStorage
    new Storage().readHideSections();
  }

  /**
   * Initialize the notation
   *
   * @memberof Init
   */
  notationInit() {
    // Initilize the progress bar for all sections
    new Notation().updateNotation();

    new Notation().readPriority();
  }

  /**
   * Initialize buttons
   *
   * @memberof Init
   */
  toolsInit() {
    // Enable all buttons in the option section bar
    new Tools().enableTools();
  }

  /**
   * Initialize Dropdown and collapse on load
   *
   * @memberof Init
   */
  dropdownInit(sections) {
    // Enable each dropdown buttons
    new Dropdown().enableDropdown(document.querySelectorAll('.js-dropdown'));

    // Collapse on loading each item (except which present into localStorage)
    sections.forEach(section => {
      new Dropdown().collapseAllDropdown({section});
    });
  }

  /**
   * Initialize Checkboxes class
   *
   * @memberof Init
   */
  checkboxesInit() {
    // Enable each checkboxe for all items
    new Checkboxes().enableCheckbox();
  }

  /**
   * Initialize Filters
   *
   * @memberof Init
   */
  filterInit() {
    new Filter().readFilterStorage('tag');

    new Filter().enableFilter('tag', 'data-tag', '.js-filter-tag');
  }

  /**
   * Initialize UI components
   *
   * @memberof Init
   */
  uiInit() {
    new Ui().enableUi();
  }

  /**
   * Add analytics utils
   *
   * @memberof Init
   */
  AnalyticsInit() {
    new Analytics().enableAnalytics();
  }
}

const Instance = new Init();
Object.freeze(Instance);

export default Init;
