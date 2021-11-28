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

export default (data) => {
  const iter = (acc, innerData) => {
    const result = innerData.flatMap((item) => {
      if (item.type === 'changed') {
        return `Property '${acc}${item.name}' was updated. From ${stringify(item.value)} to ${stringify(item.newValue)}`;
      }
      if (item.type === 'added') {
        return `Property '${acc}${item.name}' was added with value: ${stringify(item.value)}`;
      }
      if (item.type === 'deleted') {
        return `Property '${acc}${item.name}' was removed`;
      }
      if (item.type === 'nested') {
        const newAcc = acc.concat(item.name, '.');
        return iter(newAcc, item.diff);
      }
      return [];
    }, '');

    return result.join('\n');
  };

  return iter('', data);
};
