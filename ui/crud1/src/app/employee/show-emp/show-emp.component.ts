import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service: SharedService) { }

  EmployeeList: any = [];

  ModalTitle: any;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  //for gate data from databases
  refreshEmpList() {
    this.service.getEmpList().subscribe(data => {
      this.EmployeeList = data;
    });
  }

  //For add new fild
  addClick() {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: "",
      EmailId: "",
      PhoneNo: "",
      Department: "",
      Salary:"",
      DateOfJoining: "",
      PhotoFileName: "",
    }
    this.ModalTitle = "Add Employees";
    this.ActivateAddEditEmpComp = true;
  }

  //For Add in current Fild
  editClick(item: any) {
    console.log(item);
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }

  //for delete
  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteEmployee(item.EmployeeId).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  //for Time
  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }




}
