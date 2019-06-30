var assert = require('assert');

const hasherModule = require('../model/Hasher');

const hasher = new hasherModule.Hasher();

describe('Hasher', function() {
  describe('#hashPassword()', function() {
    it('should return a hash of the password passed as parameter(password length 4)', function() {
      const hashResult = 1509442;
      const hashCreated = hasher.hashPassword('1234');
      assert.equal(hashCreated, hashResult);
    });
  });

  describe('#hashPassword()', function() {
    it('should return a hash of the password passed as parameter(password length 0)', function() {
      const hashResult = 0;
      const hashCreated = hasher.hashPassword('');
      assert.equal(hashCreated, hashResult);
    });
  });
});