import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css'],
})
export class ShowEmpComponent implements OnInit {
  constructor(private service: SharedService) {}

  EmployeeList: any = [];
  DepartmentsList: any = [];

  selected: any;
  bsRangeValue: any;
  startDate: any;
  endDate: any;

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
      console.log(this.DepartmentsList);
    });
  }

  //for load Employee from database
  loadEmployee() {
    this.service.getEmpList().subscribe((data: any) => {
      this.EmployeeList = data;
      console.log(this.EmployeeList);
    });
  }

  //short by date logic
  dateFilterChanged(bsRangeValue: string) {
    // console.log('filterValue', bsRangeValue);
    const startDate = new Date(bsRangeValue[0]);
    const endDate = new Date(bsRangeValue[1]);
    // console.log(startDate, 'dd-MM-yyyy');
    // console.log(endDate, 'dd-MM-yyyy');
  }

  // dateRangeCreated($event:any) {
  //   this.EmployeeList = this.EmployeeList;

  //   let startDate = $event[0].toJSON().split('T')[0];

  //   let endDate = $event[1].toJSON().split('T')[0];

  //   this.EmployeeList = this.EmployeeList.filter(
  //     (m:any) =>
  //       new Date(m.CreatedDate) >= new Date(startDate) &&
  //       new Date(m.CreatedDate) <= new Date(endDate)
  //   );
  //   console.log(startDate)
  //   console.log(endDate)
  // }

  // reverseAndTimeStamp(dateString: any) {
  //   const reverse = new Date(dateString.split('-').reverse().join('-'));
  //   return reverse.getTime();
  // }

  // selectedMembers = this.EmployeeList.filter((m:any) => {
  //   return (
  //     this.reverseAndTimeStamp(m.date) > this.reverseAndTimeStamp(this.startDate) &&
  //     this.reverseAndTimeStamp(m.date) < this.reverseAndTimeStamp(this.endDate)
  //   );

  // });

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
