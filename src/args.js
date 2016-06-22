var R = require('ramda')
var argv = require('yargs')
  .usage('Usage: preq -t [title] -b [base] -m [message]')
    .demand(['t', 'b'])
    .alias({ t: 'title', b: 'base', m: 'message' })
    .defaults({ m: '' })
    .argv

module.exports = R.pick(['title', 'base', 'message'], argv)
