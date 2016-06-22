var rewire = require('rewire')
var getRemote = rewire('../src/get-remote')

describe('getRemote function', () => {
  describe('GitHub', () => {
    it('should return the expected result for a valid ssh repo', (done) => {
      var exec = (cmd, callback) => callback(null, 'git@github.com:stuwilliams47/preq.git')
      getRemote.__set__('exec', exec)

      getRemote().then((info) => {
        expect(info).toEqual({ service: 'github', owner: 'stuwilliams47', repo: 'preq' })
        done()
      }).catch(done)
    })

    it('should return the expected result for a valid https repo', (done) => {
      var exec = (cmd, callback) => callback(null, 'https://github.com/stuwilliams47/preq.git')
      getRemote.__set__('exec', exec)

      getRemote().then((info) => {
        expect(info).toEqual({ service: 'github', owner: 'stuwilliams47', repo: 'preq' })
        done()
      }).catch(done)
    })
  })

  describe('Bitbucket', () => {
    it('should return the expected result for a valid ssh repo', (done) => {
      var exec = (cmd, callback) => callback(null, 'git@bitbucket.org:stuwilliams47/preq.git')
      getRemote.__set__('exec', exec)

      getRemote().then((info) => {
        expect(info).toEqual({ service: 'bitbucket', owner: 'stuwilliams47', repo: 'preq' })
        done()
      }).catch(done)
    })

    it('should return the expected result for a valid https repo', (done) => {
      var exec = (cmd, callback) => callback(null, 'https://stuwilliams47@bitbucket.org/stuwilliams47/preq.git')
      getRemote.__set__('exec', exec)

      getRemote().then((info) => {
        expect(info).toEqual({ service: 'bitbucket', owner: 'stuwilliams47', repo: 'preq' })
        done()
      }).catch(done)
    })
  })

  describe('Invalid repo', () => {
    it('should reject the promise', (done) => {
      var exec = (cmd, callback) => callback(null, 'someinvalidrepo')
      var resolved = jasmine.createSpy().andCallFake(() => {
        expect(true).toBeFalsy()
        done()
      })
      var rejected = jasmine.createSpy().andCallFake(() => {
        expect(resolved).not.toHaveBeenCalled()
        expect(rejected).toHaveBeenCalled()
        done()
      })
      getRemote.__set__('exec', exec)
      getRemote().then(resolved, rejected)
    })
  })
})
