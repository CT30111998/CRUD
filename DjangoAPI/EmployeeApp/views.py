from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django_filters.utils import translate_validation
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from . import forms

from EmployeeApp.models import Departments,Employees
from EmployeeApp.serializers import DepartmentSerializer,EmployeeSerializer

from django.core.files.storage import default_storage

# Create your views here.
from .filters import employeeFilter
from .paginations import MyPagination


@csrf_exempt
def departmentApi(request,id=0):
    if request.method=='GET':
        departments = Departments.objects.all()
        departments_serializer = DepartmentSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)

    elif request.method=='POST':
        department_data=JSONParser().parse(request)
        department_serializer = DepartmentSerializer(data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        department_data = JSONParser().parse(request)
        department=Departments.objects.get(DepartmentId=department_data['DepartmentId'])
        department_serializer=DepartmentSerializer(department,data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        department=Departments.objects.get(DepartmentId=id)
        department.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
# @api_view(["GET"])
def employeeApi(request, id=0):
    if request.method == 'GET':
        paginator = MyPagination()
        query_set = Employees.objects.all()
        # context = paginator.paginate_queryset(query_set, request)
        filterset = employeeFilter(request.GET, queryset=Employees.objects.all())
        if not filterset.is_valid():
            raise translate_validation(filterset.errors)
        employees_serializer = EmployeeSerializer(filterset.qs, many=True)
        # serializer = EmployeeSerializer(context, many=True)
        return JsonResponse(employees_serializer.data, safe=False)

    # @api_view(['GET', ])
    # def employeeApi(request, id=0):
    #     if request.method == 'GET':
    #         paginator = MyPagination()
    #         query_set = Employees.objects.all()
    #         context = paginator.paginate_queryset(query_set, request)
    #         serializer = EmployeeSerializer(context, many=True)
    #         return paginator.get_paginated_response(serializer.data)

    elif request.method == 'POST':
        employee_data = JSONParser().parse(request)
        employee_serializer = EmployeeSerializer(data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)
    
    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        employee = Employees.objects.get(EmployeeId=employee_data['EmployeeId'])
        employee_serializer = EmployeeSerializer(employee, data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        employee = Employees.objects.get(EmployeeId=id)
        employee.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)


@csrf_exempt
def SaveFile(request):
    file = request.FILES['uploadedFile']
    file_name = default_storage.save(file.name, file)

    return JsonResponse(file_name, safe=False)

#DataFlair #Form #View Functions

