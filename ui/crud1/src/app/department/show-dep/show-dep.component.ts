import { Component, OnInit } from '@angular/core';
import { groupBy } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { debounce } from "lodash";

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service: SharedService) { }

  DepartmentList: any = [];
  EmployeeList: any = [];

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

  FilterFn() {
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el: any) {
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      ) &&
        el.DepartmentName.toString().toLowerCase().includes(
          DepartmentNameFilter.toString().trim().toLowerCase()
        )
    });
  }

}


