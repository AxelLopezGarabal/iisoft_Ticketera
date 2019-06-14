
var assert = require('assert');

const systemModule = require('../model/System');
const employeeModule = require('../model/Employee');
const ticketModule = require('../model/Ticket');
const workgroupModule = require('../model/Workgroup');
const boardModule = require('../model/Billboard');

const system = new systemModule.System([]);
const anna = new employeeModule.Employee('Anna', 'Smith', '@anna', 'Developer');
const marie = new employeeModule.Employee('Marie', 'Smith', '@marie', 'Developer');

const board = new boardModule.Billboard();
const devs = new workgroupModule.Workgroup('#devs', board);


describe('System - Employees & Workgroups', function() {
  
  // EMPLOYEES
  describe('#registerEmployee()', function() {
    it('should add a employee to the system', function() {
      assert.equal(system.getEmployees().length, 0);

      system.registerEmployee(anna);

      assert.equal(system.getEmployees().length, 1);
      assert.equal(system.getEmployees()[0].getAlias(), '@anna');
    });
  });
   
  describe('#getEmployees()', function() {
    it('should return the list of Employees', function() {
      assert.equal(system.getEmployees().length, 1);
    });
  });
   
  describe('#existEmployeeWithAlias(employeeAlias)', function() {
    it('should return true if exist the employee with that alias else false', function() {

      system.registerEmployee(marie);

      assert.equal(system.existEmployeeWithAlias('@marie'), true);
      assert.equal(system.existEmployeeWithAlias('@Anna'), false);
    });
  });

  describe('#getEmployeeByAlias(employeeAlias)', function() {
    it('should return the employee with that alias', function() {
      system.registerEmployee(anna);
   	  assert.equal(system.getEmployeeByAlias('@anna'), anna);
    });
  });


  // WORKGROUPS
  describe('#registerWorkgroup()', function() {
    it('should add a workgroup to the system', function() {
      assert.equal(system.getWorkgroups().length, 0);

      system.registerWorkgroup(devs);
      assert.equal(system.getWorkgroups().length, 1);
      assert.equal(system.getWorkgroups()[0].getAlias(), '#devs');
    });
  });

  // EMPLOYEES & WORKGROUPS
  describe('#getMemberEmployeeByAlias(employeeAlias)', function() {
    it('should return member (employee) with that alias', function() {

      system.registerEmployee(anna);
   	  assert.equal(system.getMemberByAlias('@anna'), anna);
    });
  });

  describe('#getMemberWorkgroupByAlias(employeeAlias)', function() {
    it('should return member (workgroup) with that alias', function() {

      system.registerWorkgroup(devs);
   	  assert.equal(system.getMemberByAlias('#devs'), devs);
    });
  });


  
});