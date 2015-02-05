
/**
 * Test dependencies.
 */

var assert = require('assert');
var dom = require('..');
var Store = require('datastore');

describe('datastore', function() {

  var store;
  beforeEach(function() {
    store = new Store({
      label: 'hello',
      color: 'red',
      size: 100
    });
  });
  

  it('should update inner text when datastore changes', function() {

    var el = dom('button', '${label}')(store);
    assert.equal(el.innerHTML, 'hello');
    store.set('label', 'world');
    assert.equal(el.innerHTML, 'world');
  });

  it('should update attribute when datastore changes', function() {
    var el = dom('button', {
      class: 'btn ${label}'
    })(store);
    assert.equal(el.className, 'btn hello');
    store.set('label', 'world');
    assert.equal(el.className, 'btn world');
  });

  it('should update style attribute when datastore changes', function() {
    var el = dom('button', {
      style: {
        background: '${color}',
        width: '${size}px'
      }
    })(store);

    store.set('color', 'green');
    assert.equal(el.getAttribute('style'), 'background:green;width:100px;');
  });
});