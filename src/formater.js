import style from './stylish.js';
import plain from './plain.js';

export default (format, data) => {
  if (format === 'stylish') {
    return style(data);
  }
  if (format === 'plain') {
    return plain(data);
  }
};
