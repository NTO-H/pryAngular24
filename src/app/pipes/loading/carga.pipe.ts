import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carga'
})
export class CargaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
