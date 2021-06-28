import fs from 'fs';
import _ from 'lodash';
import path from 'path';

export default (path1, path2) => {
  const json1 = JSON.parse(fs.readFileSync(path.resolve(path1), 'utf8'));
  const json2 = JSON.parse(fs.readFileSync(path.resolve(path2), 'utf8'));

  const result = [];

  const isThere = (key) => {
    if (_.has(json1, key) && !_.has(json2, key)) return `  - ${key}: ${json1[key]}`;
    if (!_.has(json1, key) && _.has(json2, key)) return `  + ${key}: ${json2[key]}`;
    if (json1[key] === json2[key]) {
      return `    ${key}: ${json1[key]}`;
    }
    return `  - ${key}: ${json1[key]}\n  + ${key}: ${json2[key]}`;
};

  const mergedJson = Object.assign({}, json1, json2);
  const keys = Object.keys(mergedJson).sort();

  for (const key of keys) {
     result.push(isThere(key));
   }

  const res = result.join('\n');
  return `{\n${res}\n}`;
};