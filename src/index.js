const runner = require('./runner');

runner(require('../config.json'))
  .then(() => console.log('Finished'))
  .catch(err => console.error('Error', err))

