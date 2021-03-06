### Hexlet tests and linter status:
[![Actions Status](https://github.com/erikaleie/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/erikaleie/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/4106e61089b114f191eb/maintainability)](https://codeclimate.com/github/erikaleie/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4106e61089b114f191eb/test_coverage)](https://codeclimate.com/github/erikaleie/frontend-project-lvl2/test_coverage)
[![Linter](https://github.com/erikaleie/frontend-project-lvl2/workflows/github-actions/badge.svg)](https://github.com/erikaleie/frontend-project-lvl2/actions)
# Learning Project - Difference Calculator

This is a cli application realized as a second learning project of the Javascript development profession at [hexlet.io](https://hexlet.io/). 
The application allows to calculate the difference between two compared files in `json` and/or `yaml` formats. The result can be presented in different output types.

[![asciicast](https://asciinema.org/a/449057.svg)](https://asciinema.org/a/449057)

### Installation
```
$ make setup
```

## Command
```
$ gendiff [options] <file1> <file2>
```

Options:
```
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

Output formats: stylish / plain / json

### Request example
```
$ gendiff files/file1.json files/file2.yml -f json
```
