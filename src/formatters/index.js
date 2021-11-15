import style from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const mapping = {
  plain: (data) => plain(data),
  json: (data) => json(data),
  stylish: (data) => style(data),
};

export default (format, data) => mapping[format](data);
