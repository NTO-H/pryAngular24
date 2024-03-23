import { MatSliderModule } from '@angular/material/slider';
// import { DispositivoService } from 'src/app/services/dispositivos.service';
// import { Dispositivo } from './../../models/dispositivos';
import { Console } from 'console';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { mensageservice } from 'src/app/services/mensage.service';
import { Router } from 'express';

import { DispositivoService } from 'src/app/services/dispositivo.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Dispositivo } from 'src/app/models/dispositivos';

@Component({
  selector: 'app-iot',
  // standalone: true,
  // imports: ,


  templateUrl: './iot.component.html',
  styleUrls: ['./iot.component.scss']
})
export class IotComponent implements OnInit {
  @Input() imagen!: string;
  @Input() alt!: string;
  temperatura: number = 25;
 
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
  sidebarStyle: { [klass: string]: any } = { heig:'50%',  width: '100%', textAlign: 'center' };
  // height:50%; width:100%; text-align: center; z-index: 1102;
  isChecked!: boolean;
  isCheckedValancin!: boolean;
  isCheckedCarrucel!: boolean;
  isCheckedMusica!: boolean;


  sidebarVisible3: boolean = false;
  constructor( private dispositivoService: DispositivoService, private toastr: ToastrService, private formBuilder: FormBuilder) {
 
  }


  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.obtenerEstadoLed();
    this.obtnerEstadoVancin();
    this.obtenerEstadoCarrucel();
    this.obtenerEstadoMusica();
  }

  toggleSwitch() {
    this.isChecked = !this.isChecked;
    const valor = this.isChecked ? 1 : 0;
    this.cambiaEstadoLed(valor);
  }

  toggleSwitchValanin()
  {
    this.isCheckedValancin = !this.isCheckedValancin;
    const valorValancin = this.isCheckedValancin ? 1 : 0;
    console.log("valor del valancin=>", valorValancin);
    this.cambiaEstadoValancin(valorValancin);
  }


  
  toggleSwitchCarrucel()
  {
    this.isCheckedCarrucel = !this.isCheckedCarrucel;
    const valorCarrucel = this.isCheckedCarrucel ? 1 : 0;
    console.log("valor del Carrucel=>", valorCarrucel);
    this.cambiaEstadoCarrucel(valorCarrucel);
  }
  toggleSwitchMusica()
  {
    this.isCheckedMusica = !this.isCheckedMusica;
    const valorMusica = this.isCheckedMusica ? 1 : 0;
    console.log("valor del Musica=>", valorMusica);
    this.cambiaEstadoMusica(valorMusica);
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

//  !  arreglar 
//this.yourDataService.getHumedad().subscribe(
//      (data: any) => {
//   // Asigna el valor de la humedad obtenido del servicio al ngModel del slider
//   this.humedad = data.humedad; // Suponiendo que el valor de humedad se obtiene de un objeto data con una propiedad 'humedad'
// },
//   (error) => {
//     console.error('Error al obtener el valor de la humedad:', error);
//   }
//     );
//   }

  cambiaEstadoLed(valor: number) {
    this.dispositivoService.editarDispositivoLed(valor).subscribe(
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




  cambiaEstadoValancin(valor: number) {
    this.dispositivoService.editarDispositivoValancin(valor).subscribe(
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
  cambiaEstadoCarrucel(valor: number) {
    this.dispositivoService.editarDispositivoCarrucel(valor).subscribe(
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


  cambiaEstadoMusica(valor: number) {
    this.dispositivoService.editarEstadoMusica(valor).subscribe(
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


  obtenerEstadoLed() {
    this.dispositivoService.getEstadoLed().subscribe(
      (response) => {
        // Asignar el valor del LED basado en la respuesta

        if (response == 1) {
           this.isChecked =true
        }
        // Suponiendo que el servidor devuelve 1 para "encendido" y 0 para "apagado"
        console.log("valor que se obtiene de getEstadoLed=>",response);
        console.log("valor que se de isckeck=>", this.isChecked);
      },
      (error) => {
        console.error('Error al obtener el estado del LED:', error);
      }
    );
  }
  obtnerEstadoVancin() {
    this.dispositivoService.getEstadoValancin().subscribe(
      (response) => {
        // Asignar el valor del LED basado en la respuesta

        if (response == 1) {
          this.isCheckedValancin =true
        }
        // Suponiendo que el servidor devuelve 1 para "encendido" y 0 para "apagado"
        console.log("valor que se obtiene de getEstadoValancin=>",response);
        console.log("valor que se de isckeck=>", this.isChecked);
      },
      (error) => {
        console.error('Error al obtener el estado del valancin:', error);
      }
    );
  }
  obtenerEstadoCarrucel() {
    this.dispositivoService.getEstadoCarrucel().subscribe(
      (response) => {
        // Asignar el valor del LED basado en la respuesta

        if (response == 1) {
          this.isCheckedCarrucel =true
        }
        // Suponiendo que el servidor devuelve 1 para "encendido" y 0 para "apagado"
        console.log("valor que se obtiene de getEstadoCarrucel=>",response);
        console.log("valor que se de isckeck=>", this.isCheckedCarrucel);
      },
      (error) => {
        console.error('Error al obtener el estado del carrucel:', error);
      }
    );
  }
  obtenerEstadoMusica() {
    this.dispositivoService.getEstadoMusica().subscribe(
      (response) => {
        // Asignar el valor del LED basado en la respuesta

        if (response == 1) {
          this.isCheckedMusica =true
        }
        // Suponiendo que el servidor devuelve 1 para "encendido" y 0 para "apagado"
        console.log("valor que se obtiene de getEstadoMusica=>",response);
        console.log("valor que se de isckeck=>", this.isChecked);
      },
      (error) => {
        console.error('Error al obtener el estado del carrucel:', error);
      }
    );
  }















}
