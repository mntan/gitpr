var Q = require('q')
var request = require('request')
var args = require('./args')

module.exports = (repoInfo) => {
  var deferred = Q.defer()

  request.post(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/pulls`, {
    body: {
      title: args.title,
      head: repoInfo.branch,
      base: args.base
    },
    json: true,
    headers: {
      'Authorization': `token ${args.token}`,
      'User-Agent': 'preq'
    }
  }, (error, response, body) => {
    if (error) {
      deferred.reject(error)
    } else {
      deferred.resolve(body.message)
    }
  })

  return deferred.promise
}
