var R = require('ramda')
var argv = require('yargs')
  .usage('Usage: preq --title [title] --body [body] --base [base]')
    .demand(['title', 'base'])
    .defaults({ body: '' })
    .argv

module.exports = R.pick(['title', 'body', 'base'], argv)
