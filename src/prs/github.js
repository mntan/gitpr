var Q = require('q')
var request = require('request')
var args = require('../args')
var env = require('../env')

module.exports = (repoInfo) => {
  var deferred = Q.defer()
  var githubToken = env('GITHUB_TOKEN')
  var url = `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/pulls`
  var options = {
    body: {
      title: args.title,
      body: args.body,
      head: repoInfo.branch,
      base: args.base
    },
    json: true,
    headers: {
      'Authorization': `token ${githubToken}`,
      'User-Agent': 'preq'
    }
  }

  request.post(url, options, (error, response, body) => {
    if (error || body.errors) {
      return deferred.reject(error || body.errors)
    }
    deferred.resolve(body.html_url)
  })

  return deferred.promise
}