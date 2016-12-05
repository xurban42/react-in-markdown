import React from 'react';

var quotifyJSON = function quotifyJSON(text) {
  return text.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:([^\/])/g, '"$2":$4');
};

var decodeHTMLEntities = function decodeHTMLEntities(text) {
  var entities = [['amp', '&'], ['apos', '\''], ['#x27', '\''], ['#x2F', '/'], ['#39', '\''], ['#47', '/'], ['lt', '<'], ['gt', '>'], ['nbsp', ' '], ['quot', '"']];

  for (var i = 0, max = entities.length; i < max; ++i) {
    text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
  }

  return text;
};

var getPropsObject = function getPropsObject(propsString) {
  var decodedProps = quotifyJSON(decodeHTMLEntities(propsString));
  return JSON.parse(decodedProps);
};

var link = function link(_ref) {
  var children = _ref.children,
      href = _ref.href,
      title = _ref.title;
  return React.createElement(
    'a',
    { href: href, title: title },
    ' ',
    children
  );
};

var renderCustomComponents = function renderCustomComponents(props, customComponents, customLinkComponent) {
  var children = props.children,
      href = props.href;

  var foundComponent = customComponents[children[0]];
  if (foundComponent) {
    var propsObject = getPropsObject(href);
    return React.createElement(foundComponent, propsObject);
  }
  return customLinkComponent ? React.createElement(customLinkComponent, props) : React.createElement(link, props);
};

export { renderCustomComponents };
