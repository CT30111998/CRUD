from rest_framework import serializers
from EmployeeApp.models import Departments, Employees

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = ('DepartmentId',
                  'DepartmentName')

        def __init__(self, *args, **kwargs):
            super(DepartmentSerializer, self).__init__(*args, **kwargs)
            self.fields['DepartmentName'].error_messages['required'] = u'My custom required msg'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ('EmployeeId',
                  'EmployeeName',
                  'Department',
                  'PhoneNo',
                  'EmpSalary',
                  'DateOfJoining',
                  'EmailId',
                  'PhotoFileName')
                  