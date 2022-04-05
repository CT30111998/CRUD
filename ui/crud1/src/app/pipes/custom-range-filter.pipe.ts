import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customRangeFilter',
})
export class CustomRangeFilterPipe implements PipeTransform {
  transform(value: any, arg1?: Date, arg2?: any) {
    // const dateRangeFilterArray = value.map(date => date.dateTime);

    if (!arg1 || !arg2) {
      return value;
    } else {
      let startDate = new Date(arg1);
      let endDate = new Date(arg2);
      console.log(arg1);
      console.log(arg2);
      let a = value.filter(
        (m: any) =>
          new Date(m.dateTime) >= startDate && new Date(m.dateTime) <= endDate
      );
      console.log(a);
      return a;
    }
  }
}
