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

      const mapping = {
        nested: (it) => [
          `${REPLACER.repeat(deepLevel)}${it.name}: {`,
          `${iter(it.diff, deepLevel + 1)}`,
          `${REPLACER.repeat(deepLevel)}}`,
        ].join('\n'),
        changed: (it) => [
          `${ident(deepLevel)}- ${it.name}: ${val}`,
          `${ident(deepLevel)}+ ${it.name}: ${newVal}`,
        ].join('\n'),
        deleted: (it) => `${ident(deepLevel)}- ${it.name}: ${val}`,
        added: (it) => `${ident(deepLevel)}+ ${it.name}: ${val}`,
        unchanged: (it) => `${REPLACER.repeat(deepLevel)}${it.name}: ${val}`,
      };

      return mapping[item.type](item);
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
