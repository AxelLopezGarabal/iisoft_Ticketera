class Enterprise{
	constructor(name){
		this.name = name;
		this.employees = [];
		this.workgroups = [];
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

}

module.exports = {Enterprise};