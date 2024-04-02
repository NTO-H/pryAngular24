import { ConsultasService } from './../../../services/consultas.service';



import { MatSliderModule } from '@angular/material/slider';
import { Console } from 'console';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { mensageservice } from 'src/app/services/mensage.service';
import { Router } from 'express';

import { DispositivoService } from 'src/app/services/dispositivo.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Dispositivo } from 'src/app/models/dispositivos';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.scss'
})
export class DashboardsComponent implements OnInit {
  @Input() imagen!: string;
  @Input() imagen2!: string;
  @Input() alt!: string;
  temperatura: number = 25;
  sidebarVisible3: boolean = false;

  dispositivos: Dispositivo[] = [];
  deviceCount: number = 0;
  mostrarDispositivos: boolean = false;
  selectedDeviceName: string='';
  // console.log(sidebarVisible3.value);

  humedad: number = 0; // Valor inicial de la humedad
  // humedad: number = 0; // Valor inicial de la humedad
  humedadOptions = [
    { value: 0, label: '0%', icon: 'fas fa-tint' }, // Icono de gota de agua para 0%
    { value: 25, label: '25%', icon: 'fas fa-tint' }, // También puedes usar el mismo icono para todos los valores
    { value: 50, label: '50%', icon: 'fas fa-tint' },
    { value: 75, label: '75%', icon: 'fas fa-tint' },
    { value: 100, label: '100%', icon: 'fas fa-tint' }
  ];
  // Declaración de la propiedad style con un objeto que cumple con el tipo esperado
  sidebarStyle: { [klass: string]: any } = { heig: '50%', width: '100%', textAlign: 'center' };
  // height:50%; width:100%; text-align: center; z-index: 1102;
  isChecked!: boolean;
  isCheckedValancin!: boolean;
  isCheckedCarrucel!: boolean;
  isCheckedMusica!: boolean;


  // sidebarVisible3: boolean = false;
  constructor(private aRouter: ActivatedRoute, private fb: FormBuilder, private dvs: DispositivoService, private usr:UsuarioService,private consultaService: ConsultasService, private dispositivoService: DispositivoService, private toastr: ToastrService, private formBuilder: FormBuilder) {

  }
   
  
  
  
  updateSelectedDevice() {
    console.log('Dispositivo seleccionado:', this.selectedDeviceName);
    this.obtenerEstadoLed();
    this.obtnerEstadoVancin();
    this.obtenerEstadoCarrucel();
    this.obtenerEstadoMusica();
    this.obtenerEstadoTempHume();
    this.obtenerDispositivos();
  }


  copiarClave() {
    // Obtener el valor del input
    const claveInput = document.getElementById('keyInput') as HTMLInputElement;
    claveInput.select();
    document.execCommand('copy');
  }


  items: MenuItem[] | undefined;


  
//FIXME -  obtener dispositivos para select
  



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
//FIXME - 
  




  ngOnInit(): void {
    this.obtenerEstadoLed();
    this.obtnerEstadoVancin();
    this.obtenerEstadoCarrucel();
    this.obtenerEstadoMusica();
    this.obtenerEstadoTempHume();
    this.obtenerDispositivos();
  }

  toggleSwitch() {
    this.isChecked = !this.isChecked;
    const valor = this.isChecked ? 1 : 0;
    const dvName = this.selectedDeviceName;
    console.log(dvName)
    this.cambiaEstadoLed(valor, dvName);
    this.obtenerDispositivos()
  }

  toggleSwitchValanin() {
    this.isCheckedValancin = !this.isCheckedValancin;
    const valorValancin = this.isCheckedValancin ? 1 : 0;
    const dvName = this.selectedDeviceName;

    this.cambiaEstadoValancin(valorValancin, dvName);
  }

  toggleSwitchCarrucel() {
    this.isCheckedCarrucel = !this.isCheckedCarrucel;
    const valorCarrucel = this.isCheckedCarrucel ? 1 : 0;
    const dvName = this.selectedDeviceName;

    console.log("valor del Carrucel=>", valorCarrucel);
    this.cambiaEstadoCarrucel(valorCarrucel, dvName);
  }
  toggleSwitchMusica() {
    this.isCheckedMusica = !this.isCheckedMusica;
    const valorMusica = this.isCheckedMusica ? 1 : 0;
    const dvName = this.selectedDeviceName;

    console.log("valor del Musica=>", valorMusica);

    this.cambiaEstadoMusica(valorMusica, dvName);
  }
  getIconoHumedad(humedad: number): string {
    if (humedad === 0) {
      return 'icono-0';
    } else if (humedad <= 25) {
      return 'icono-25';
    } else if (humedad <= 50) {
      return 'icono-50';
    } else if (humedad <= 75) {
      return 'icono-75';
    } else {
      return 'icono-100';
    }
  }

  cambiaEstadoLed(valor: number,dvName:string) {
    this.dispositivoService.editarDispositivoLed(valor, dvName).subscribe(
      (response) => {
        // Manejar la respuesta del servidor si es necesario
        this.toastr.success('Estado del LED actualizado correctamente');
      },
      (error) => {
        this.toastr.error('Error al actualizar el estado del LED');
        console.error('Error al actualizar el estado del LED:', error);
      }
    );
  }
  cambiaEstadoValancin(valor: number, dvName: string) {
    this.dispositivoService.editarDispositivoValancin(valor, dvName).subscribe(
      (response) => {
        // Manejar la respuesta del servidor si es necesario
        this.toastr.success('Estado del valancin actualizado correctamente');
      },
      (error) => {
        this.toastr.error('Error al actualizar el estado del valancin ');
        console.error('Error al actualizar el estado del valancin:', error);
      }
    );
  }
  cambiaEstadoCarrucel(valor: number,dvName: string) {
    this.dispositivoService.editarDispositivoCarrucel(valor, dvName).subscribe(
      (response) => {
        // Manejar la respuesta del servidor si es necesario
        this.toastr.success('Estado del carrucel actualizado correctamente');
      },
      (error) => {
        this.toastr.error('Error al actualizar el estado del carrucel ');
        console.error('Error al actualizar el estado del carrucel:', error);
      }
    );
  }


  cambiaEstadoMusica(valor: number, dvName: string) {
    this.dispositivoService.editarEstadoMusica(valor, dvName).subscribe(
      (response) => {
        // Manejar la respuesta del servidor si es necesario
        this.toastr.success('Estado del musica actualizado correctamente');
      },
      (error) => {
        this.toastr.error('Error al actualizar el estado del musica ');
        console.error('Error al actualizar el estado del musica:', error);
      }
    );
  }
  // tipo get
  obtenerEstadoTempHume() {
    const dvName = this.selectedDeviceName;

    this.dispositivoService.getTempHum(dvName).subscribe(
      (response) => {
        // Asignar los valores de humedad y temperatura
        this.humedad = response.humedad;
        this.temperatura = response.temperatura;

        // Cambiar la imagen en función de los valores de humedad y temperatura
        if (this.humedad > 75) {
          this.alt = 'Humedad alta';
        } else if (this.humedad > 50) {
          this.imagen = 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1711384871/images/ao5time9sdftgaaxucvq';
          this.alt = 'Humedad media';
        } else if (this.humedad > 25) {
          this.imagen = 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1711384871/images/ifhw3urphhkirc3izgtm';
          this.alt = 'Humedad baja';
        } else {
          this.imagen = 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1711384871/images/njymyk1bytuvrgtcpnhf';
          this.alt = 'Humedad muy baja';
        }
        if (this.temperatura > 41) {
          this.imagen2 = 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1711384871/images/zoueidpgtguvdhkqut4j';
          this.alt = 'temperatura media';
        } else if (this.temperatura > 30 && this.temperatura < 37) {
          this.imagen2 = 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1711384871/images/mtmxndj0oxhpfbjxq58v';
          this.alt = 'Hutemperatura normal';
        } else {
          this.imagen2 = 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1711384871/images/mwtyrblssqbqidm2wwyy';
          this.alt = 'temperatura muy baja';
        }

        console.log("valor que se obtiene de obtenerEstadoTempHume=>", response);
      },
      (error) => {
        console.error('Error al obtener el estado de obtenerEstadoTempHume:', error);
      }
    );
  }


  obtenerEstadoLed() {
    const dvName = this.selectedDeviceName;

    this.dispositivoService.getEstadoLed(dvName).subscribe(
      (response) => {
        // Asignar el valor del LED basado en la respuesta

        if (response == 1) {
          this.isChecked = true
        }
        // Suponiendo que el servidor devuelve 1 para "encendido" y 0 para "apagado"
        console.log("valor que se obtiene de getEstadoLed=>", response);
        console.log("valor que se de isckeck=>", this.isChecked);
      },
      (error) => {
        console.error('Error al obtener el estado del LED:', error);
      }
    );
  }
  obtnerEstadoVancin() {
    const dvName = this.selectedDeviceName;

    this.dispositivoService.getEstadoValancin(dvName).subscribe(
      (response) => {
        // Asignar el valor del LED basado en la respuesta

        if (response == 1) {
          this.isCheckedValancin = true
        }
        // Suponiendo que el servidor devuelve 1 para "encendido" y 0 para "apagado"
        console.log("valor que se obtiene de getEstadoValancin=>", response);
        console.log("valor que se de isckeck=>", this.isChecked);
      },
      (error) => {
        console.error('Error al obtener el estado del valancin:', error);
      }
    );
  }
  obtenerEstadoCarrucel() {
    const dvName = this.selectedDeviceName;

    this.dispositivoService.getEstadoCarrucel(dvName).subscribe(
      (response) => {
        // Asignar el valor del LED basado en la respuesta

        if (response == 1) {
          this.isCheckedCarrucel = true
        }
        // Suponiendo que el servidor devuelve 1 para "encendido" y 0 para "apagado"
        console.log("valor que se obtiene de getEstadoCarrucel=>", response);
        console.log("valor que se de isckeck=>", this.isCheckedCarrucel);
      },
      (error) => {
        console.error('Error al obtener el estado del carrucel:', error);
      }
    );
  }
  obtenerEstadoMusica() {
    const dvName = this.selectedDeviceName;

    this.dispositivoService.getEstadoMusica(dvName).subscribe(
      (response) => {
        // Asignar el valor del LED basado en la respuesta

        if (response == 1) {
          this.isCheckedMusica = true
        }
        // Suponiendo que el servidor devuelve 1 para "encendido" y 0 para "apagado"
        console.log("valor que se obtiene de getEstadoMusica=>", response);
        console.log("valor que se de isckeck=>", this.isChecked);
      },
      (error) => {
        console.error('Error al obtener el estado del carrucel:', error);
      }
    );
  }















}
