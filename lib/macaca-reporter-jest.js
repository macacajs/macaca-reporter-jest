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
          const tests = [];
          let totalPasses = 0;
          let totalFailures = 0;
          let totalPending = 0;
          let duration = 0;
          for (const result of item.testResults) {
            if (result.status === 'pending') {
              totalPending += 1;
              continue;
            };
            const uuid = helper.uuid();
            const pass = result.status === 'passed';
            pass ? totalPasses += 1 : totalFailures += 1;
            duration += result.duration;
            tests.push({
              title: result.title,
              fullTitle: result.ancestorTitles.length ? `${result.ancestorTitles.join(' -> ')} -> ${result.title}` : item.fullName,
              duration: result.duration,
              state: result.status,
              pass,
              fail: !pass,
              pending: false,
              context: '',
              code: `${result.fullName}\n${result.failureMessages || ''}`,
              uuid,
              skipped: false,
            })
          }
          return {
            title: helper.resolveTestFilePath(this, item.testFilePath),
            suites: [],
            tests,
            totalTests: item.testResults.length,
            totalPasses,
            totalFailures,
            totalPending,
            totalSkipped: 0,
            duration
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
