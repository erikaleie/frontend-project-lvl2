import _ from 'lodash';

const REPLACER = '    ';

const ident = (deepLevel) => REPLACER.repeat(deepLevel).slice(0, -2);

const stringify = (obj, deepLevel) => {
  const keys = _.sortBy(Object.keys(obj));
  const res = keys.map((key) => {
    if (_.isPlainObject(obj[key])) {
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
      const val = _.isPlainObject(item.value) ? stringify(item.value, deepLevel + 1) : item.value;
      const newVal = _.isPlainObject(item.newValue)
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
          `${ident(deepLevel)}- ${item.name}: ${val}`,
          `${ident(deepLevel)}+ ${item.name}: ${newVal}`,
        ].join('\n');
      }

      if (item.type === 'deleted') {
        return `${ident(deepLevel)}- ${item.name}: ${val}`;
      }

      if (item.type === 'added') {
        return `${ident(deepLevel)}+ ${item.name}: ${val}`;
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
