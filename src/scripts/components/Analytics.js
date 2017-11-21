let instance = null;
/**
 *
 *
 * @class Analytics
 */
class Analytics {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  addRef() {
    const details = document.querySelectorAll('.js-details');

    details.forEach(detail => {
      const links = detail.querySelectorAll('a');
      links.forEach(link => {
        link.setAttribute('href', link.href + '?ref=frontendchecklist');
      });
    });
  }

  enableAnalytics() {
    instance.addRef();
  }
}

const Instance = new Analytics();
Object.freeze(Instance);
export default Analytics;
