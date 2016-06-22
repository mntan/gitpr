var R = require('ramda')
var argv = require('yargs')
  .usage('Usage: preq --title [title] --base [base] --message [message] --token [auth token]')
    .demand(['title', 'base', 'token'])
    .argv

module.exports = R.pick(['title', 'base', 'message', 'token'], argv)
