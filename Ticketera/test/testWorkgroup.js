var assert = require('assert');

const workgroupModule = require('../model/Workgroup');
const employeeModule = require('../model/Employee');
const workgroup = new workgroupModule.Workgroup();
const employee = new employeeModule.Employee();


describe('Workgroup', function() {
    describe('#getEmployees()', function() {
        it('should return empty array', function() {
            assert.equal(workgroup.getEmployees().length, 0);
        });
  });


    describe('#getEmployees()', function() {
        it('should return true if the array get one employee', function() {
            workgroup.addEmployee(employee);
            assert.equal(workgroup.getEmployees().length, 1);
        });
    });


});