import _ from 'lodash';

const stringify = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return String(val);
};

const mapping = {
  changed: (it, acc) => `Property '${acc}${it.name}' was updated. From ${stringify(it.value)} to ${stringify(it.newValue)}`,
  added: (it, acc) => `Property '${acc}${it.name}' was added with value: ${stringify(it.value)}`,
  deleted: (it, acc) => `Property '${acc}${it.name}' was removed`,
  nested: (it, acc, iter) => {
    const newAcc = acc.concat(it.name, '.');
    return iter(newAcc, it.diff);
  },
  unchanged: () => [],
};

export default (data) => {
  const iter = (acc, innerData) => {
    const result = innerData.flatMap((item) => mapping[item.type](item, acc, iter));
    return result.join('\n');
  };

  return iter('', data);
};
