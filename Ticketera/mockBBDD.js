const systemModule = require('./model/System');
const employeeModule = require('./model/Employee');
const ticketModule = require('./model/Ticket');
const enterpriceModule = require('./model/Enterprise');

const Enron = new enterpriceModule.Enterprise('Enron');

const ticketToSelf = new ticketModule.Ticket('@House', '@House', 'it sounds folky', 
	'a random theme from Dr. House', 'pendiente', 'baja');

const employeeD = new employeeModule.Employee('Diana', 'S', '@Diana', 'team manager');
const employeeA = new employeeModule.Employee('Anna', 'Smith', '@anna', 'developer');
const employeeM = new employeeModule.Employee('Marie', 'Smi', '@marie', 'developer');
const employeeG = new employeeModule.Employee('Gregorie', 'House', '@House', 'designer');

Enron.addEmployee(employeeD);
Enron.addEmployee(employeeA);
Enron.addEmployee(employeeM);
Enron.addEmployee(employeeG);


const system = new systemModule.System();
system.registerEnterprise(Enron)

system.sendTicketTo('Enron', ticketToSelf, '@House', '@House');



module.exports = system