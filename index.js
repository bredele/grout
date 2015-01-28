
/**
 * Expose 'x'
 */

module.exports = x;


/**
 * x constructor.
 * @api public
 */

function x(tag, attrs, nodes) {
  var dom = document.createElement(tag);
  return function() {
    if(attrs instanceof Array) {
      children(dom, attrs);
    } else if(typeof attrs === 'object') {
      for(var key in attrs) {
        dom.setAttribute(key, attrs[key]);
      }
      if(nodes) children(dom, nodes);
    } else {
      dom.innerHTML = attrs;
    }
    return dom;
  };
}

function children(dom, nodes) {
  for(var i = 0, l = nodes.length; i < l; i++) {
    var node = nodes[i];
    if(typeof node === 'string') {
      var text = document.createTextNode(node);
      dom.appendChild(text);
    } else {
      dom.appendChild(node());
    }
  }
}
