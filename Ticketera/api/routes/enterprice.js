const express = require('express');
const router = express.Router();
const enterpriceModule = require('../../model/Enterprice');

var system = require('../../bbdd');

router.get('/listAllEnterpricesInSystem', (req, res, next) => {
	const list = system.getEnterprices();
	res.status(200).json({
		method: 'GET',
		enterprices: list
	})
});

router.post('/registerEnterprice=:name', (req, res, next) => {
	const enterpriceName = req.params.name;
	if(system.existEnterpriceWithName(enterpriceName)){
		res.status(404).json({
			method: 'POST',
			message: 'there is a enterprice whith the name ' + enterpriceName + ''
		})
	}
	var newEnterprice = new enterpriceModule.Enterprice(enterpriceName);
	system.registerEnterprice(newEnterprice);
	res.status(200).json({
		method: 'POST',
		message: 'the enterprice has been add to the system'
	})
});

router.post('/addEmployeeToEnterprice', (req, res, next) => {
	var employeeAlias = req.body.employeeAlias;
	var enterpriceName = req.body.enterpriceName;
	if(!system.existEmployeeWithAlias(employeeAlias)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + employeeAlias + ''
		})
	}
	else{
		if(!system.existEnterpriceWithName(enterpriceName)){
			res.status(404).json({
				method: 'POST',
				message: 'there no is a enterprice whith the name ' + enterpriceName + ''
			})
		}
		else{
			system.addEmployeeWithAliasToEnterpriceWithName(employeeAlias, enterpriceName);
			res.status(200).json({
				method: 'POST',
				message: 'the enterprice ' + enterpriceName + ' has add the employee ' + employeeAlias +'.'
			})
		}
	}
});


module.exports = router;