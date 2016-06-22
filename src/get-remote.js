var R = require('ramda')
var Q = require('q')
var exec = require('child_process').exec

var REGEX = /(github|bitbucket)\.(?:com|org)[:|\/](.*)\/(.*)\.git/

var props = ['service', 'owner', 'repo']
var extractData = R.compose(R.zipObj(props), R.tail, R.match(REGEX))
var notEmpty = R.complement(R.isNil)
var isValid = R.compose(R.all(notEmpty), R.props(props))

module.exports = () => {
  var deferred = Q.defer()

  exec('git remote -v | grep fetch | awk \'{print $2}\'', (error, remote) => {
    if (error) {
      return deferred.reject(error)
    }

    var data = extractData(remote)

    if (!isValid(data)) {
      return deferred.reject('Unable to determine repository information')
    }

    deferred.resolve(data)
  })

  return deferred.promise
}
