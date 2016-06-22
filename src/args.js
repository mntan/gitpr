var R = require('ramda')
var argv = require('yargs')
  .usage('Usage: preq --title [title] --body [body] --base [base]')
    .demand(['title'])
    .defaults({ body: '', base: 'master' })
    .argv

module.exports = R.pick(['title', 'body', 'base'], argv)
