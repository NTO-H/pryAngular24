import { FormGroup, FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { Component, Injectable, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';//son librerias que sirven para el diseño de alertas
// import { ToastrService } from 'ngx-toastr';//son librerias que sirven para el diseño de alertas
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { ConfirmationService } from 'primeng/api';
import { Dispositivo } from 'src/app/models/dispositivos';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DispositivoService } from 'src/app/services/dispositivo.service';
@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})

export class ListarProductosComponent implements OnInit{

  listProductos:Producto[]=[];
  filterProducts = '';
  frmCrearDev!: FormGroup;
  id!: string | null;
  // imagen inicio
  photoSelected: string | ArrayBuffer|null=null;
  file: File | null = null;
  sidebarVisible2: boolean = false;

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
  crearDispositivo() {
    // Obtener el correo electrónico del usuario en el navegador
    const correo = localStorage.getItem('currentUser');

    // Verificar si se obtuvo el correo electrónico del usuario
    if (!correo) {
      // Manejar el caso en el que el correo electrónico es nulo o no se encontró en el localStorage
      this.toastr.error('Correo electrónico del usuario no encontrado', 'Error');
      return; // Salir del método
    }

    // Buscar el ID del usuario por su correo electrónico
    this.usr.buscaUsuarioByCorreo(correo).subscribe(
      (data: any) => {
        // Verificar si se encontró el usuario
        if (data && data.usuarioId) {
          // Crear el objeto Dispositivo con el ID del usuario
          const DEVICE: Dispositivo = {
            deviceName: this.frmCrearDev.get('deviceName')?.value,
            deviceLabel: this.frmCrearDev.get('deviceLabel')?.value,
            userId: data.usuarioId // Incluir el ID del usuario en el dispositivo
          };

          // Enviar el objeto Dispositivo al backend para su creación
          this.dvs.crearDispositivo(DEVICE).subscribe(
            () => {
              this.toastr.success('Producto registrado con éxito!', 'Registró exitoso');
            },
            () => {
              this.toastr.error('Error al guardar!', 'Registró fallido');
            }
          );
        } else {
          // Manejar el caso en el que no se encontró el usuario
          this.toastr.error('Usuario no encontrado', 'Error');
        }
      },
      (error) => {
        // Manejar errores de la solicitud de búsqueda del usuario
        console.error(error);
        this.toastr.error('Error al buscar el usuario', 'Error');
      }
    );
  }
  // imagen fin
  constructor(private dvs: DispositivoService, private usr:UsuarioService,private _productoService: ProductoService, private toastr: ToastrService, private confirmationService: ConfirmationService) {}
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


  mostrarConfirmacionEliminar(id: any) {
    console.log("id del dispositivo a eliminar=>",id)
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este producto?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-danger p-button-rounded p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-rounded p-button-text",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      accept: () => {
        this.eliminarProducto(id);
      }
    });
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


