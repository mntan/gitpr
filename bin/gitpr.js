#!/usr/bin/env node

var getRepoInfo = require('../src/get-repo-info')
var pullRequest = require('../src/pull-request')
var log = require('../src/logger')

getRepoInfo()
  .then(pullRequest)
  .then(log.success)
  .catch((error) => {
    log.error('Pull request failed')
    console.log(error.stack || error)
  })
