let instance = null;
/**
 *
 *
 * @class Report
 */
class Report {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.form = document.querySelector('.s-form');
    this.inputs = this.form.querySelectorAll('input');

  }

  readInputs() {
    this.inputs.forEach(el => {
      if (localStorage.getItem(el.name) !== null) {
        const storage = JSON.parse(localStorage.getItem(el.name));
        el.value = storage[0]
      }
      else {
        localStorage.getItem(el.name);
      }
    });
  }

  inputSave() {


    this.inputs.forEach(el => {

      // Save input value when the user reload the page
      window.addEventListener("beforeunload", e => {

        // let storage = [];
        // const valueInput = el.target.value;
        // const inputName = el.target.name;
        // // Push the input value to the storage array
        // storage.push(valueInput);
        // // Inject the new value typed in the localStorage
        // localStorage.setItem(inputName, JSON.stringify(storage));
      }, false);

      // Save input value when change focus
      el.addEventListener('blur', e => {
        let storage = [];
        const valueInput = e.target.value;
        const inputName = e.target.name;
        // Push the input value to the storage array
        storage.push(valueInput);
        // Inject the new value typed in the localStorage
        localStorage.setItem(inputName, JSON.stringify(storage));
      });

    });
  }

  resetAll() {
    document.querySelector('.js-reset-all').addEventListener('click', () => {
      const developerName = localStorage.getItem('developer-name');
      const projectName = localStorage.getItem('project-name');
      const pageTitle = localStorage.getItem('page-title');
      localStorage.clear();
      localStorage.setItem('developer-name', developerName);
      localStorage.setItem('project-name', projectName);
      localStorage.setItem('page-title', pageTitle);
      window.location.reload(false);
    });
  }

  print() {
    document.querySelector('.js-print').addEventListener('click', () => {
      window.print();
    });
  }

  enableReport() {
    instance.print();
    instance.resetAll();
    instance.inputSave();
    instance.readInputs(this.inputs);

  }
}
const Instance = new Report();
Object.freeze(Instance);

export default Report;
