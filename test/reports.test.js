const chai = require('chai');
const assert = chai.assert;    // Using Assert style
const expect = chai.expect;    // Using Expect style
const should = chai.should();  // Using Should style

const sinon = require('sinon');
const EventEmitter = require('events').EventEmitter;


describe('Print', function() {
  it('Should add event listener to the print button', function() {
    var spy = sinon.spy()
    var emitter = new EventEmitter();


    // emitter.on('.js-reset-all', spy);
    // emitter.emit('foo');
    // spy.called.should.equal.true;
  });
});

