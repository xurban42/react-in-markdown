import {matchPropRegex} from './regex';

const quotifyJSON = (text) => {
  return text.replace(/\'/g,'"').replace(/(["])?([a-zA-Z0-9_]+)(["])?:([^\/])/g, '"$2":$4');
}

const decodeHTMLEntities = (text) => {
  const entities = [
      ['amp', '&'],
      ['apos', '\''],
      ['#x27', '\''],
      ['#x2F', '/'],
      ['#39', '\''],
      ['#47', '/'],
      ['lt', '<'],
      ['gt', '>'],
      ['nbsp', ' '],
      ['quot', '"']
  ];

  for (let i = 0, max = entities.length; i < max; ++i) {
    text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);
  }

  return text;
}

export const getPropsObject = propsString => {
  const decodedProps = quotifyJSON(decodeHTMLEntities(propsString));
  return JSON.parse(decodedProps);
}
