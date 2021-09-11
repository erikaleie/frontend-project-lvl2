import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';

export default (path1, path2) => {
  const format1 = path.extname(path1).substring(1);
  const format2 = path.extname(path2).substring(1);

  const data1 = fs.readFileSync(path.resolve(path1), 'utf8');
  const data2 = fs.readFileSync(path.resolve(path2), 'utf8');

  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  const isThere = (key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) return `  - ${key}: ${obj1[key]}`;
    if (!_.has(obj1, key) && _.has(obj2, key)) return `  + ${key}: ${obj2[key]}`;
    if (obj1[key] === obj2[key]) {
      return `    ${key}: ${obj1[key]}`;
    }
    return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
  };

  const mergedJson = { ...obj1, ...obj2 };
  const keys = Object.keys(mergedJson).sort();

  const result = keys.map((key) => isThere(key));

  const res = result.join('\n');
  return `{\n${res}\n}`;
};
