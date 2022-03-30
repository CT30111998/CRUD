import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByname'
})
export class SearchBynamePipe implements PipeTransform {

  transform(value: any, input:any): any {
    if (input) {
      return value.filter((val:any) => val.indexOf(input) >=0 ); 
    }else {
      return value;
    }
  }

}
