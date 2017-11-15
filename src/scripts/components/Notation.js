let instance = null;
/**
 *
 *
 * @class Notation
 */
class Notation {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.main = document.getElementById('js-main');
    this.notationDetails = document.querySelector('.c-notation__details');
    this.items = document.querySelectorAll('.js-item');
    this.priority = [];

    return instance;
  }

  updatePriority() {
    this.priority.forEach((el, i) => {
      const checkedCounter = document.querySelectorAll(`[data-item-priority=${el}][data-item-check='true']`).length
      const number = document.querySelectorAll(`.js-detail-${el}`);
      number[0].querySelectorAll('.js-notation-checked')[0].innerHTML = checkedCounter
    });
  }

  /**
   * Read the localStorage about the number of items by priority
   *
   * @param {any} priorityId
   * @memberof Notation
   */
  readPriority(priorityId) {
    this.items.forEach((el, i) => {
      const currentPriority = el.getAttribute('data-item-priority');
      if (this.priority.indexOf(currentPriority) === -1) {
        this.priority.push(currentPriority);
      }
    })
    instance.updatePriority();
  }

  /**
   * Update the letter for the global notation
   *
   * @memberof Notation
   */
  updateNotation() {
    const items = this.main.querySelectorAll('.js-item').length;
    const mainCount = this.main.querySelectorAll('[data-item-check="true"]').length;

    const getPercent = parseInt(mainCount / items * 100, 10);

    const notation = document.getElementById('js-notation');
    const notationLetter = notation.getElementsByClassName('c-notation__letter')[0];

    notation.setAttribute('data-notation', getPercent);

    switch (true) {
      case getPercent <= 20:
        notationLetter.innerHTML = 'F';
        break;

      case getPercent <= 40:
        notationLetter.innerHTML = 'E';
        break;

      case getPercent <= 60:
        notationLetter.innerHTML = 'D';
        break;

      case getPercent <= 80:
        notationLetter.innerHTML = 'C';
        break;

      case getPercent < 100:
        notationLetter.innerHTML = 'B';
        break;
      case getPercent === 100:
        notationLetter.innerHTML = 'A';
        break;
      default:
    }
  }

}

const Instance = new Notation();
Object.freeze(Instance);

export default Notation;
