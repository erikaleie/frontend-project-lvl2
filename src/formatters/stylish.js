import _ from 'lodash';

const REPLACER = ' ';

const ident = (deepLevel) => REPLACER.repeat(4 * deepLevel);

const stringify = (value, deepLevel) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const keys = _.sortBy(Object.keys(value));
  const res = keys.map((key) => {
    if (_.isPlainObject(value[key])) {
      return `${ident(deepLevel)}${key}: ${stringify(value[key], deepLevel + 1)}`;
    }
    return `${ident(deepLevel)}${key}: ${value[key]}`;
  });
  return [
    '{',
    res.join('\n'),
    `${ident(deepLevel - 1)}}`,
  ].join('\n');
};

const mapping = {
  nested: (it, deepLevel, iter) => [
    `${ident(deepLevel)}${it.name}: {`,
    `${iter(it.diff, deepLevel + 1)}`,
    `${ident(deepLevel)}}`,
  ].join('\n'),
  changed: (it, deepLevel, iter, val, newVal) => [
    `${ident(deepLevel).slice(0, -2)}- ${it.name}: ${val}`, // @TODO
    `${ident(deepLevel).slice(0, -2)}+ ${it.name}: ${newVal}`,// @TODO
  ].join('\n'),
  deleted: (it, deepLevel, iter, val) => `${ident(deepLevel).slice(0, -2)}- ${it.name}: ${val}`,// @TODO
  added: (it, deepLevel, iter, val) => `${ident(deepLevel).slice(0, -2)}+ ${it.name}: ${val}`,// @TODO
  unchanged: (it, deepLevel, iter, val) => `${ident(deepLevel)}${it.name}: ${val}`,
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
