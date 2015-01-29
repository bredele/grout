/**
 * Module dependencies.
 */

var mouth = require('mouth');


/**
 * Create tree of dom nodes.
 *
 * @param {String} tag
 * @param {String | Object} attrs (optional)
 * @param {String | Object} nodes (optional)
 * @return {Function} factory
 * @api public
 */

module.exports = function(tag, attrs, nodes) {
  var dom = document.createElement(tag);
  var bool = !(attrs instanceof Array) && typeof attrs === 'object';
  return function(data) {
    if(bool) {
      attributes(dom, attrs, data);
      attrs = nodes;
    }
    if(attrs) children(dom, attrs, data);
    return dom;
  };
};


/**
 * Set attributes.
 * 
 * @param  {Element} dom
 * @param  {Object} obj
 * @param  {Object} data
 * @api private
 */

function attributes(dom, obj, data) {
  for(var key in obj) {
    var attr = obj[key];
    if(typeof attr === 'function') {
      if(key.substring(0,2) === 'on') {
        dom[key] = attr;
        break;
      }
      attr = attr.call(data);
    } else {
      attr = mouth(attr).text(data);
    }
    dom.setAttribute(key, attr);
  }
}


/**
 * Create and append text node.
 * 
 * @param  {Element} dom 
 * @param  {String} str
 * @api private
 */

function text(dom, str, data) {
  var result = mouth(str).text(data);
  dom.appendChild(document.createTextNode(result));
}


/**
 * Set node children elements.
 * 
 * @param  {Element} dom
 * @param  {Array} nodes
 * @api private
 */

function children(dom, nodes, data) {
  if(typeof nodes === 'string') text(dom, nodes, data);
  else for(var i = 0, l = nodes.length; i < l; i++) {
    var node = nodes[i];
    if(typeof node === 'string') text(dom, node, data);
    else dom.appendChild(node());
  }
}

