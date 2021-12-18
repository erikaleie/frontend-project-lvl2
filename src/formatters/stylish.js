import _ from 'lodash';

const REPLACER = '    ';

const ident = (deepLevel) => REPLACER.repeat(deepLevel).slice(0, -2);

const stringify = (value, deepLevel) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const keys = _.sortBy(Object.keys(value));
  const res = keys.map((key) => {
    if (_.isPlainObject(value[key])) {
      return `${REPLACER.repeat(deepLevel)}${key}: ${stringify(value[key], deepLevel + 1)}`;
    }
    return `${REPLACER.repeat(deepLevel)}${key}: ${value[key]}`;
  });
  return [
    '{',
    res.join('\n'),
    `${REPLACER.repeat(deepLevel - 1)}}`,
  ].join('\n');
};

const mapping = {
  nested: (it, deepLevel, iter) => [
    `${REPLACER.repeat(deepLevel)}${it.name}: {`,
    `${iter(it.diff, deepLevel + 1)}`,
    `${REPLACER.repeat(deepLevel)}}`,
  ].join('\n'),
  changed: (it, deepLevel, iter, val, newVal) => [
    `${ident(deepLevel)}- ${it.name}: ${val}`,
    `${ident(deepLevel)}+ ${it.name}: ${newVal}`,
  ].join('\n'),
  deleted: (it, deepLevel, iter, val) => `${ident(deepLevel)}- ${it.name}: ${val}`,
  added: (it, deepLevel, iter, val) => `${ident(deepLevel)}+ ${it.name}: ${val}`,
  unchanged: (it, deepLevel, iter, val) => `${REPLACER.repeat(deepLevel)}${it.name}: ${val}`,
};

const print = (data) => {
  const iter = (innerData, deepLevel) => {
    const result = innerData.map((item) => {
      const val = stringify(item.value, deepLevel + 1);
      const newVal = stringify(item.newValue, deepLevel + 1);

      return mapping[item.type](item, deepLevel, iter, val, newVal);
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
