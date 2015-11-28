

module.exports = function(tag, content) {
  var el = document.createElement(tag);
  return function(data) {
    var type = typeof content;
    var node = content;
    if(type === 'function') node = content();
    else if(type === 'string') node = document.createTextNode(content);
    else if(content instanceof Array) node = fragment(content);
    append(el, node);
    return el;
  };
};

function append(el, node) {
  if(node) el.appendChild(node);
}

function fragment(arr) {
  var el = document.createDocumentFragment();
  for(var i = 0, l = arr.length; i < l; i++) {
    el.appendChild(arr[i]());
  }
  return el;
}