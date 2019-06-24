const express = require('express');
const router = express.Router();
const enterpriseModule = require('../../model/Enterprise');

var system = require('../../mockBBDD');

router.get('/listAllEnterprisesInSystem', (req, res, next) => {
	const list = system.getEnterprises();
	res.status(200).json({
		method: 'GET',
		enterprises: list
	})
});

router.post('/registerEnterprise=:name', (req, res, next) => {
	const enterpriseName = req.params.name;
	if(system.existEnterpriseWithName(enterpriseName)){
		res.status(404).json({
			method: 'POST',
			message: 'there is a enterprise whith the name ' + enterpriseName + ''
		})
	}
	var newEnterprise = new enterpriseModule.Enterprise(enterpriseName);
	system.registerEnterprise(newEnterprise);
	res.status(200).json({
		method: 'POST',
		message: 'the enterprise has been add to the system'
	})
});

router.post('/addEmployeeToEnterprise', (req, res, next) => {
	var employeeAlias = req.body.employeeAlias;
	var employeeName = req.body.employeeName;
	var employeeLastname = req.body.employeeLastname;
	var employeePosition = req.body.employeePosition;
	var enterpriseName = req.body.enterpriseName;
	if(!system.existEnterpriseWithName(enterpriseName)){
			res.status(404).json({
				method: 'POST',
				body: req.body,
				message: 'there no is a enterprise whith the name ' + enterpriseName + '.'
			})
	}
	else{
		if(system.existEmployeeWithAliasInEnterpriseWithName(employeeAlias, enterpriseName)){
			res.status(404).json({
				method: 'GET',
				body: req.body,
				message: 'there is employee whith the alias ' + employeeAlias + '.'
			})
		}
		else{
			system.addEmployeeToEnterpriseWithNameAndParams(enterpriseName, employeeName, employeeLastname, 
				employeeAlias, employeePosition);
			res.status(200).json({
				method: 'POST',
				message: 'the enterprise ' + enterpriseName + ' has add the employee ' + employeeAlias +'.'
			})
		}
	}
});


module.exports = router;