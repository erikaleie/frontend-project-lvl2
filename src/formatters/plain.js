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
      const mapping = {
        changed: (it) => `Property '${acc}${it.name}' was updated. From ${stringify(it.value)} to ${stringify(it.newValue)}`,
        added: (it) => `Property '${acc}${it.name}' was added with value: ${stringify(it.value)}`,
        deleted: (it) => `Property '${acc}${it.name}' was removed`,
        nested: (it) => {
          const newAcc = acc.concat(it.name, '.');
          return iter(newAcc, it.diff);
        },
        unchanged: () => [],
      };
      return mapping[item.type](item);
    }, '');

    return result.join('\n');
  };

  return iter('', data);
};
