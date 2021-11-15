import _ from 'lodash';

const REPLACER = '    ';

const stringify = (obj, deepLevel) => {
  const keys = _.sortBy(Object.keys(obj));
  const res = keys.map((key) => {
    if (_.isObject(obj[key])) {
      return `${REPLACER.repeat(deepLevel)}${key}: ${stringify(obj[key], deepLevel + 1)}`;
    }
    return `${REPLACER.repeat(deepLevel)}${key}: ${obj[key]}`;
  });
  return [
    '{',
    res.join('\n'),
    `${REPLACER.repeat(deepLevel - 1)}}`,
  ].join('\n');
};

const print = (data) => {
  const iter = (innerData, deepLevel) => {
    const result = innerData.map((item) => {
      const val = _.isObject(item.value) ? stringify(item.value, deepLevel + 1) : item.value;
      const newVal = _.isObject(item.newValue)
        ? stringify(item.newValue, deepLevel + 1) : item.newValue;

      if (item.type === 'nested') {
        return [
          `${REPLACER.repeat(deepLevel)}${item.name}: {`,
          `${iter(item.diff, deepLevel + 1)}`,
          `${REPLACER.repeat(deepLevel)}}`,
        ].join('\n');
      }

      if (item.type === 'changed') {
        return [
          `${REPLACER.repeat(deepLevel).slice(0, -2)}- ${item.name}: ${val}`,
          `${REPLACER.repeat(deepLevel).slice(0, -2)}+ ${item.name}: ${newVal}`,
        ].join('\n');
      }

      if (item.type === 'deleted') {
        return `${REPLACER.repeat(deepLevel).slice(0, -2)}- ${item.name}: ${val}`;
      }

      if (item.type === 'added') {
        return `${REPLACER.repeat(deepLevel).slice(0, -2)}+ ${item.name}: ${val}`;
      }

      return `${REPLACER.repeat(deepLevel)}${item.name}: ${val}`;
    });
    return result.join('\n');
  };

  return [
    '{',
    iter(data, 1),
    '}',
  ].join('\n');
};

export default print;
