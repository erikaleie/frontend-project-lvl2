import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultNested = readFile('result_nested');
const resultPlainFormat = readFile('result_plain_format');
const resultJson = readFile('result_json');

test('gendiff', () => {
  expect(gendiff('files/file1.json', 'files/file2.yml')).toEqual(resultNested);
  expect(gendiff('files/file1.yaml', 'files/file2.json', 'plain')).toEqual(resultPlainFormat);
  expect(gendiff('files/file1.yaml', 'files/file2.json', 'json')).toEqual(resultJson);
});
