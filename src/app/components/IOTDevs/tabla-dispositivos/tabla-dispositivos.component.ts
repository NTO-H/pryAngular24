import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  

  // listProductos: Producto[] = [];
  // filterProducts = '';
  frmCrearDev!: FormGroup;
  id!: string | null;




  titulo = 'Agregar dispositivo';
  btnTitle = 'Agregar';


  sidebarVisible2: boolean = false;

  dispositivos: Dispositivo[] = [];
  deviceCount: number = 0;
  mostrarDispositivos: boolean = false;

  // filterDevices = '';
  filterProducts: string = '';


  constructor(private confirmationService: ConfirmationService,private toastr: ToastrService, private aRouter: ActivatedRoute, private fb: FormBuilder, private dvs: DispositivoService, private usr: UsuarioService) { 


    this.frmCrearDev = this.fb.group({
      deviceName: ['', Validators.required],
      deviceLabel: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }




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
    // console.log("id del dispositivo a eliminar=>", id)

    // alert("entro a funcion eliminar ")
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este dispositivo?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-danger p-button-rounded p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-rounded p-button-text",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      accept: () => {
        this.eliminarDispositivo(id);
        // alert("entro a funcion eliminado ")

      }
    });
  }


  eliminarDispositivo(id: any) {
    // alert("entro a dispositivo eliminar ")

    this.dvs.eliminarDispositivo(id).subscribe(data => {


      this.toastr.success('El producto fue eliminado con exito', 'Producto eliminado');
      this.obtenerDispositivos();


    }, error => {

      console.error();

    })
  }

  crearDispositivo() {
    const correo = localStorage.getItem('currentUser');

    if (!correo) {
      this.toastr.error('Correo electrónico del usuario no encontrado', 'Error');
      return;
    }

    this.usr.buscaUsuarioByCorreo(correo).subscribe(
      (data: any) => {
        if (data && data.usuarioId) {
          const DEVICE: Dispositivo = {
            deviceName: this.frmCrearDev.get('deviceName')?.value,
            deviceLabel: this.frmCrearDev.get('deviceLabel')?.value,
            userId: data.usuarioId
          };

          // Aquí puedes verificar si hay un ID proporcionado (para saber si se está editando o creando)
          if (this.id !== null) {
            this.dvs.editarDispositivo(this.id, DEVICE).subscribe(
              () => {
                this.sidebarVisible2 = false;

                this.toastr.success('Dispositivo actualizado correctamente');
                this.obtenerDispositivos();
                this.frmCrearDev.reset();

              },
              
              (error) => {
                console.error(error);
                this.toastr.error('Ocurrió un error al actualizar el dispositivo');
              }
            );
          } else {
            this.dvs.crearDispositivo(DEVICE).subscribe(
              () => {
                this.sidebarVisible2 = false;

                this.toastr.success('Dispositivo registrado con éxito', 'Registro exitoso');
                this.obtenerDispositivos();
                this.frmCrearDev.reset();

              },
              (error) => {
                console.error(error);
                this.toastr.error('Ocurrió un error al registrar el dispositivo', 'Error');
              }
            );
          }
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



  editar(_id: any) {
    // this.position = position;
    // this.visible = true;
    this.sidebarVisible2 = true;

    this.id = _id;
    console.log("esEditar", _id)
    if (_id) {
      this.titulo = 'Editar Dispositivo';
      this.btnTitle = 'Actualizar';
      this.dvs.obtenerDispositivo(_id).subscribe((data) => {
        this.frmCrearDev.setValue(
          {
            deviceName:data.deviceName,
            deviceLabel: data.deviceLabel,
            userId: data.usuarioId

            
          })
      })
    }
  }

}
