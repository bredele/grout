/**
 * Module dependencies.
 */

tmpl = require('mouth');


module.exports = function(tag, content) {
  var el = document.createElement(tag);
  return function(data) {
    var node = render(content, data);
    if(node) el.appendChild(node);
    return el;
  };
};


function render(content, data) {
  var type = typeof content;
  var node = content;
  if(type === 'function')node = render(content());
  else if(type === 'string') {
    var cb = tmpl(content, data)[0];
    node = document.createTextNode(cb(data));
  } 
  else if(content instanceof Array) node = fragment(content);
  return node;
}


function fragment(arr) {
  var el = document.createDocumentFragment();
  for(var i = 0, l = arr.length; i < l; i++) {
    el.appendChild(render(arr[i]));
  }
  return el;
}
