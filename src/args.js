var R = require('ramda')
var argv = require('yargs')
  .usage('Usage: preq --title [title] --base [base] --body [body] --token [auth token]')
    .demand(['title', 'base', 'token'])
    .defaults({ body: '' })
    .argv

module.exports = R.pick(['title', 'base', 'body', 'token'], argv)
