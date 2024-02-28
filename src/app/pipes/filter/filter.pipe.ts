import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Pipe({
  name: 'filter'
})
  
export class FilterPipe implements PipeTransform {


// constructor(private toastr:ToastrService){}
  transform(value: any, arg: any): any {
  if (arg === '' || arg.length < 10){
      const resultadoProductos = [];

      for (const producto of value) {
        if (producto.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultadoProductos.push(producto);
        }
        console.log(resultadoProductos)
      }

      
    return resultadoProductos;
    }


  }

}
