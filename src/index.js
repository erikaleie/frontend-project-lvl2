import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import formater from './formatters/index.js';
import diff from './gendiff.js';

export default (path1, path2, format = 'stylish') => {
  const format1 = path.extname(path1).substring(1);
  const format2 = path.extname(path2).substring(1);

  const data1 = fs.readFileSync(path.resolve(path1), 'utf8');
  const data2 = fs.readFileSync(path.resolve(path2), 'utf8');

  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  const result = diff(obj1, obj2);

  return formater(format, result);
};
