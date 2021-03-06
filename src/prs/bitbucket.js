var Q = require('q')
var request = require('request')
var args = require('../args')
var env = require('../env')
var api = require('../../config').bitbucket.api

module.exports = (repoInfo) => {
  var deferred = Q.defer()
  var token = env(api.tokenKey)
  var url = `${api.root}/${api.version}/repositories/${repoInfo.owner}/${repoInfo.repo}/pullrequests`
  var options = {
    body: {
      title: args.title,
      description: args.message,
      head: repoInfo.branch,
      source: {
        branch: {
          name: repoInfo.branch
        }
      },
      destination: {
        name: args.base
      }
    },
    json: true,
    headers: {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/json'
    }
  }

  request.post(url, options, (error, response, body) => {
    if (error) {
      return deferred.reject(error)
    }
    deferred.resolve(`Pull request successful: ${body.links.html.href}`)
  })

  return deferred.promise
}
