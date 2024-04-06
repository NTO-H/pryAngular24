import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router, response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { Dispositivo } from 'src/app/models/dispositivos';
import { DispositivoService } from 'src/app/services/dispositivo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss'
})
export class DevicesComponent  implements OnInit{



  dispositivos: Dispositivo[] = [];
  deviceCount: number = 0;
  mostrarDispositivos: boolean = false;

  titulo = 'Agregar dispositivo';
  btnTitle = 'Agregar';



  ngOnInit(): void {
    console.log("obtenerDispositivos=>aqui ")
    this.obtenerDispositivos();
  }





  
  sidebarVisible2: boolean = false;
  frmCrearDev: FormGroup;
      id: string | null;

  constructor(private toastr: ToastrService, private aRouter:ActivatedRoute,private fb: FormBuilder,private dvs:DispositivoService,private usr:UsuarioService) {
  
    
    this.frmCrearDev = this.fb.group({
      deviceName: ['', Validators.required],
      deviceLabel: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');

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
            (data: Dispositivo[]) => {
              
              console.log("entró=>encontrarDispositivosPorUsuarioId ")
              console.log("entró=>data.usuarioId ", id)

              this.dispositivos = data;
              this.deviceCount = this.dispositivos.length;
              this.mostrarDispositivos = true;
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
                this.frmCrearDev.reset();

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
    this.sidebarVisible2 = true;
    this.id = _id;
    console.log("esEditar", _id)
    if (_id) {
      this.titulo = 'Editar Dispositivo';
      this.btnTitle = 'Actualizar';
      this.dvs.obtenerDispositivo(_id).subscribe((data) => {
        this.frmCrearDev.setValue(
          {
            deviceName: data.deviceName,
            deviceLabel: data.deviceLabel,
            // userId: data.usuarioId

          })
      })
    }
  }



}
