let expect = require('chai').expect;
let assert = require('assert');

describe("Should return true", () => {
  it('should show true equals true', () => {
    assert.equal(true, true);
  });
});

// describe('test with mock localStorage', () => {

//   afterEach(() => {
//       localStorage.clear();
//   // remove callback
//       localStorage.itemInsertionCallback = null;
//   });

//   it('emulate quota exceeded error', () => {
//       localStorage.length.should.equal(0);
//   // register callback
//       localStorage.itemInsertionCallback = (len) => {
//           if (len >= 5) {
//               let err = new Error('Mock localStorage quota exceeded');
//               err.code = 22;
//               throw err;
//           }
//       };
//       let handled = false;
//       try {
//           for (let i = 0; i < 10; ++i) {
//               localStorage.setItem(i, i);
//           }
//       } catch (e) {
//           if (e.code == 22) {
//               // handle quota exceeded error
//               handled = true;
//           }
//       }
//       handled.should.be.true;
//       localStorage.length.should.equal(5);
//   });
// });
