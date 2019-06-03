const systemModule = require('./model/System');
const employeeModule = require('./model/Employee');
const ticketModule = require('./model/Ticket');

const ticketToSelf = new ticketModule.Ticket('@House', '@House', 'it sounds folky', 
	'a random theme from Dr. House', 'pendiente', 'baja');

const employeeD = new employeeModule.Employee('Diana', 'S', '@Diana', 'team manager');
const employeeA = new employeeModule.Employee('Anna', 'Smith', '@anna', 'developer');
const employeeM = new employeeModule.Employee('Marie', 'Smi', '@marie', 'developer');
const employeeG = new employeeModule.Employee('Gregorie', 'House', '@House', 'designer');

let ls = [employeeD, employeeA, employeeG, employeeM];

const system = new systemModule.System(ls);
system.sendTicketTo(ticketToSelf, employeeG, employeeG);

module.exports = system;