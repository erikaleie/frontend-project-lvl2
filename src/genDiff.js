import _ from 'lodash';

const genDiff = (inObj1, inObj2) => {
  const mergedObj = { ...inObj1, ...inObj2 };
  const keys = _.sortBy(Object.keys(mergedObj));

  return keys.map((key) => {
    if (_.isPlainObject(inObj1[key]) && _.isPlainObject(inObj2[key])) {
      return {
        name: key,
        type: 'nested',
        diff: genDiff(inObj1[key], inObj2[key]),
      };
    }
    if (_.has(inObj1, key) && !_.has(inObj2, key)) return { name: key, type: 'deleted', value: inObj1[key] };
    if (!_.has(inObj1, key) && _.has(inObj2, key)) return { name: key, type: 'added', value: inObj2[key] };
    if (_.isEqual(inObj1[key], inObj2[key])) return { name: key, type: 'unchanged', value: inObj1[key] };
    return {
      name: key,
      type: 'changed',
      value: inObj1[key],
      newValue: inObj2[key],
    };
  });
};

export default genDiff;
