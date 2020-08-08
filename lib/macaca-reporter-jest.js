'use strict';

const path = require('path');
const moment = require('moment');
const render = require('macaca-reporter/lib/render');
const outputJson = require('macaca-reporter/lib/output-json');

const helper = require('./helper');

class MacacaReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = options;
  }

  async onRunComplete(_, results) {
    const {
      startTime,
      numTotalTests,
      numPassedTests,
      numPendingTests,
      numFailedTests,
      numTotalTestSuites,
    } = results;
    const endTime = moment();
    const rootTestResult = results.testResults;
    const data = {
      suites: {
        title: '',
        ctx: {},
        suites: rootTestResult.map(item => {
          const tests = item.testResults.map(item => {
            const pass = item.status === 'passed';
            const uuid = helper.uuid();
            return {
              title: '',
              fullTitle: item.ancestorTitles.join(' -> ') || item.fullName,
              duration: 0,
              state: item.status,
              pass,
              fail: !pass,
              pending: false,
              context: '',
              code: `${item.fullName}\n${item.failureMessages || ''}`,
              uuid,
              skipped: false,
            };
          });
          return {
            title: helper.resolveTestFilePath(this, item.testFilePath),
            suites: [],
            tests,
          };
        }),
      },
      stats: {
        duration: endTime - startTime,
        start: moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
        end: endTime.format('YYYY-MM-DD HH:mm:ss'),
        tests: numTotalTests,
        passes: numPassedTests,
        pending: numPendingTests,
        failures: numFailedTests,
        passPercent: (numPassedTests / numTotalTests * 100).toFixed(2),
        pendingPercent: (numPendingTests / numTotalTests * 100).toFixed(2),
        suites: numTotalTestSuites,
        other: 0,
        hasOther: false,
        skipped: 0,
        hasSkipped: false,
      },
    };
    const options = Object.assign({}, this.options);
    if (options.distDir) {
      options.distDir = path.resolve(options.distDir);
    }
    render(data, options);
    outputJson(data, options);
  }
}

module.exports = MacacaReporter;
