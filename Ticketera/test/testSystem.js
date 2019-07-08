
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

      system.addEmployeeToEnterpriseWithNameAndParams('testCo', 'Anna', 'Smith', '@anna', 'Developer', 'secreto');

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
      //TODO: no entiendo porque aca va un 1 -> para el usuario es el primer ticket que vee pero es el index 0
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

  describe('#getTicketInIndexFromEmployeeOutbox', function() {
    it('should return the ticket in the index of the outbox from the employee', function() {
      
      const ticket = system.getTicketInIndexFromEmployeeOutbox('testCo', 1, '@anna');
      assert.equal(ticket, system.getEmployeeByAlias('@anna').getOutbox()[0]);
    });
  });

  describe('#verifyIndexForEmployeeOutbox', function() {
    it('should return true if is a valid index to return the ticket in the outbox', function() {
      
      assert.equal(system.verifyIndexForEmployeeOutbox('testCo', 1, '@anna'), true);
      assert.equal(system.verifyIndexForEmployeeOutbox('testCo', 2, '@anna'), false);
    });
  });

  describe('#getTicketInIndexFromEmployeeInbox', function() {
    it('should return the ticket in the index of the inbox from the employee', function() {
      //getTicketInIndexFromEmployeeInbox(enterpriseName, paramIndex, paramAlias)
      system.addEmployeeToEnterpriseWithNameAndParams('testCo', 'Fernando', 'Ripoli', '@ripo', 'Developer', '');
      const e = system.getEmployeeByAlias('@ripo');
      const ticketParaRipo = new ticketModule.Ticket('@J', '@ripo', topic, content, state, priority);
      e.addToInbox(ticketParaRipo);

      assert.equal(system.getTicketInIndexFromEmployeeInbox('testCo', 1, '@ripo'), ticketParaRipo);

    });
  });  

  describe('#verifyIndexForEmployeeOutbox', function() {
    it('should return true if is a valid index to return the ticket in the inbox', function() {
      
      assert.equal(system.verifyIndexForEmployeeInbox('testCo', 1, '@ripo'), true);
      assert.equal(system.verifyIndexForEmployeeInbox('testCo', 2, '@ripo'), false);
    });
  });

  describe('#reduceInfoFromTickets', function() {
    it('should return a list of redusedTickets', function() {
      const ripoInbox = system.getEmployeeByAlias('@ripo').getInbox();

      const inboxReduced = system.reduceInfoFromTickets(ripoInbox);

      assert.equal(ripoInbox.length, inboxReduced.length);
    });
  });

  describe('#reduceInfoFromTickets && getOutboxOfTheEmployeeWithAlias', function() {
    it('should return the outbox of the employee', function() {
      const annaOutbox = system.getEmployeeByAlias('@anna').getOutbox();

      const outbox = system.getOutboxWithAlias('@anna');

      const outboxFromEnterprice = system.getOutboxOfTheEmployeeWithAlias('testCo', '@anna');
      assert.equal(annaOutbox.length, outbox.length);
      assert.equal(annaOutbox.length, outboxFromEnterprice.length);
    });
  });

  describe('#getInboxWithAlias && getInboxOfMemberWithAlias', function() {
    it('should return the inbox of the employee', function() {
      const ripoInbox = system.getEmployeeByAlias('@ripo').getInbox();

      const inbox = system.getInboxWithAlias('@ripo');

      const inboxFromEnterprice = system.getInboxOfMemberWithAlias('testCo', '@ripo');
      assert.equal(ripoInbox.length, inbox.length);
      assert.equal(ripoInbox.length, inboxFromEnterprice.length);
    });
  });

  describe('#existEmployeeWithAlias', function() {
    it('should return the outbox of the employee', function() {
      assert.equal(system.existEmployeeWithAlias('@anna'), true);
      assert.equal(system.existEmployeeWithAlias('@House'), false);
    });
  });

  describe('#verifyPasswordForEmployeeInEnterprise', function() {
    it('should return true if the password of the employee conside with the password passed', function() {
      assert.equal(system.verifyPasswordForEmployeeInEnterprise('testCo', '@anna', 'secreto'), true);
      assert.equal(system.verifyPasswordForEmployeeInEnterprise('testCo', '@anna', ' '), false);
    });
  });

  describe('#getEmployeesListed', function() {
    it('should return the employees that are listed by their alias', function() {
      const list = system.getEmployeesListed(['@anna']);
      assert.equal(list.length, 1);
      assert.equal(list[0].getAlias(), '@anna');
    });
  });

  describe('#verifyEmployeesListed', function() {
      it('should return true if the employees that are listed by their alias', function() {
        assert.equal(system.verifyEmployeesListed(['@anna']), true);
      });
    });

  describe('#getWorkgroupByNameFromEnterpriseWithName', function() {
      it('should return true if the employees that are listed by their alias', function() {
        assert.equal(system.getWorkgroupByNameFromEnterpriseWithName('testCo', '#devs').getAlias(), '#devs')
      });
    });

  describe('#addMembersToWorkgroupWithName', function() {
      it('should add a employee to the workgroup', function() {
        system.addWorkgroupToEnterpriseWithNameAndParams('testCo', '#ATR');
        system.addMembersToWorkgroupWithName(['@anna', '@ripo'], '#ATR', 'testCo');
        assert.equal(system.getWorkgroupByNameFromEnterpriseWithName('testCo', '#ATR').members.length, 2);
      });
    });

  describe('#existWorkgroupWithName', function() {
      it('should return true if there is a enterprise with name', function() {
        assert.equal(system.existWorkgroupWithName('#devs', 'testCo'), true);
      });
    });

  describe('#getWorkgroupsOfEmployeeWithAlias', function() {
      it('should return the list of Workgroups in wich belongs the employee', function() {
        assert.equal(system.getWorkgroupsOfEmployeeWithAlias('@anna').length, 1);
      });
    });
});