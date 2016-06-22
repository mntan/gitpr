var R = require('ramda')
var Q = require('q')
var exec = require('child_process').exec

var REMOTE_CMD = 'git remote -v | grep fetch | awk \'{print $2}\''
var SERVICES_REGEX = /github|bitbucket/
var EXTRACT_REGEX = {
  github: /github\.com[:|\/](.*)\/(.*)\.git/,
  bitbucket: /bitbucket\.org[:|\/](.*)\/(.*)\.git/
}

var zip = R.zipObj(['service', 'owner', 'repo'])
var notEmpty = R.complement(R.isNil)
var isValid = R.compose(R.all(notEmpty), R.props(['service', 'owner', 'repo']))

module.exports = () => {
  var deferred = Q.defer()

  exec(REMOTE_CMD, (error, remote) => {
    if (error) {
      return deferred.reject(error)
    }

    var service = (remote.match(SERVICES_REGEX) || [])[0]
    var extractData = R.compose(zip, R.prepend(service), R.tail, R.match(EXTRACT_REGEX[service] || ''))
    var data = extractData(remote)

    if (!isValid(data)) {
      return deferred.reject('Unable to determine repository information')
    }

    deferred.resolve(data)
  })

  return deferred.promise
}
