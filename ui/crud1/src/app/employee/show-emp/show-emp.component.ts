import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css'],
})
export class ShowEmpComponent implements OnInit {
  EmployeeList: any = [];

  constructor(private service: SharedService) {}

  DepartmentsList: any = [];

  selected: any;

  startDate: any;
  selectedMembers: any;
  mydate: any;

  ModalTitle: any;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

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
      console.log(this.EmployeeList);
    });
  }

  //*************static way to filter date****************
  SendDataonChange(event: any) {
    this.mydate = this.EmployeeList.filter(function (Employee1: any) {
      return Employee1.DateOfJoining == event.target.value;
    });
    console.log(this.mydate);
    console.log(event.target.value);
  }
  reloadPage() {
    window.location.reload();
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
