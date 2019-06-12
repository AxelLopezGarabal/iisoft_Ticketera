
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

  describe('#sendTicketTo(ticket, employeeAliasDestiny, employeeAliasOrigin)', function() {
    it('should send a ticket from employeeAliasOrigin to employeeAliasDestiny', function() {
      
      const topic = 'it sounds folky';
      const content = 'just some random theme from Dr. House';
      const state = 'pendiente';
      const priority = 'bajo';

      system.registerEmployee(anna);
      system.registerEmployee(marie);

      const ticket = new ticketModule.Ticket('@marie', '@anna', topic, content, state, priority);

      system.sendTicketTo(ticket, anna, marie);

      const employeeDestiny = system.getEmployeeByAlias('@anna');
      const employeeOrigin  = system.getEmployeeByAlias('@marie');

      assert.equal(employeeDestiny.getInbox().length, 1);
      assert.equal(employeeOrigin.getOutbox().length, 1);
    });
  });

    describe('#getInboxOfEmployeeWithAlias(employeeAlias)', function() {
    it('should return the inbox of the employee with that alias', function() {
      
      const inboxList = system.getInboxOfEmployeeWithAlias('@anna');
      
      assert.equal(inboxList.length, 1);
    });
  });

    describe('#reduceInfoFromTickets(aListOfTickets)', function() {
    it('should return a list of tickets with less information than the original list', function() {
      
      const topic = 'it sounds folky';
      const content = 'just some random theme from Dr. House';
      const state = 'pendiente';
      const priority = 'bajo';

      const ticket = new ticketModule.Ticket('@marie', '@anna', topic, content, state, priority);

      const ls = [ticket, ticket];
      
      const reducedTicketList = system.reduceInfoFromTickets(ls);

      assert.equal(reducedTicketList.length, 2);
      assert.equal(reducedTicketList[0].getFrom(), ls[0].getFrom());
      assert.equal(reducedTicketList[0].getState(), ls[0].getState());
      assert.equal(reducedTicketList[0].getTopic(), ls[0].getTopic());
      assert.equal(reducedTicketList[0].getPriority(), ls[0].getPriority());
    });
  });

    describe('#verifyIndexForEmployeeInbox(index, alias)', function() {
    it('should return true or false if the amount of tickets that the employee has is greater of equal to the index', function() {
      assert.equal(system.verifyIndexForEmployeeInbox(1, '@anna'), true);
    });
  });

    describe('#getTicketInIndexFromEmployeeInbox(index, alias)', function() {
    it('should return the ticket which is place in the index', function() {
      const ticket = system.getTicketInIndexFromEmployeeInbox(1, '@anna');

      assert.equal(ticket.getFrom(), '@marie');
      assert.equal(ticket.getTopic(), 'it sounds folky');
    });
  });
});