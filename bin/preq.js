#! /usr/bin/env node

var getRepoInfo = require('../src/get-repo-info')
var pullRequest = require('../src/pull-request')

getRepoInfo()
  .then(pullRequest)
  .then(console.log)
  .catch((error) => {
    console.log(error.stack || error)
  })
