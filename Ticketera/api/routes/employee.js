const express = require('express');
const router = express.Router();
const employeeModule = require('../../model/Employee');

const system = require('../../mockBBDD');

router.get('/listAllEmployeesInSystem', (req, res, next) => {
	const list = system.getEmployees()
	res.status(200).json({
		method: 'GET',
		listOfEmployees: list
	})
});


router.get('/employee=:alias', (req, res, next) => {
	const param = req.params.alias;
	if(!system.existEmployeeWithAlias(param)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + param + ''
		})
	}
	else{
		const employee = system.getEmployeeByAlias(param);
		res.status(200).json({
			method: 'GET',
			employee: employee
		});
	}
});

router.get('/employee=:alias/inbox', (req, res, next) => {
	const param = req.params.alias;
	if(!system.existEmployeeWithAlias(param)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + param + ''
		})
	}
	else{
		const inboxList = system.getInboxWithAlias(param);
		res.status(200).json({
			method: 'GET',
			inbox: inboxList
		});
	}
});


router.get('/employee=:alias/inbox/ticket=:nro', (req, res, next) => {
  	const paramAlias = req.params.alias;
	const paramnro = parseInt(req.params.nro, 10);
	if(!system.existEmployeeWithAlias(paramAlias)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + paramAlias + ''
		});
	}
	else{
		const enterprice = system.getEnterpriseOfEmployeeWithAlias(paramAlias);
		if(!system.verifyIndexForEmployeeInbox(enterprice, paramnro, paramAlias)){
			res.status(404).json({
				method: 'GET',
				message: 'the employee whith the alias ' + paramAlias + 'has not that amount of tickets in the inbox.'
			});	
		}
		else{
			const ticketN = system.getTicketInIndexFromEmployeeInbox(enterprice, paramnro, paramAlias);
			res.status(200).json({
				method: 'GET',
				ticket: ticketN
			});
		}
	}
});

//change the state of a ticket in the inbox
router.put('/employee=:alias/inbox/state/ticket=:nro/', (req, res, next) => {
  	const paramAlias = req.params.alias;
	const paramnro = parseInt(req.params.nro, 10);
	const newState = req.body.state;
	if(!system.existEmployeeWithAlias(paramAlias)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + paramAlias + ''
		});
	}
	else{
		const enterprice = system.getEnterpriseOfEmployeeWithAlias(paramAlias);
		if(!system.verifyIndexForEmployeeInbox(enterprice, paramnro, paramAlias)){
			res.status(404).json({
				method: 'GET',
				message: 'the employee whith the alias ' + paramAlias + 'has not that amount of tickets in the inbox.'
			});	
		}
		else{
			const ticketN = system.getTicketInIndexFromEmployeeInbox(enterprice, paramnro, paramAlias);
			ticketN.setState(newState);
			res.status(200).json({
				method: 'PUT',
				ticket: ticketN
			});
		}
	}
});

//change the priority of a ticket in the inbox
router.put('/employee=:alias/inbox/priority/ticket=:nro/', (req, res, next) => {
  	const paramAlias = req.params.alias;
	const paramnro = parseInt(req.params.nro, 10);
	const newPriority = req.body.priority;
	if(!system.existEmployeeWithAlias(paramAlias)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + paramAlias + ''
		});
	}
	else{
		const enterprice = system.getEnterpriseOfEmployeeWithAlias(paramAlias);
		if(!system.verifyIndexForEmployeeInbox(enterprice, paramnro, paramAlias)){
			res.status(404).json({
				method: 'GET',
				message: 'the employee whith the alias ' + paramAlias + 'has not that amount of tickets in the inbox.'
			});	
		}
		else{
			const ticketN = system.getTicketInIndexFromEmployeeInbox(enterprice, paramnro, paramAlias);
			ticketN.setPriority(newPriority);
			res.status(200).json({
				method: 'GET',
				ticket: ticketN
			});
		}
	}
});

router.get('/employee=:alias/outbox', (req, res, next) => {
	const param = req.params.alias;
	if(!system.existEmployeeWithAlias(param)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + param + '.'
		})
	}
	const outboxList = system.getOutboxWithAlias(param);
	res.status(200).json({
		method: 'GET',
		outbox: outboxList
	});
});

router.get('/employee=:alias/outbox/ticket=:nro', (req, res, next) => {
  	const paramAlias = req.params.alias;
	const paramnro = parseInt(req.params.nro, 10);
	if(!system.existEmployeeWithAlias(paramAlias)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + paramAlias + ''
		});
	}
	else{
		const enterprice = system.getEnterpriseOfEmployeeWithAlias(paramAlias);
		if(!system.verifyIndexForEmployeeOutbox(enterprice, paramnro, paramAlias)){
			res.status(404).json({
				method: 'GET',
				message: 'the employee whith the alias ' + paramAlias + 'has not that amount of tickets in the inbox.'
			});	
		}
		else{
			const ticketN = system.getTicketInIndexFromEmployeeOutbox(enterprice, paramnro, paramAlias);
			res.status(200).json({
				method: 'GET',
				ticket: ticketN
			});
		}
	}
});


//change the state of a ticket in the outbox
router.put('/employee=:alias/outbox/state/ticket=:nro', (req, res, next) => {
  	const paramAlias = req.params.alias;
	const paramnro = parseInt(req.params.nro, 10);
	const newState = req.body.state;
	if(!system.existEmployeeWithAlias(paramAlias)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + paramAlias + ''
		});
	}
	else{
		const enterprice = system.getEnterpriseOfEmployeeWithAlias(paramAlias);
		if(!system.verifyIndexForEmployeeOutbox(enterprice, paramnro, paramAlias)){
			res.status(404).json({
				method: 'GET',
				message: 'the employee whith the alias ' + paramAlias + 'has not that amount of tickets in the inbox.'
			});	
		}
		else{
			const ticketN = system.getTicketInIndexFromEmployeeOutbox(enterprice, paramnro, paramAlias);
			ticketN.setState(newState);
			res.status(200).json({
				method: 'GET',
				ticket: ticketN
			});
		}
	}
});

//change the priority of a ticket in the outbox
router.put('/employee=:alias/outbox/priority/ticket=:nro', (req, res, next) => {
  	const paramAlias = req.params.alias;
	const paramnro = parseInt(req.params.nro, 10);
	const newPriority = req.body.priority;
	if(!system.existEmployeeWithAlias(paramAlias)){
		res.status(404).json({
			method: 'GET',
			message: 'there is no employee whith the alias' + paramAlias + ''
		});
	}
	else{
		const enterprice = system.getEnterpriseOfEmployeeWithAlias(paramAlias);
		if(!system.verifyIndexForEmployeeOutbox(enterprice, paramnro, paramAlias)){
			res.status(404).json({
				method: 'GET',
				message: 'the employee whith the alias ' + paramAlias + 'has not that amount of tickets in the inbox.'
			});	
		}
		else{
			const ticketN = system.getTicketInIndexFromEmployeeOutbox(enterprice, paramnro, paramAlias);
			ticketN.setPriority(newPriority);
			res.status(200).json({
				method: 'GET',
				ticket: ticketN
			});
		}
	}
});

router.post('/employee=:alias/createWorkgroup', (req, res, next) => {
	const paramAlias = req.params.alias;
	const workgroupName = req.body.workgroupName;
	const listOfAlias = req.body.members;
	if(listOfAlias.length == 0){
		res.status(404).json({
			method: 'POST',
			body: listOfAlias,
			message: 'the list of members must have more then one member.'
		});	
	}
	else{
		if(!system.existEmployeeWithAlias(paramAlias)){
			res.status(404).json({
				method: 'POST',
				message: 'there is no employee whith the alias' + paramAlias + ''
			});
		}
		else{
			const enterprise = system.getEnterpriseOfEmployeeWithAlias(paramAlias);
			if(system.existWorkgroupWithName(workgroupName, enterprise.getName())){
				res.status(404).json({
					method: 'POST',
					message: 'there is a workgroup whith the name ' + workgroupName + '.',
				});
			}
			else{
				if(!system.verifyEmployeesListed(listOfAlias)){
					res.status(404).json({
						method: 'POST',
						message: 'there are employees listed that may not belong to the enterprise.'
					});
				}
				else{
					system.addWorkgroupToEnterpriseWithNameAndParams(enterprise.getName(), workgroupName);
					system.addMembersToWorkgroupWithName(listOfAlias, workgroupName, enterprise.getName());
					res.status(200).json({
						method: 'POST',
						message: 'the workgroup has been formed.',
						enterprise: enterprise
					});
				}	
			}	
		}	
	}
});

module.exports = router;