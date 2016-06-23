var Q = require('q')
var request = require('request')
var args = require('../args')
var env = require('../env')
var api = require('../../config').github.api

module.exports = (repoInfo) => {
  var deferred = Q.defer()
  var token = env(api.tokenKey)
  var url = `${api.root}/repos/${repoInfo.owner}/${repoInfo.repo}/pulls`
  var options = {
    body: {
      title: args.title,
      body: args.message,
      head: repoInfo.branch,
      base: args.base
    },
    json: true,
    headers: {
      'Accept': `application/vnd.github.${api.version}+json`,
      'Authorization': `token ${token}`,
      'User-Agent': 'preq'
    }
  }

  request.post(url, options, (error, response, body) => {
    if (error || body.errors) {
      return deferred.reject(error || body.errors)
    }
    deferred.resolve(`Pull request successful: ${body.html_url}`)
  })

  return deferred.promise
}
