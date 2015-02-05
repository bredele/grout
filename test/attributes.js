
/**
 * Test dependencies.
 */

var assert = require('assert');
var dom = require('..');


describe('attributes', function() {

  it('should set attributes', function() {
    var el = dom('button', {
      class: 'btn'
    })();
    assert.equal(el.className, 'btn');
  });

  it('should still set dom nodes', function() {
    var el = dom('button', {
      class: 'btn'
    }, [
      dom('img', {
        src: 'hello'
      })
    ])();

    var img = el.firstChild;
    assert.equal(img.nodeName, 'IMG');
    assert.equal(img.getAttribute('src'), 'hello');
  });

  it('should still set text node', function() {
    var el = dom('button', {
      class: 'btn'
    }, 'hello')();
    assert.equal(el.innerHTML, 'hello');
  });

});

describe('attributes function', function() {

  it('should define functions as attributes', function() {
    var el = dom('button', {
      class: function() {
        return 'hello-world';
      }
    })();
    assert.equal(el.className, 'hello-world');
  });

  it('should call function with data', function() {
    var el = dom('h1', {
      class: function() {
        return this.type;
      }
    })({
      type: 'title'
    });

    assert.equal(el.className, 'title');
  });

});