import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';//son librerias que sirven para el diseño de alertas
import { ActivatedRoute, Router } from '@angular/router';

import { ProductoService } from 'src/app/services/producto.service';
// import { ButtonModule } from 'primeng/button'; 
import { ButtonModule } from 'primeng/button'; // Import the ButtonModule
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-cards-productos',
  templateUrl: './cards-productos.component.html',
  styleUrls: ['./cards-productos.component.css']
})
export class CardsProductosComponent implements OnInit {



  
  id: string | null;

  // constructor() { }
  isLoading=true;//variable rastreador de carga de productos
  listProductos:Producto[]=[];
  filterProducts = '';

  //inicio imagen

  photoSelected: string | ArrayBuffer|null=null;
  file: File | null = null;
  
  ngOnInit() {
    this.obtenerProductos();
this.cargarProductos();
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
  constructor(private _productoService: ProductoService, private toastr: ToastrService, private aRouter: ActivatedRoute)
  {
    this.cargarProductos(),
    this.id = this.aRouter.snapshot.paramMap.get('id');

  }
  cargarProductos(){
    this.isLoading=true;//comienza la carga/el isLoading esta en true
    this._productoService.getProductos().subscribe(data=>{
      this.listProductos=data;
      this.isLoading=false;//carga de productos/el isLisLoadingoader cambia a false
     } , error => {
        console.error('Error cargando productos', error);
        this.isLoading = false;  // hubo un error cargando los datos, entonces configura isLoading como false
    });
    // this.id = this.aRouter.snapshot.paramMap.get('id');
    };
  
  obtenerProductos(){

    this._productoService.getProductos().subscribe(data=>{

      this.listProductos=data;
      console.log(data);
    },error =>{
      
      console.log("ocurrio un error al obtener la información");
    })
    
  }
}
