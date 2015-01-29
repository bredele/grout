
/**
 * Expose 'grout'
 */

module.exports = grout;


/**
 * x constructor.
 * @api public
 */

function grout(tag, attrs, nodes) {
  var dom = document.createElement(tag);
  return function(data) {
    if(attrs instanceof Array) {
      children(dom, attrs);
    } else if(typeof attrs === 'object') {
      for(var key in attrs) {
        var attr = attrs[key];
        if(typeof attr === 'function') {
          if(key.substring(0,2) === 'on') {
            dom[key] = attr;
            break;
          } else {
            attr = attr.call(data);
          }
        }
        dom.setAttribute(key, attr);
      }
      if(nodes) children(dom, nodes);
    } else {
      text(dom, attrs);
    }
    return dom;
  };
}



/**
 * Create and append text node.
 * 
 * @param  {Element} dom 
 * @param  {String} str
 * @api private
 */

function text(dom, str) {
  dom.appendChild(document.createTextNode(str));
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
    dom.appendChild(document.createTextNode(nodes));
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
