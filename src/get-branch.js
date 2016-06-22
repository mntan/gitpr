var Q = require('q')
var exec = require('child_process').exec

module.exports = () => {
  var deferred = Q.defer()

  exec('git branch | grep \'*\' | awk \'{print $2}\'', (error, branch) => {
    if (error) {
      return deferred.reject(error)
    }
    return deferred.resolve(branch.replace(/\n$/, ''))
  })

  return deferred.promise
}
