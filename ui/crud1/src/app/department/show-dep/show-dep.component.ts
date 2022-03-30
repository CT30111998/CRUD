import { Component, OnInit } from '@angular/core';

import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service: SharedService) { }

  DepartmentList: any = [];
  EmployeeList: any = [];

  searchedKeyword: any;

  ModalTitle: any;
  ActivateAddEditDepComp: boolean = false;
  dep: any;

  DepartmentIdFilter: string = "";
  DepartmentNameFilter: string = "";
  DepartmentListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  loadEmp() {
    this.service.getEmpList().subscribe((data: any) => {
      this.EmployeeList = data.reduce((acc: any, curr: any) => {
        if(!acc[curr.Department]) {
          acc[curr.Department] = [];
        }
        acc[curr.Department].push(curr);
        return acc;
      }, {});

      this.DepartmentList = this.DepartmentList.map((item: any) => {
        item.employees = this.EmployeeList[item.DepartmentName];
        return item;
      });
      console.log(this.DepartmentList)
    });
  }


  addClick() {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ""
    }
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepComp = true;

  }

  editClick(item: any) {
    this.dep = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteDepartment(item.DepartmentId).subscribe(data => {
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }


  refreshDepList() {
    this.service.getDepList().subscribe(data => {
      this.DepartmentList = data;
      this.loadEmp();
      this.DepartmentListWithoutFilter = data;
    });
  }

}


