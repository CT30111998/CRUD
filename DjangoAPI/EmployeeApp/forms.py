from django import forms

class Department(forms.Form):
    DepartmentName = forms.CharField(initial="Department Name", required=True)

class Employees(forms.Form):
    EmailId = forms.EmailField(help_text="Write your Email", required=True)
    PhoneNo = forms.IntegerField(required=True, min_value=10, max_value=10)
    EmpSalary = forms.FloatField(required=True,)
    EmployeeName = forms.CharField(initial="First name", required=True)
    Department = forms.CharField(help_text="Department is req", required=True)
    DateOfJoining = forms.DateField(help_text="date is here", required=True)
    PhotoFileName= forms.CharField(help_text="photo is here", required=True)
