

module.exports = function(tag, content) {
  var el = document.createElement(tag);
  return function(data) {
    var node = render(content);
    if(node) el.appendChild(node);
    return el;
  };
};

function render(content) {
  var type = typeof content;
  var node = content;
  if(type === 'function') node = render(content());
  else if(type === 'string') node = document.createTextNode(content);
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
