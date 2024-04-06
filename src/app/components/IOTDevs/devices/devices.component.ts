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
              this.obtenerDispositivos();
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


  




}
