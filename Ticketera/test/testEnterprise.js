var assert = require('assert');

//--------------------------------------------------------------------------------------------------------------------------------------------

const enterpriseModule = require('../model/Enterprise');
const employeeModule = require('../model/Employee');
const workgroupModule = require('../model/Workgroup');

const employee = new employeeModule.Employee("joel", "zimberman", "@Deadmau5", "producer");
const workgroup = new workgroupModule.Workgroup("#grupo", undefined);
workgroup.addMember(employee);

const name = "Aerolineas Payaso";
const enterprise = new enterpriseModule.Enterprise(name);


describe('Enterprise', function() {
    describe('#getName()', function() {
        it('should return the enterprise name', function() {
            assert.equal(enterprise.getName(), name);
        });
    });

    describe('#isHisName(name)', function() {
        it('should return true if the enterprise name is equal to the name in the parameter', function() {
            assert.equal(enterprise.isHisName(name), true);
        });
    });

    describe('#getEmployees()', function() {
        it('should return the employees in the enterprise', function() {
            assert.equal(enterprise.getEmployees().length, [].length);
        });
    });

    describe('#getWorkgroups()', function() {
        it('should return the enterprise name', function() {
            assert.equal(enterprise.getWorkgroups().length, [].length);
        });
    });

    describe('#addEmployee(employee)', function() {
        it('should add a employee to the enterprise', function() {
            enterprise.addEmployee(employee)
            assert.equal(enterprise.getEmployees().length, 1);
            assert.equal(enterprise.getEmployees()[0], employee);
        });
    });

    describe('#addWorkgroup(workgroup)', function() {
        it('should add a workgroup to the enterprise', function() {
            enterprise.addWorkgroup(workgroup),
            assert.equal(enterprise.getWorkgroups().length, 1);
            assert.equal(enterprise.getWorkgroups()[0], workgroup);
        });
    });

    describe('#addWorkgroup(workgroup)', function() {
        it('should add a workgroup to the enterprise', function() {
            assert.equal(enterprise.getWorkgroupsOfEmployeeWithAlias('@Deadmau5').length, 1);
            assert.equal(enterprise.getWorkgroupsOfEmployeeWithAlias('@Deadmau5')[0], workgroup);
            assert.equal(enterprise.getWorkgroupsOfEmployeeWithAlias('@Ghost_Producer').length, 0);
        });
    });
});