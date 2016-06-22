var R = require('ramda')
var Q = require('q')

var getBranch = require('./get-branch')
var getRemote = require('./get-remote')

module.exports = () => Q.all([getBranch(), getRemote()]).spread((branch, remoteInfo) =>
  R.merge({ branch: branch }, remoteInfo))
