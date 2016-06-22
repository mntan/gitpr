var prs = require('./prs')

module.exports = (repoInfo) => {
  if (!prs[repoInfo.service]) {
    throw Error(`Unable to make pull request for service ${repoInfo.service}`)
  }
  return prs[repoInfo.service](repoInfo)
}
