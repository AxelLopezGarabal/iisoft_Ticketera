var assert = require('assert');

const workgroupModule = require('../model/Workgroup');
const employeeModule = require('../model/Employee');
const workgroup = new workgroupModule.Workgroup();
const employee = new employeeModule.Employee('Anna', 'Smith', '@anna', 'Developer', 1509442);


describe('Workgroup', function() {
    describe('#getEmployees()', function() {
        it('should return empty array', function() {
            assert.equal(workgroup.getMembers().length, 0);
        });
    });

    describe('#getInbox()', function() {
        it('should return empty array', function() {
            assert.equal(workgroup.getInbox().length, 0);
        });
    });

    describe('#getEmployees()', function() {
        it('should return true if the array get one employee', function() {
            workgroup.addMember(employee);
            assert.equal(workgroup.getMembers().length, 1);
        });
    });

    describe('#containsEmployeeWithAlias()', function() {
        it('should return true if the array contains the employee', function() {
            assert.equal(workgroup.containsEmployeeWithAlias('@anna'), true);
            assert.equal(workgroup.containsEmployeeWithAlias('@Jp'), false);
        });
    });
});
