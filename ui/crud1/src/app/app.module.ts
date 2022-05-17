import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { ShowDepComponent } from './department/show-dep/show-dep.component';
import { AddEditDepComponent } from './department/add-edit-dep/add-edit-dep.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShowEmpComponent } from './employee/show-emp/show-emp.component';
import { AddEditEmpComponent } from './employee/add-edit-emp/add-edit-emp.component';
import { SharedService } from './shared.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PhoneFormatPipe } from './pipes/phone-format.pipe';
import { MyDiraectiveDirective } from './dir/my-diraective.directive';
import { FloDirDirective } from './dir/flo-dir.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchBynamePipe } from './pipes/search-byname.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { DateFildDirective } from './dir/date-fild.directive';
import { CustomRangeFilterPipe } from './pipes/custom-range-filter.pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { DataTablesModule } from 'angular-datatables';
import { Daterangepicker } from 'ng2-daterangepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule
} from '@angular-material-components/datetime-picker';
import { DatePipePipe } from './pipes/date-pipe.pipe'

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    ShowDepComponent,
    AddEditDepComponent,
    EmployeeComponent,
    ShowEmpComponent,
    AddEditEmpComponent,
    NavBarComponent,
    PhoneFormatPipe,
    MyDiraectiveDirective,
    FloDirDirective,
    SearchBynamePipe,
    DateFildDirective,
    CustomRangeFilterPipe,
    DatePipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    BsDatepickerModule.forRoot(),
    FilterPipeModule,
    MatInputModule,
    MatTableModule,
    DataTablesModule,
    Daterangepicker,
    NgxPaginationModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatRippleModule

  ],

  providers: [SharedService, BsDatepickerConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
