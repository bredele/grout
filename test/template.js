
/**
 * Test dependencies.
 */

var assert = require('assert');
var dom = require('..');

describe('template string', function() {

  it('should substitute inner text with data', function() {
    var el = dom('button', '${label}')({
      label: 'hello'
    });
    assert.equal(el.innerHTML, 'hello');
  });

  it('should substitute attributes with data', function() {
    var el = dom('button', {
      class: 'btn ${label}'
    }, '${label}')({
      label: 'hello'
    });
    assert.equal(el.className, 'btn hello');
  });

  it('should substitute styles with data', function() {
      var el = dom('button', {
        style: {
          background: '${color}',
          width: '${size}px'
        }
      })({
        color: 'red',
        size: 100
      });
      assert.equal(el.getAttribute('style'), 'background:red;width:100px;');
  });

  it('should update inner text when data changes', function() {
    var fn = dom('button', '${label}');
    var el = fn({
      label: 'hello'
    });
    fn({
      label: 'olivier'
    });

    assert.equal(el.innerHTML, 'olivier');
  });

});