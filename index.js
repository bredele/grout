

module.exports = function(tag, content) {
  var el = document.createElement(tag);
  return function(data) {
    var type = typeof content;
    var node = content;
    if(type === 'string') node = document.createTextNode(content);
    else if(type === 'function') node = content();
    if(node) el.appendChild(node);
    return el;
  };
};

