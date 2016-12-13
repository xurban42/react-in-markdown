import {getPropsObject, getRegexMatches} from '../src/utils';
import {matchPropRegex} from '../src/regex';

test('getPropsObject', () => {
  const props1 = '{ id:"5", user:"kitze" }';
  const props2 = '{ id:"5", user:"kitze" }';
  const props3 = '{ "id":"5", "user":"kitze" }';
  const props4 = '{ id: 5, user:[ "xurban42" , "kitze"] }';

  const result = {
    id: '5',
    user: 'kitze'
  };

  const result2 = {
    id: 5,
    user: ['xurban42', 'kitze']
  };

  expect(getPropsObject(props1)).toEqual(result);
  expect(getPropsObject(props2)).toEqual(result);
  expect(getPropsObject(props3)).toEqual(result);
  expect(getPropsObject(props4)).toEqual(result2);
});
