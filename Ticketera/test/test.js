
var assert = require('assert');

//----------------------------------------------------------------------------------------------------------------

const systemModule = require('../model/System');
const employeeModule = require('../model/Employee');
const ticketModule = require('../model/Ticket');

const system = new systemModule.System([]);

const anna = new employeeModule.Employee('Anna', 'Smith', '@anna', 'Developer');
const marie = new employeeModule.Employee('Marie', 'Smith', '@marie', 'Developer');

describe('System', function() {
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

      assert.equal(system.existEmplayeeWithAlias('@marie'), true);
      assert.equal(system.existEmplayeeWithAlias('@Anna'), false);
    });
  });

  describe('#getEmployeeByAlias(employeeAlias)', function() {
    it('should return the employee with that alias', function() {
      system.registerEmployee(anna);
   	  assert.equal(system.getEmployeeByAlias('@anna'), anna);
    });
  });

  describe('#sendTicketTo(ticket, employeeAliasDestiny, employeeAliasOrigin)', function() {
    it('should send a ticket from employeeAliasOrigin to employeeAliasDestiny', function() {
      
      const topic = 'it sounds folky';
      const content = 'just some random theme from Dr. House';
      const state = 'pendiente';
      const priority = 'bajo';

      system.registerEmployee(anna);
      system.registerEmployee(marie);

      const ticket = new ticketModule.Ticket('@anna', '@marie', topic, content, state, priority);

      system.sendTicketTo(ticket, anna, marie);

      const employeeDestiny = system.getEmployeeByAlias('@anna');
      const employeeOrigin  = system.getEmployeeByAlias('@marie');

      assert.equal(employeeDestiny.getInbox().length, 1);
      assert.equal(employeeOrigin.getOutbox().length, 1);
    });
  });
});