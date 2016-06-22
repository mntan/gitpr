var R = require('ramda')
var argv = require('yargs')
  .usage('Usage: preq -t [title] -m [message] -b [base]')
    .help('h')
    .describe({
      t: 'The title of the pull request',
      m: 'The contents of the pull request',
      b: 'The name of the branch you want your changes pulled into'
    })
    .demand(['title'])
    .alias({ t: 'title', m: 'message', b: 'base', h: 'help' })
    .defaults({ message: '', base: 'master' })
    .argv

module.exports = R.pick(['title', 'message', 'base'], argv)
