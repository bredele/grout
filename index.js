
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
        var attr = attrs[key];
        if(typeof attr === 'function') attr = attr();
        dom.setAttribute(key, attr);
      }
      if(nodes) children(dom, nodes);
    } else {
      dom.innerHTML = attrs;
    }
    return dom;
  };
}

/**
 * Set node children elements.
 * 
 * @param  {Element} dom
 * @param  {Array} nodes
 * @api private
 */

function children(dom, nodes) {
  if(typeof nodes === 'string') {
    dom.innerHTML = nodes;
  } else {
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
}
