import django_filters

from EmployeeApp.models import Departments,Employees


class employeeFilter(django_filters.FilterSet):
    class Meta:
        model = Employees
        fields = ['EmployeeName']