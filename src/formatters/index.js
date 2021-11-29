import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const mapping = {
  plain: formatPlain,
  stylish: formatStylish,
  json: JSON.stringify,
};

export default (format, data) => mapping[format](data);
