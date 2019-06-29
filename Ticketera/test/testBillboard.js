var assert = require('assert');



//--------------------------------------------------------------------------------------------------------------------------------------------

const b = require('../model/Billboard');
const t = require('../model/Ticket');
const ticket1 = "tick1";
const billboard = new b.Billboard();
const billboardSort = new b.Billboard();

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

    describe('#higherPriority()', function() {
        it('should return the ticket with the highest priority', function() {
            const ticketH = new t.Ticket('from', 'to', 'topic', 'content', 'state', 1);
            const ticketL = new t.Ticket('from', 'to', 'topic', 'content', 'state', 0);
            //el primer ticket mas importante que el segundo
            assert.equal(billboard.higherPriority(ticketH, ticketL), ticketH);
        });
    });

    describe('#higherPriority()', function() {
        it('should return the ticket with the highest priority', function() {
            const ticketH = new t.Ticket('from', 'to', 'topic', 'content', 'state', 1);
            const ticketL = new t.Ticket('from', 'to', 'topic', 'content', 'state', 0);
            //el segundo mas importante que el primer ticket 
            assert.equal(billboard.higherPriority(ticketL, ticketH), ticketH);
        });
    });

    describe('#sortByPriority()', function() {
        it('should return a sortedList of the tickets by priority', function() {
            const ticketH = new t.Ticket('from0', 'to0', 'topic0', 'content0', 'state0', 1);
            const ticketH1 = new t.Ticket('from1', 'to1', 'topic1', 'content1', 'state1', 1);
            const ticketL = new t.Ticket('from', 'to', 'topic', 'content', 'state', 0);
            billboardSort.setTicket(ticketH);
            billboardSort.setTicket(ticketL);
            billboardSort.setTicket(ticketH1);

            const sortedList = billboardSort.sortByPriority();

            assert.equal(sortedList.length, 3);
            assert.equal(sortedList[0], ticketH);
            assert.equal(sortedList[1], ticketH1);
            assert.equal(sortedList[2], ticketL);
        });
    });

    describe('#setBillboard()', function() {
        it('adds a billboard to the actual board', function() {
            billboardSort.setBillboard(billboard);
            assert.equal(billboardSort.getBillboard().length, 1);
            assert.equal(billboardSort.getBillboard()[0], billboard);
        });
    });
});