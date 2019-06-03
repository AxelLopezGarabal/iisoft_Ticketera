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

module.exports = router;