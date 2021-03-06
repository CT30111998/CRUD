import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  submit = false;
  constructor(private service: SharedService) { }

  EmployeeName = new FormControl('', [Validators.required, Validators.minLength(2)]);
  EmailId = new FormControl('', [Validators.required, Validators.email]);
  Department = new FormControl('', [Validators.required]);
  DateOfJoining = new FormControl('', [Validators.required]);
  PhoneNo = new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]{10,}'),
  Validators.minLength(10), Validators.maxLength(10)]);
  EmpSalary = new FormControl('',[Validators.required]);


  frgForm = new FormGroup({
    EmployeeName: this.EmployeeName,
    EmailId: this.EmailId,
    Department: this.Department,
    DateOfJoining: this.DateOfJoining,
    PhoneNo: this.PhoneNo,
    EmpSalary: this.EmpSalary,
  })




  @Input() emp: any;
  EmployeeId: any;
  PhotoFileName: any;
  ImgPath: any;

  DepartmentsList: any = [];

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList() {
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentsList = data;
      console.log(this.emp);
      this.frgForm.patchValue(this.emp);
      this.EmployeeId = this.emp.EmployeeId;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.ImgPath = this.service.PhotoUrl + this.PhotoFileName;
    });
  }

  addEmployee() {
    this.submit = true;
    if (this.frgForm.invalid) {
      return;
    }
    var val = {
      ...this.frgForm.value,
      PhotoFileName: this.PhotoFileName
    };

    this.service.addEmployee(val).subscribe(res => {

      alert(res.toString());
    });
  }

  get f() { return this.frgForm.controls; }

  updateEmployee() {
    this.submit = true;
    if (this.frgForm.invalid) {
      return;
    }
    var val = {
      EmployeeId: this.EmployeeId,
      ...this.frgForm.value,
      PhotoFileName: this.PhotoFileName
    };

    this.service.updateEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }


  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.ImgPath = this.service.PhotoUrl + this.PhotoFileName;
    })
  }

}

