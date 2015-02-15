
/**
 * Test dependencies.
 */

var assert = require('assert');
var dom = require('..');


describe('create', function() {

  it('should return a function', function() {
    var fn = dom('button');
    assert.equal(typeof fn, 'function');
  });

  it('should create dom element', function() {
    var el = dom('button')();
    assert.equal(tag(el), 'button');
    assert.equal(el.innerHTML, '');
  });

});

describe("append", function() {

  it('should append text', function() {
    var el = dom('button', 'hello')();
    assert.equal(el.innerHTML, 'hello');
  });

  it('should append one child node', function() {
    var ul = dom('ul', [
      dom('li', 'hello')
    ])();

    var li = ul.firstChild;
    assert.equal(tag(li), 'li');
    assert.equal(li.innerHTML, 'hello');

  });

  it('should append multiple child nodes', function() {
    var ul = dom('ul', [
      dom('li', 'hello'),
      dom('li', 'world')
    ])();
    assert.equal(ul.children.length, 2);
  });

  it('should append text node', function() {
    var el = dom('ul', [
      'hello'
    ])();
    assert.equal(el.innerHTML, 'hello');
  });

  it('should mix text and child nodes', function() {
    var el = dom('div', [
      'hello',
      dom('ul', [
        dom('li', 'hello'),
        dom('li', 'world')
      ])
    ])();
    assert.equal(el.innerHTML, 'hello<ul><li>hello</li><li>world</li></ul>');
  });

});

describe('query', function() {

  it('should create an element from query', function() {
    var el = dom('button.btn#uniq')();
    assert.equal(tag(el), 'button');
    assert.equal(el.className, 'btn ');
    assert.equal(el.id, 'uniq');
  });

  it('should create a div by default from query', function() {
    var el = dom('.btn#uniq')();
    assert.equal(tag(el), 'div');
    assert.equal(el.className, 'btn ');
    assert.equal(el.id, 'uniq');
  });


});



/**
 * Return node name (lower case).
 * 
 * @param  {Element} el
 * @return {String}
 */

function tag(el) {
  return el.nodeName.toLowerCase();
}