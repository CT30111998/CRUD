from django.db import models

# Create your models here.

class Departments(models.Model):
    DepartmentId = models.AutoField(primary_key=True)
    DepartmentName = models.CharField(max_length=100)
    def __str__(self):
        return self.DepartmentName

class Employees(models.Model):
    EmployeeId = models.AutoField(primary_key=True)
    EmailId = models.EmailField(max_length=200, null=True)
    PhoneNo = models.IntegerField(null=True,)
    EmpSalary = models.FloatField(null=True)
    EmployeeName = models.CharField(max_length=100)
    Department = models.CharField(max_length=100)
    DateOfJoining = models.DateField()
    PhotoFileName = models.CharField(max_length=100)
    def __str__(self):
        return self.EmployeeName

