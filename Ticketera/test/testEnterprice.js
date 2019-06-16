var assert = require('assert');

//--------------------------------------------------------------------------------------------------------------------------------------------

const enterpriceModule = require('../model/Enterprice');
const employeeModule = require('../model/Employee');
const workgroupModule = require('../model/Workgroup');

const employee = new employeeModule.Employee("joel", "zimberman", "@Deadmau5", "producer");
const workgroup = new workgroupModule.Workgroup("#grupo", undefined);

const name = "Aerolineas Payaso";
const enterprice = new enterpriceModule.Enterprice(name);


describe('Enterprice', function() {
    describe('#getName()', function() {
        it('should return the enterprice name', function() {
            assert.equal(enterprice.getName(), name);
        });
    });

    describe('#isHisName(name)', function() {
        it('should return true if the enterprice name is equal to the name in the parameter', function() {
            assert.equal(enterprice.isHisName(name), true);
        });
    });

    describe('#getEmployees()', function() {
        it('should return the employees in the enterprice', function() {
            assert.equal(enterprice.getEmployees().length, [].length);
        });
    });

    describe('#getWorkgroups()', function() {
        it('should return the enterprice name', function() {
            assert.equal(enterprice.getWorkgroups().length, [].length);
        });
    });

    describe('#addEmployee(employee)', function() {
        it('should add a employee to the enterprice', function() {
            enterprice.addEmployee(employee)
            assert.equal(enterprice.getEmployees().length, 1);
            assert.equal(enterprice.getEmployees()[0], employee);
        });
    });

    describe('#()', function() {
        it('should return the enterprice name', function() {
            enterprice.addWorkgroup(workgroup),
            assert.equal(enterprice.getWorkgroups().length, 1);
            assert.equal(enterprice.getWorkgroups()[0], workgroup);
        });
    });
});