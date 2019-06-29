var assert = require('assert');

const reducedTicketModule = require('../model/ReducedTicket');

	describe('#new', function() {
        it('should create a reduced version of a ticket', function() {
            const ticketR = new reducedTicketModule.ReducedTicket('@anna', 'sprint6', 'higher', 'denided');
            assert.equal(ticketR.getFrom(), '@anna');
            assert.equal(ticketR.getTopic(), 'sprint6');
            assert.equal(ticketR.getPriority(), 'higher');
            assert.equal(ticketR.getState(), 'denided');
        });
	});