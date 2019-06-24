
var assert = require('assert');

const systemModule = require('../model/System');
const enterpriseModule = require('../model/Enterprise');
const employeeModule = require('../model/Employee');
const ticketModule = require('../model/Ticket');
const workgroupModule = require('../model/Workgroup');

const system = new systemModule.System();
const emptySystem = new systemModule.System();
const testCompany = new enterpriseModule.Enterprise('testCo');

system.registerEnterprise(testCompany);
//const marie = new employeeModule.Employee('Marie', 'Smith', '@marie', 'Developer');

const topic = 'bug #1';
const content = 'test content';
const state = 'pendiente';
const priority = 'alto';
const ticket = new ticketModule.Ticket('@anna', '#devs', topic, content, state, priority);


describe('System - Enterprises', function() {

  describe('#getEnterprises()', function() {
    it('should return an empty array', function() {
      assert.equal(emptySystem.getEnterprises().length, 0);
    });
  });
  
  //TODO: EXCEPTION ?
  describe('#notExistEnterpriseWithName()', function() {
    it('should return none enterprise with name', function() {
      assert.equal(emptySystem.existEnterpriseWithName('testCo'), 0);
    });
  });
  
  describe('#getEnterprises()', function() {
    it('should return a non empty array', function() {
      assert.equal(system.getEnterprises().length, 1);
    });
  });
  
  describe('#existEnterpriseWithName()', function() {
    it('should return enterprise with name', function() {
      assert.ok(system.existEnterpriseWithName('testCo'));
    });
  });
  
});


describe('System - Employees & Workgroups', function() {

  describe('#registerEmployee()', function() {
    it('should add a employee to an enterprise in the system', function() {
      assert.equal(system.getEmployeesFromEnterpriseWithName('testCo').length, 0);

      system.addEmployeeToEnterpriseWithNameAndParams('testCo', 'Anna', 'Smith', '@anna', 'Developer');

      assert.equal(system.getEmployeesFromEnterpriseWithName('testCo').length, 1);
      assert.equal(system.getMemberWithAliasFromEnterpriseWithName('@anna', 'testCo').getAlias(), '@anna');
      assert.equal(system.getMemberWithAliasFromEnterpriseWithName('@anna', 'testCo').getName(), 'Anna');
    });
  });
  
  describe('#existEmployeeWithAlias(employeeAlias)', function() {
    it('should return true if exist the employee with that alias else false', function() {
      assert.equal(system.existEmployeeWithAliasInEnterpriseWithName('@anna', 'testCo'), true);
      assert.equal(system.existEmployeeWithAliasInEnterpriseWithName('@marie', 'testCo'), false);
    });
  });

  //TODO: es algo parecido al test anterior
  describe('#getEmployeeByAlias(employeeAlias)', function() {
    it('should return the employee with that alias', function() {
      assert.equal(system.getMemberWithAliasFromEnterpriseWithName('@anna', 'testCo').getAlias(), '@anna');
      assert.equal(system.getMemberWithAliasFromEnterpriseWithName('@anna', 'testCo').getName(), 'Anna');
    });
  });

  // WORKGROUPS 
  describe('#registerWorkgroup()', function() {
    it('should add a workgroup to an enterprise of the system', function() {

      assert.equal(system.getWorkgroupsFromEnterpriseWithName('testCo').length, 0);
      system.addWorkgroupToEnterpriseWithNameAndParams('testCo', '#devs');
      assert.equal(system.getWorkgroupsFromEnterpriseWithName('testCo').length, 1);
      assert.equal(system.getWorkgroupsFromEnterpriseWithName('testCo')[0].getAlias(), '#devs');
    });
  });

});

describe('System - Tickets inbox & outbox', function() {
  
  describe('#verifyIndexForMemberInbox(index, employeeAlias)', function() {
    it('should return true or false if the amount of tickets that the employee has is greater of equal to the index', function() {
      system.sendTicketTo('testCo', ticket, '@anna', '#devs')
      assert.equal(system.verifyIndexForMemberInbox('testCo', 0, '@anna'), true);
    });
  });

  describe('#verifyIndexForMemberInbox(index, workgroupAlias)', function() {
    it('should return true or false if the amount of tickets that the workgroup has is greater of equal to the index', function() {
      assert.equal(system.verifyIndexForMemberInbox('testCo', 1, '#devs'), true);
    });
  });
  
  describe('#getTicketInIndexFromMemberInbox(index, workgroupAlias)', function() {
    it('should return the ticket which is place in the index', function() {
      //TODO: no entiendo porque aca va un 1
      const t = system.getTicketInIndexFromMemberInbox('testCo', 1, '#devs');

      assert.equal(t.getFrom(), '@anna');
      assert.equal(t.getTopic(), 'bug #1');
    });
  });

  describe('#getInboxOfMemberWithAlias (workgroup)', function() {
    it('should return the inbox of the member (workgroup) with that alias', function() {
      
      const inboxList = system.getInboxOfMemberWithAlias('testCo', '@anna');
      
      assert.equal(inboxList.length, 0);
    });
  });

  /*
  FIXME: deberiamos testear las exceptions ante la busqueda de un empleado que no existe
  describe('#getInboxOfMemberWithAlias (employee)', function() {
    it('should return the inbox of the member (employee) with that alias', function() {
      
      const inboxList = system.getInboxOfMemberWithAlias('testCo', '@marie');
      
      assert.equal(inboxList.length, 0);
    });
  });
*/
});