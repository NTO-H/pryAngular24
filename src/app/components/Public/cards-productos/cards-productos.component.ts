import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';//son librerias que sirven para el diseño de alertas

import { ProductoService } from 'src/app/services/producto.service';
// import { ButtonModule } from 'primeng/button'; 
import { ButtonModule } from 'primeng/button'; // Import the ButtonModule

@Component({
  selector: 'app-cards-productos',
  templateUrl: './cards-productos.component.html',
  styleUrls: ['./cards-productos.component.css']
})
export class CardsProductosComponent implements OnInit {

  // constructor() { }
  listProductos:Producto[]=[];
  filterProducts = '';

  //inicio imagen

  photoSelected: string | ArrayBuffer|null=null;
  file: File | null = null;
  
  ngOnInit() {
    this.obtenerProductos();

  }
  
  onPhotoSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files && files[0]) {
      this.file = files[0];
      // Image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    }
  }


  // imagen fin
constructor(private _productoService:ProductoService,private toastr:ToastrService) {}
  
  obtenerProductos(){

    this._productoService.getProductos().subscribe(data=>{

      this.listProductos=data;
      console.log(data);
    },error =>{
      
      console.log("ocurrio un error al obtener la información");
    })
    
  }

}
