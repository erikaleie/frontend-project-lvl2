import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parser from './parsers.js';

export default (path1, path2) => {
  const file1Ext = path1.split('.').pop();
  const data1 = fs.readFileSync(path.resolve(path1), 'utf-8');
  const obj1 = parser(file1Ext, data1);

  const file2Ext = path2.split('.').pop();
  const data2 = fs.readFileSync(path.resolve(path2), 'utf-8');
  const obj2 = parser(file2Ext, data2);

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
