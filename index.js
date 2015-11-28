

module.exports = function(tag, content) {
  var el = document.createElement(tag);
  return function(data) {
    el.innerText = content;
    return el;
  };
};

