module.exports = (key) => {
  if (!process.env[key]) {
    throw Error(`Environment variable ${key} not set`)
  }
  return process.env[key]
}
