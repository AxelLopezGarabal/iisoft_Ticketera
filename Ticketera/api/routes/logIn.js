const express = require('express');
const router = express.Router();

var system = require('../../mockBBDD');

router.post('/', (req, res, next) => {
	var enterpriseName = req.body.enterpriseName;
	var employeeAlias = req.body.employeeAlias;
	var employeePassword = req.body.employeePassword;
	
	if((!system.existEnterpriseWithName(enterpriseName)) || 
	   (! system.existEmployeeWithAliasInEnterpriseWithName(employeeAlias, enterpriseName))||
	   (! system.verifyPasswordForEmployeeInEnterprise(enterpriseName, employeeAlias, employeePassword))
	   ) {
			res.status(404).json({
				method: 'POST',
				body: req.body,
				message: 'invalid employee alias, password or enterprise name, please try again'
			})
	}
	else{
			res.status(200).json({
				method: 'POST'
			})
		}
});

module.exports = router;