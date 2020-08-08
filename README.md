# macaca-reporter-jest

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/macaca-reporter-jest.svg?style=flat-square
[npm-url]: https://npmjs.org/package/macaca-reporter-jest
[travis-image]: https://img.shields.io/travis/macacajs/macaca-reporter-jest.svg?style=flat-square
[travis-url]: https://travis-ci.org/macacajs/macaca-reporter-jest
[coveralls-image]: https://img.shields.io/coveralls/macacajs/macaca-reporter-jest.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/macacajs/macaca-reporter-jest?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/macaca-reporter-jest.svg?style=flat-square
[download-url]: https://npmjs.org/package/macaca-reporter-jest

> Macaca reporter used for jest.

## Installment

```bash
$ npm i macaca-reporter-jest --save-dev
```

## Configuration

defined in `jest.config.js`:

```bash
  ...
  reporters: [
    'default',
    ['macaca-reporter-jest', {}],
  ],
  ...
```

macaca-reporter-jest is based on [macaca-reporter](https://macacajs.github.io/macaca-reporter).

## License

The MIT License (MIT)
