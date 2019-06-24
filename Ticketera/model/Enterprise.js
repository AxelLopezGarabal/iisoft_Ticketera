const employeeModule = require('./Employee');
const workgroupModule = require('./Workgroup');
const boardModule = require('./Billboard');

/*
  Una empresa contiene:
   - una lista de todos los empleados
   - una lista con todos los grupos (sólo inormativa, ya que la pertenencia de un empleado a un grupo la defina cada empleado)
   - al crearse una empresa también se crea un grupo por defecto al cual todos los empleados van a ser agregados por default
*/
class Enterprise{
	constructor(name){
		this.name = name;
		this.employees = [];
		this.workgroups = [];
		/*
		const group = this.createWorkgroup('default');
		this.addWorkgroup(group);
		*/
	}

	getName(){
		return this.name;
	}

	isHisName(aName){
		return this.name == aName;
	}

	getEmployees(){
		return this.employees;
	}

	getWorkgroups(){
		return this.workgroups;
	}

	addEmployee(employee){
		this.employees.push(employee);
	}

	addWorkgroup(workgroup){
		this.workgroups.push(workgroup);
	}


	// EMPLOYEES & WORKGROUPS
	createEmployee(_name, _lastname, _alias, _position){
		const employee = new employeeModule.Employee(_name, _lastname, _alias, _position);
		this.addEmployee(employee);
	}

	createWorkgroup(_name){
		const board = new boardModule.Billboard();
		const workgroup = new workgroupModule.Workgroup(_name, board);
		this.addWorkgroup(workgroup);
	}

	existEmployeeWithAlias(employeeAlias){
		let res = false;
		for(var i=0; i < this.employees.length; i++){
			res = res || (this.employees[i].getAlias() == employeeAlias);
		}
		return res;
	}

	// todas las llamadas a empleado / grupo se realizan desde éste método
	getMemberByAlias(alias){
		let x = this.getEmployeeByAlias(alias);
		let member = Object.is(x, undefined) ? this.getWorkgroupByAlias(alias) : x;
		return member;
	}

	getEmployeeByAlias(employeeAlias){
		for(var i=0; i < this.employees.length; i++){
			if(this.employees[i].isHisAlias(employeeAlias)){
				return this.employees[i];
			}
		}
	}

	getWorkgroupByAlias(alias){
		for(var i=0; i < this.workgroups.length; i++){
			if(this.workgroups[i].isHisAlias(alias)){
				return this.workgroups[i];
			}
		}
	}

}

module.exports = {Enterprise};