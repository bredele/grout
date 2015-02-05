
/**
 * Test dependencies.
 */

var assert = require('assert');
var dom = require('..');

describe('event listener', function() {
  var ev;

  beforeEach(function() {
    ev = document.createEvent('MouseEvents');
    ev.initEvent('click', true, true);
    //ev.synthetic = true;
  });
  

  it('should listen dom events', function(done) {
    var el = dom('button', {
      onclick: function() {
        done();
      }
    })();

    el.dispatchEvent(ev, true);
  });
});