import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';
import formater from './formatters/index.js';

export default (path1, path2, format = 'stylish') => {
  const format1 = path.extname(path1).substring(1);
  const format2 = path.extname(path2).substring(1);

  const data1 = fs.readFileSync(path.resolve(path1), 'utf8');
  const data2 = fs.readFileSync(path.resolve(path2), 'utf8');

  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  const diff = (inObj1, inObj2) => {
    const mergedObj = { ...inObj1, ...inObj2 };
    const keys = _.sortBy(Object.keys(mergedObj));

    const result = keys.map((key) => {
      if (_.isObject(inObj1[key]) && _.isObject(inObj2[key])) {
        return {
          name: key,
          type: 'nested',
          diff: diff(inObj1[key], inObj2[key]),
        };
      }
      if (_.has(inObj1, key) && !_.has(inObj2, key)) return { name: key, type: 'deleted', value: inObj1[key] };
      if (!_.has(inObj1, key) && _.has(inObj2, key)) return { name: key, type: 'added', value: inObj2[key] };
      if (inObj1[key] === inObj2[key]) return { name: key, type: 'unchanged', value: inObj1[key] };
      return {
        name: key,
        type: 'changed',
        value: inObj1[key],
        newValue: inObj2[key],
      };
    });

    return result;
  };

  const unformattedResult = diff(obj1, obj2);

  return formater(format, unformattedResult);
};
