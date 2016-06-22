var Q = require('q')
var exec = require('child_process').exec

var BRANCH_CMD = 'git branch | grep \'*\' | awk \'{print $2}\''

module.exports = () => {
  var deferred = Q.defer()

  exec(BRANCH_CMD, (error, branch) => {
    if (error) {
      return deferred.reject(error)
    }
    return deferred.resolve(branch.replace(/\n$/, ''))
  })

  return deferred.promise
}
