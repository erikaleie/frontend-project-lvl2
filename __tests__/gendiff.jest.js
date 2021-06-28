import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const result = readFile('result_plain');

test('gendiff', () => {
  expect(gendiff('files/file1.json', 'files/file2.json')).toEqual(result);
});
