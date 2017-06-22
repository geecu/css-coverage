const Promise = require("bluebird");
const getUsage = require('./usage');
const compact = require('./compact');
const dump = require('./dump');

const run = config => {
  const { port = 9222, pages } = require('../config.json');

  return Promise.map(
    pages,
    ({ url }) => getUsage(url, { port }),
    { concurrency: 1 }
  )
    .then(results =>
      results.map(result =>
        result.map(rule => rule.styleSheetText)
      )
    )
    .then(compact.bind(null, pages.map(page => page.out)))
    .then(dump)
}

module.exports = run;
