const express = require('express');
const router = express.Router();
const ticketModule = require('../../model/Ticket');
const systemModule = require('../../model/System');

const ls = ["@anna", "@marie"];

const system = new systemModule.System(ls);

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Get'
	})
});

router.post('/', (req, res, next) => {
	const receptor = req.body.to;
	if(system.existEmplayeeWithName(receptor)){
		res.status(404).json({
			message: 'there is no employee whith name' + receptor + ''
		})
	}
	const newTicket = new ticketModule.Ticket(0, req.body.from, req.body.to, 
		req.body.topic, req.body.content, req.body.state, req.body.priority);
	res.status(200).json({
		message: 'POST method',
		createdTicket: newTicket
	})
});

router.get('/:ticketID', (req, res, next) => {
	res.status(200).json({
		message: 'Get',
		ticketID: req.params.ticketID
	})
});

module.exports = router;