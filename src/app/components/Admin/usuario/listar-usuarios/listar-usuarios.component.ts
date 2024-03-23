import { Component, Injectable, OnInit } from '@angular/core';

import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
// import { Component, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';//son librerias que sirven para el diseño de alertas
// import { ToastrService } from 'ngx-toastr';//son librerias que sirven para el diseño de alertas
import { Producto } from 'src/app/models/producto';
import { Usuario } from 'src/app/models/usuario';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  listUsuarios: Usuario[] = [];
  // filterProducts = '';
  filterProducts: string = '';






  // imagen inicio

  photoSelected: string | ArrayBuffer | null = null;
  file: File | null = null;

  // ngOnInit() {
  //   this.obtenerProductos();

  // }6666666

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
  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.obtenerUsuarios();
    // this.detalleProductoById();
  }


  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.listUsuarios = data;
      console.log(data);
    }, error => {
      console.log("ocurrio un error al obtener la información");
    })
  }


  //   detalleProductoById(id: any) {

  //     this._productoService.detalleProductoById(id).subscribe(data=>{

  //   // this.detalleProductoById(id);
  //   this.listProductos=data;
  // })

  //   }

  eliminarUsuario(id: any) {

    this.usuarioService.eliminarUsuario(id).subscribe(data => {


      this.toastr.success('El usuario fue eliminado con exito', 'Usuario eliminado');
      this.obtenerUsuarios();

    }, error => {

      console.error();

    })
  }

}


