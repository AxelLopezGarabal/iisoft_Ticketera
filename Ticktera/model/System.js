class System{
	constructor(employees){
		this.employees = employees;
	}

	getEmployees(){
		return this.employees;
	}

	existEmplayeeWithName(employeeName){
		let res = false;
		for(var i=0; i < this.employees.length; i++){
			res = res || (this.employees[i] == employeeName)
		}
		return res;
	}
}

module.exports = {System};