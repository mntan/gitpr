var Q = require('q')
var request = require('request')
var args = require('./args')

module.exports = (repoInfo) => {
  var deferred = Q.defer()
  var url = `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/pulls`

  request.post(url, {
    body: {
      title: args.title,
      body: args.body,
      head: repoInfo.branch,
      base: args.base
    },
    json: true,
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'User-Agent': 'preq'
    }
  }, (error, response, body) => {
    if (error) {
      return deferred.reject(error)
    }
    deferred.resolve(body)
  })

  return deferred.promise
}
