import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { MyModel } from 'src/app/models/my-model.model';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css'],
})
export class ShowEmpComponent implements OnInit {
  formGrp!: FormGroup;
  MyEmp: MyModel[] = [];

  EmployeeList: any = [];

  constructor(private service: SharedService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.refreshEmpList();
    this.formGrp = this.fb.group({
      employeeArray: this.fb.array([]),
    });

    this.service.getEmpList().subscribe((data1: MyModel[]) => {
      // console.log(JSON.stringify(data1, null , 2));

      const newList: MyModel[] = [];
      data1.forEach((benefit: MyModel) => {
        newList.push(benefit);
      });

      const fa = this.formGrp.controls['employeeArray'] as FormArray;

      newList.forEach((b: MyModel) => {
        fa.push(
          this.getEmployees(
            b.EmployeeId,
            b.EmployeeName,
            b.EmpSalary,
            b.DateOfJoining,
            b.EmailId,
            b.Department,
            b.PhoneNo,
            b.PhotoFileName
          )
        );
      });
      console.log(this.formGrp.value);
    });
  }
  getEmployees(
    EmployeeId: any,
    EmployeeName: any,
    EmpSalary: any,
    DateOfJoining: any,
    EmailId: any,
    Department: any,
    PhoneNo: any,
    PhotoFileName: any
  ): FormGroup {
    return new FormGroup({
      EmployeeId: new FormControl(EmployeeId),
      EmployeeName: new FormControl(EmployeeName),
      EmpSalary: new FormControl(EmpSalary),
      DateOfJoining: new FormControl(DateOfJoining),
      EmailId: new FormControl(EmailId),
      Department: new FormControl(Department),
      PhoneNo: new FormControl(PhoneNo),
      PhotoFileName: new FormControl(PhotoFileName),
    });
  }

  DepartmentsList: any = [];

  selected: any;
  search1: any;

  page: any;

  mydate: any;

  ModalTitle: any;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  // const collection = this.mydate.get('collection');
  // if (!collection.value.includes(val)) {
  //   collection.push(this.fb.control(val));
  // }
  // console.log(collection);

  public valueSelected() {
    this.DepartmentsList = this.DepartmentsList.DepartmentName.filter(
      (item: any) => item.name === this.selected
    );
  }

  //for gate data from databases
  refreshEmpList() {
    this.service.getEmpList().subscribe((data) => {
      this.loadDepartmentList();
      this.loadEmployee();

      // this.addEmployee();
      // this.dateFilterChanged(this.EmployeeList);
      this.EmployeeList = data;
    });
  }

  //For add new fild
  addClick() {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: '',
      EmailId: '',
      PhoneNo: '',
      Department: '',
      Salary: '',
      DateOfJoining: '',
      PhotoFileName: '',
    };
    this.ModalTitle = 'Add Employees';
    this.ActivateAddEditEmpComp = true;
  }

  //load dept
  loadDepartmentList() {
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentsList = data;
      // console.log(this.DepartmentsList);
    });
  }

  // for load Employee from database
  loadEmployee() {
    this.service.getEmpList().subscribe((data: any) => {
      this.EmployeeList = data;
      this.mydate = data;
      // console.log(this.EmployeeList);
    });
  }

  //**********for FormArray *********** */

  //**********search from data base*************

  searchEmp(search: any) {
    this.service.searchEmployee(search).subscribe((data: any) => {
      this.mydate = data;
    });
    // console.log(search);
  }

  //*************static way to filter date****************
  SendDataonChange(event: any) {
    this.mydate = this.EmployeeList.filter(function (Employee1: any) {
      return Employee1.DateOfJoining == event.target.value;
    });
    // console.log(this.mydate);
    // console.log(event.target.value);
  }

  //************Pagination For emp */******************& */
  paginationInc(page: any) {
    this.service.paginationEmplInc(page).subscribe((data: any) => {
      this.mydate = data;
    });
    // console.log(page)
  }

  paginationincDec(page: any) {
    this.service.paginationEmplDes(page).subscribe((data: any) => {
      this.mydate = data;
    });
  }

  // loadEmp() {
  //   this.service.getEmpList().subscribe((data: any) => {
  //     this.EmployeeList = data.reduce((acc: any, curr: any) => {
  //       if(!acc[curr.Department]) {
  //         acc[curr.Department] = [];
  //       }
  //       acc[curr.Department].push(curr);
  //       return acc;
  //     }, {});

  //     this.DepartmentList = this.DepartmentList.map((item: any) => {
  //       item.employees = this.EmployeeList[item.DepartmentName];
  //       return item;
  //     });
  //     console.log(this.DepartmentList)
  //   });
  // }

  //For Add in current Fild
  editClick(item: any) {
    // console.log(item);
    this.emp = item;
    this.ModalTitle = 'Edit Employee';
    this.ActivateAddEditEmpComp = true;
  }

  //for delete
  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteEmployee(item.EmployeeId).subscribe((data) => {
        alert(data.toString());
        this.refreshEmpList();
      });
    }
  }

  //for Time
  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }
}
