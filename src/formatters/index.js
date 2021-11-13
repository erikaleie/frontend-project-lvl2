import style from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (format, data) => {
  if (format === 'plain') {
    return plain(data);
  }
  if (format === 'json') {
    return json(data);
  }
  return style(data);
};
