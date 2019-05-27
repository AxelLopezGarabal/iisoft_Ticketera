
var assert = require('assert');
const systemModule = require('../model/System');

const ls = ["@anna", "@marie"];

const system = new systemModule.System(ls);

describe('System', function() {
  describe('#getEmployees()', function() {
    it('should return the list of Employees', function() {
      assert.equal(system.getEmployees(), ls);
    });
  });

  describe('#existEmployeeWithName(employeeName)', function() {
    it('should return true if exist the employee else false', function() {
      assert.equal(system.existEmplayeeWithName("@marie"), true);
    });
  });
});