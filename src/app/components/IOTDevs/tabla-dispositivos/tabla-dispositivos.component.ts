import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dispositivo } from 'src/app/models/dispositivos';
import { DispositivoService } from 'src/app/services/dispositivo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tabla-dispositivos',

  templateUrl: './tabla-dispositivos.component.html',
  styleUrl: './tabla-dispositivos.component.scss'
})
export class TablaDispositivosComponent implements OnInit {

  



  dispositivos: Dispositivo[] = [];
  deviceCount: number = 0;
  mostrarDispositivos: boolean = false;

  // filterDevices = '';
  filterProducts: string = '';


  constructor(private confirmationService: ConfirmationService,private toastr: ToastrService, private aRouter: ActivatedRoute, private fb: FormBuilder, private dvs: DispositivoService, private usr: UsuarioService) { }




  ngOnInit(): void {
    this.obtenerDispositivos();
  }
  obtenerDispositivos() {
    console.log("entró=>currentUser ")

    const correo = localStorage.getItem('currentUser');
    if (!correo) {
      this.toastr.error('Correo electrónico del usuario no encontrado', 'Error');
      return;
    }

    this.usr.buscaUsuarioByCorreo(correo).subscribe(
      (data: any) => {
        if (data && data.usuarioId) {
          const id = data.usuarioId;


          this.dvs.encontrarDispositivosPorUsuarioId(id).subscribe(
            data => {

              console.log("entró=>encontrarDispositivosPorUsuarioId ")
              console.log("entró=>data.usuarioId ", id)

              this.dispositivos = data;
              this.mostrarDispositivos = true;
              console.log(data);

            },
            (error) => {
              console.error('Error al obtener dispositivos:', error);
            }
          );
        } else {
          this.toastr.error('Usuario no encontrado', 'Error');
        }
      },
      (error) => {
        console.error(error);
        this.toastr.error('Error al buscar el usuario', 'Error');
      }
    );
  }


  
  mostrarConfirmacionEliminar(id: any) {
    
    alert("entro a funcion eliminar ")
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este producto?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-danger p-button-rounded p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-rounded p-button-text",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      accept: () => {
        this.eliminarDispositivo(id);
        alert("entro a funcion eliminado ")

      }
    });
  }


  eliminarDispositivo(id: any) {
    alert("entro a dispositivo eliminar ")

    this.dvs.eliminarDispositivo(id).subscribe(data => {


      this.toastr.success('El producto fue eliminado con exito', 'Producto eliminado');
      this.obtenerDispositivos();


    }, error => {

      console.error();

    })
  }

}
