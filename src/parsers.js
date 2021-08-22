import yaml from 'js-yaml';

export default (fileExt, data) => {
  if (fileExt === 'yaml' || fileExt === 'yml') {
    return yaml.load(data);
  }
  if (fileExt === 'json') {
    return JSON.parse(data);
  }
  return null;
};
