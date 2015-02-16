
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

  it('should wrap dom element', function() {
    var btn = document.createElement('btn');
    var el = dom(btn)();
    assert.equal(btn, el);
  });

});

describe("append", function() {

  it('should append text', function() {
    var el = dom('button', 'hello')();
    assert.equal(el.innerHTML, 'hello');
  });

  // it('should append dom element', function() {
  //   var link = document.createElement('a');
  //   var el = dom('button', link)();
  //   assert.equal(el.firstChild, link);
  // });

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

  it('should append multiple child and dom nodes', function() {
    var li = document.createElement('li');
    var ul = dom('ul', [
      dom(li),
      dom('li', 'world')
    ])();
    assert.equal(ul.firstChild, li);
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


// dirty benchmark
(function() {
  var t0 = performance.now();
  dom('ul', [
    dom('li'),
    dom('li', {
      id: 'item'
    }),
    //dom('li', document.createElement('button')),
    dom('li', [
      'hello',
      dom('span', '${name}')//,
      //document.createElement('address')
    ])
  ])({
    name: 'olivier'
  });
  console.log(performance.now() - t0);
})();
(function() {
  var t0 = performance.now();
  dom('ul', [
    dom('li'),
    dom('li', {
      id: 'item'
    }),
    //dom('li', document.createElement('button')),
    dom('li', [
      'hello',
      dom('span', '${name}')//,
      //document.createElement('address')
    ])
  ])({
    name: 'olivier'
  });
  console.log(performance.now() - t0);
})();

/**
 * Return node name (lower case).
 * 
 * @param  {Element} el
 * @return {String}
 */

function tag(el) {
  return el.nodeName.toLowerCase();
}