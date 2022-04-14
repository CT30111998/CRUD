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

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css'],
})
export class ShowEmpComponent implements OnInit {
  formGrp!: FormGroup;
  no=0;

  EmployeeList: any = [];

  constructor(
    private service: SharedService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.formGrp = this.fb.group({
      collection: this.fb.array([]),
    });
  }
  

  DepartmentsList: any = [];

  selected: any;
  search1: any;

  page: any;
  p: any;

  startDate: any;
  selectedMembers: any;
  mydate: any;

  ModalTitle: any;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  ngOnInit(): void {
    this.refreshEmpList();
  }


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
      this.addCullection();
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
      this.formGrp = data;
      console.log(this.EmployeeList);
    });
  }



  //**********for FormArray *********** */
  addCullection() {
    this.service.getEmpList().subscribe((collection: any) => {
      this.formGrp = collection
    });
    console.log(this.formGrp.value)
  }
  

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
    console.log(item);
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
