const systemModule = require('./model/System');
const employeeModule = require('./model/Employee');
const ticketModule = require('./model/Ticket');
const enterpriceModule = require('./model/Enterprise');
const hasherModule = require('./model/Hasher');

const hasher = new hasherModule.Hasher();

const Enron = new enterpriceModule.Enterprise('Enron');

const ticketToSelf = new ticketModule.Ticket('@House', '@House', 'it sounds folky', 
	'a random theme from Dr. House', 'pendiente', 'baja');

const employeeD = new employeeModule.Employee('Diana', 'S', '@Diana', 'team manager', hasher.hashPassword('sexo'));
const employeeA = new employeeModule.Employee('Anna', 'Smith', '@anna', 'developer', hasher.hashPassword('secreto'));
const employeeM = new employeeModule.Employee('Marie', 'Smi', '@marie', 'developer', hasher.hashPassword('dios'));
const employeeG = new employeeModule.Employee('Gregorie', 'House', '@House', 'designer', hasher.hashPassword(' '));

Enron.addEmployee(employeeD);
Enron.addEmployee(employeeA);
Enron.addEmployee(employeeM);
Enron.addEmployee(employeeG);


const system = new systemModule.System();
system.registerEnterprise(Enron)

system.sendTicketTo('Enron', ticketToSelf, '@House', '@House');



module.exports = system