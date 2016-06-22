#! /usr/bin/env node

var getRepoInfo = require('../src/get-repo-info')
var createPullRequest = require('../src/create-pull-request')

getRepoInfo().then(createPullRequest).then(console.log).catch(console.log)
