var assert = require('assert');



//--------------------------------------------------------------------------------------------------------------------------------------------

const b = require('../model/Billboard');
const ticket1 = "tick1";
const billboard = new b.Billboard();

describe('Billboard', function() {
    describe('#getTickets()', function() {
        it('should return empty array', function() {
            assert.equal(billboard.getTickets().length, 0);
        });
  });


    describe('#getTickets()', function() {
        it('should return true if the array get one ticket', function() {
            billboard.setTicket(ticket1);
            assert.equal(billboard.getTickets().length, 1);
        });
    });


});