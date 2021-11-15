import _ from 'lodash';

export default (o1, o2) => {
  const diff = (inObj1, inObj2) => {
    const mergedObj = { ...inObj1, ...inObj2 };
    const keys = _.sortBy(Object.keys(mergedObj));

    const result = keys.map((key) => {
      if (_.isObject(inObj1[key]) && _.isObject(inObj2[key])) {
        return {
          name: key,
          type: 'nested',
          diff: diff(inObj1[key], inObj2[key]),
        };
      }
      if (_.has(inObj1, key) && !_.has(inObj2, key)) return { name: key, type: 'deleted', value: inObj1[key] };
      if (!_.has(inObj1, key) && _.has(inObj2, key)) return { name: key, type: 'added', value: inObj2[key] };
      if (inObj1[key] === inObj2[key]) return { name: key, type: 'unchanged', value: inObj1[key] };
      return {
        name: key,
        type: 'changed',
        value: inObj1[key],
        newValue: inObj2[key],
      };
    });
    return result;
  };

  return diff(o1, o2);
};
