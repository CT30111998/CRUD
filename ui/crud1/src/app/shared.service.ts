import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'http://127.0.0.1:8000/url';
  queryUrl: string = '?EmployeeName=';
  // readonly Urlapi = "http://127.0.0.1:8000/url";
  readonly PhotoUrl = 'http://127.0.0.1:8000/media/';

  constructor(private http: HttpClient) {}

  getDepList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/department/');
  }

  addDepartment(val: any) {
    return this.http.post(this.APIUrl + '/department/', val);
  }

  updateDepartment(val: any) {
    return this.http.put(this.APIUrl + '/department/', val);
  }

  deleteDepartment(val: any) {
    return this.http.delete(this.APIUrl + '/department/' + val);
  }

  getEmpList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/employee/');
  }

  // searchEmployee():Observable<any[]>{
  //   return this.http.get<any[]>(this.APIUrl + '/employee/?EmployeeName=');
  // }

  addEmployee(val: any) {
    return this.http.post(this.APIUrl + '/employee/', val);
  }

  updateEmployee(val: any) {
    return this.http.put(this.APIUrl + '/employee/', val);
  }

  deleteEmployee(val: any) {
    return this.http.delete(this.APIUrl + '/employee/' + val);
  }

  UploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/SaveFile', val);
  }

  getAllDepartmentNames(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/department/');
  }

  searchEmployee(search_text:any) {
    return this.http.get<any[]>(this.APIUrl+
      `/employee/?EmployeeName=${search_text}`
    );
  }

  paginationEmplInc(page:any){
    return this.http.get<any[]>(this.APIUrl+`/employee/?page=${page}`);
  }

  paginationEmplDes(page:any){
    return this.http.get<any[]>(this.APIUrl+`/employee/?page=1`);
  }
  

}
