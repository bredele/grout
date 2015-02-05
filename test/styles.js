
/**
 * Test dependencies.
 */

var assert = require('assert');
var dom = require('..');



describe('styles', function() {

  it('should create styles from object', function() {
    var el = dom('button', {
      style: {
        background: 'red',
        width: '100px'
      }
    })();

    assert.equal(el.getAttribute('style'), 'background:red;width:100px;');
  });

});