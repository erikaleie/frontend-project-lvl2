#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/gendiff.js';

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .action((path1, path2) => {
    console.log(genDiff(path1, path2));
  });

program.parse();
