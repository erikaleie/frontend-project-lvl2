import style from './stylish.js';

export default (format, data) => {
  if (format === 'stylish') {
    return style(data);
  }
};