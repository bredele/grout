

module.exports = function(tag, content) {
  var el = document.createElement(tag);
  return function(data) {
    return el;
  };
};

