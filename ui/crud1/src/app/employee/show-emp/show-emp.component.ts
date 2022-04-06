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

  EmployeeList: any = [];
  
  displayedColumns: string[] = ['EmployeeId', 'EmployeeName', 'EmailId', 'PhoneNo', 'Department', 'Salary','founded'];

  dataSource = new MatTableDataSource(this.EmployeeList);
  pipe: DatePipe;
  
  

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  
  constructor(private service: SharedService) {
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data:any, _filter) => {
      if (this.fromDate && this.toDate) {
        return data.created >= this.fromDate && data.created <= this.toDate;
      }
      return true;
    };
  }
  get fromDate() {
    return this.filterForm.get('fromDate')?.value;
  }
  get toDate() {
    return this.filterForm.get('toDate')?.value;
  }
  
 
  DepartmentsList: any = [];

  selected: any;
  
  startDate: any;
  endDate: any;
  selectedMembers:any;
  mydate:any;

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
      this.addFilter()
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

  //for load Employee from database
  loadEmployee() {
    this.service.getEmpList().subscribe((data: any) => {
      this.EmployeeList = data;
      // console.log(this.EmployeeList);
    });
  }

  //short by date logic
  // dateFilterChanged(bsRangeValue: string) {
  //   // console.log('filterValue', bsRangeValue);
  //   const startDate = new Date(bsRangeValue[0]);
  //   const endDate = new Date(bsRangeValue[1]);
  //   // console.log(startDate, 'dd-MM-yyyy');
  //   // console.log(endDate, 'dd-MM-yyyy');
  // }

  dateRangeCreated($event: any) {
    let startDate = $event[0].toJSON().split('T')[0];

    let endDate = $event[1].toJSON().split('T')[0];

    this.selectedMembers = this.EmployeeList.filter(
      (m: any) =>
        new Date(m.CreatedDate) >= new Date(startDate) &&
        new Date(m.CreatedDate) <= new Date(endDate)
    );
    console.log(this.selectedMembers)
    console.log(startDate);
    console.log(endDate);
  }


  applyFilter() {
    this.dataSource.filter = '' + Math.random();
    // console.log(this.dataSource)
    console.log(this.EmployeeList)
    
  }

  addFilter(){
    this.service.getEmpList().subscribe((data: any) => {
      this.mydate = data.filter(function(Employee1:any){
        return Employee1.DateOfJoining == '2022-03-12'
      });
      console.log(this.mydate);
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
