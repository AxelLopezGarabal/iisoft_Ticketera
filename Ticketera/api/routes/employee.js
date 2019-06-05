const express = require('express');
const router = express.Router();
const employeeModule = require('../../model/Employee');

const system = require('../../bbdd');

router.get('/listEmployees', (req, res, next) => {
	const list = system.getEmployees()
	res.status(200).json({
		method: 'GET',
		listOfEmployees: list
	})
});

router.post('/registerEmployee', (req, res, next) => {
	const employeeAlias = req.body.to;
	if(system.existEmplayeeWithAlias(employeeAlias)){
		res.status(404).json({
			method: 'POST',
			message: 'there is a employee whith the alias' + employeeAlias + ''
		})
	}
	const newEmployee = new employeeModule.Employee(req.body.name, req.body.lastname, req.body.alias, req.body.position);
	system.registerEmployee(newEmployee);
	res.status(200).json({
		method: 'POST',
		message: 'the employee has been add to the system'
	})
});

router.get('/employee=:alias', (req, res, next) => {
	const param = req.params.alias;
	if(!system.existEmplayeeWithAlias(param)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + param + ''
		})
	}
	const employee = system.getEmployeeByAlias(param);
	res.status(200).json({
		method: 'GET',
		employee: employee
	});
});

router.get('/employee=:alias/listInbox', (req, res, next) => {
	const param = req.params.alias;
	if(!system.existEmplayeeWithAlias(param)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + param + ''
		})
	}
	const inboxList = system.getInboxOfTheEmployeeWithAlias(param);
	res.status(200).json({
		method: 'GET',
		inbox: inboxList
	});
});


router.get('/employee=:alias/inbox/ticket=:nro', (req, res, next) => {
  	const paramAlias = req.params.alias;
	const paramnro = parseInt(req.params.nro, 10);
	if(!system.existEmplayeeWithAlias(paramAlias)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + paramAlias + ''
		});
	}
	else{
		if(!system.verifyIndexForEmployeeInbox(paramnro, paramAlias)){
			res.status(404).json({
				method: 'GET',
				message: 'the employee whith the alias ' + paramAlias + 'has not that amount of tickets in the inbox.'
			});	
		}
		else{
			const ticketN = system.getTicketInIndexFromEmployeeInbox(paramnro, paramAlias);
			res.status(200).json({
				method: 'GET',
				ticket: ticketN
			});
		}
	}
});

module.exports = router;