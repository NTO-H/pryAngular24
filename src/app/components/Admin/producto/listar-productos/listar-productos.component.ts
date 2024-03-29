import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { Component, Injectable, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';//son librerias que sirven para el diseño de alertas
// import { ToastrService } from 'ngx-toastr';//son librerias que sirven para el diseño de alertas
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})

export class ListarProductosComponent implements OnInit{

  listProductos:Producto[]=[];
  filterProducts = '';
  





  
  // imagen inicio

  photoSelected: string | ArrayBuffer|null=null;
  file: File | null = null;
  
  // ngOnInit() {
  //   this.obtenerProductos();

  // }
  
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
  ngOnInit():void{
    this.obtenerProductos();
    // this.detalleProductoById();
  }


  obtenerProductos(){
    this._productoService.getProductos().subscribe(data=>{
      this.listProductos=data;
      console.log(data);
    },error =>{
      console.log("ocurrio un error al obtener la información");
    }) 
  }

  eliminarProducto(id:any){

    this._productoService.eliminarProducto(id).subscribe(data=>{


    this.toastr.success('El producto fue eliminado con exito','Producto eliminado');
    this.obtenerProductos();

    },error=>{

      console.error();
      
    })
  }
  
}


