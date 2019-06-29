const express = require('express');
const router = express.Router();
const ticketModule = require('../../model/Ticket');

const system = require('../../mockBBDD');

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Get'
	})
});

router.post('/', (req, res, next) => {
	const employeeDestiny = req.body.to;
	if(!system.existEmployeeWithAlias(employeeDestiny)){
		res.status(404).json({
			message: 'there is no employee whith name ' + employeeDestiny + '.'
		})
	}
	else{
		const newTicket = new ticketModule.Ticket(req.body.from, employeeDestiny, 
		req.body.topic, req.body.content, req.body.state, req.body.priority);
	
		let employeeOrigin  = req.body.from;

		if(!system.getEnterpriseOfEmployeeWithAlias(employeeDestiny) == system.getEnterpriseOfEmployeeWithAlias(employeeOrigin)){
			res.status(404).json({
				message: 'the employee ' + employeeDestiny + ' and the employee ' + employeeOrigin + ' are from diferent enterprises'
			})
		}
		else{
			const enterprise = system.getEnterpriseOfEmployeeWithAlias(employeeDestiny);
			system.sendTicketTo(enterprise.getName() ,newTicket, employeeDestiny, employeeOrigin);

			res.status(200).json({
				message: 'POST method',
				createdTicket: newTicket
			});
		}
	}
});

router.get('/:ticketID', (req, res, next) => {
	res.status(200).json({
		message: 'Get',
		ticketID: req.params.ticketID
	})
});

module.exports = router;