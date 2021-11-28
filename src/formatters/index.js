import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const mapping = {
  plain: formatPlain,
  stylish: formatStylish,
  json: (data) => JSON.stringify(data),
};

export default (format, data) => mapping[format](data);
