import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';
import formater from './formater.js';

export default (path1, path2, format = 'stylish') => {
  const format1 = path.extname(path1).substring(1);
  const format2 = path.extname(path2).substring(1);

  const data1 = fs.readFileSync(path.resolve(path1), 'utf8');
  const data2 = fs.readFileSync(path.resolve(path2), 'utf8');

  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  const diff = (obj1, obj2) => {
    const mergedObj = { ...obj1, ...obj2 };
    const keys = Object.keys(mergedObj).sort();

    const result = keys.map((key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) return {
        name: key,
        type: 'nested',
        diff: diff(obj1[key], obj2[key]),
      };
      if (_.has(obj1, key) && !_.has(obj2, key)) return { name: key, type: 'deleted', value: obj1[key] };
      if (!_.has(obj1, key) && _.has(obj2, key)) return { name: key, type: 'added', value: obj2[key] };
      if (obj1[key] === obj2[key]) return { name: key, type: 'unchanged', value: obj1[key] };
      return { name: key, type: 'changed', value: obj1[key], newValue: obj2[key] };
    });

    return result;
  };

  const unformattedResult = diff(obj1, obj2);

  return formater(format, unformattedResult);
};
