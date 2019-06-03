const express = require('express');
const router = express.Router();
const ticketModule = require('../../model/Ticket');

const system = require('../../bbdd');

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Get'
	})
});

router.post('/', (req, res, next) => {
	const receptor = req.body.to;
	if(!system.existEmplayeeWithAlias(receptor)){
		res.status(404).json({
			message: 'there is no employee whith name ' + receptor + ''
		})
	}
	const newTicket = new ticketModule.Ticket(req.body.from, receptor, 
		req.body.topic, req.body.content, req.body.state, req.body.priority);
	
	let employeeDestiny = system.getEmployeeByAlias(receptor);
	let employeeOrigin  = system.getEmployeeByAlias(req.body.from);

	system.sendTicketTo(newTicket, employeeDestiny, employeeOrigin);

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