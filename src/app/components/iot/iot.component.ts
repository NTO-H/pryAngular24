import { MatSliderModule } from '@angular/material/slider';
// import { DispositivoService } from 'src/app/services/dispositivos.service';
// import { Dispositivo } from './../../models/dispositivos';
import { Console } from 'console';
import { Component, Input } from '@angular/core';
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
export class IotComponent {
  @Input() imagen!: string;
  @Input() alt!: string;
  temperatura: number = 25;
  // humedad: number = 60;
  // @Input() humedad!: number;
  // // @Input() humedad: number = 50; 
  // humedadOptions = [
  //   { value: 0, label: '0%' },
  //   { value: 25, label: '25%' },
  //   { value: 50, label: '50%' },
  //   { value: 75, label: '75%' },
  //   { value: 100, label: '100%' }
  // ];
  humedad: number = 0; // Valor inicial de la humedad
  // humedad: number = 0; // Valor inicial de la humedad
  humedadOptions = [
    { value: 0, label: '0%', icon: 'fas fa-tint' }, // Icono de gota de agua para 0%
    { value: 25, label: '25%', icon: 'fas fa-tint' }, // También puedes usar el mismo icono para todos los valores
    { value: 50, label: '50%', icon: 'fas fa-tint' },
    { value: 75, label: '75%', icon: 'fas fa-tint' },
    { value: 100, label: '100%', icon: 'fas fa-tint' }
  ];

  isChecked: boolean = false;
  isCheckedValancin: boolean = false;
  isCheckedCarrucel: boolean = false;


  constructor( private dispositivoService: DispositivoService, private toastr: ToastrService, private formBuilder: FormBuilder) {
 
  }

  
  toggleSwitch() {
    this.isChecked = !this.isChecked;



    // Convertir isChecked a 1 o 0
    const valor = this.isChecked ? 1 : 0;
    console.log("valor del estado=>",valor);
    // Llamar a cambiaEstadoLed() con el nuevo valor
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
    console.log("valor del valancin=>", valorCarrucel);
    this.cambiaEstadoCarrucel(valorCarrucel);
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


  items: MenuItem[] | undefined;
  ngOnInit() {
    

    // this.yourDataService.getHumedad().subscribe(
    //   (data: any) => {
    //     // Asigna el valor de la humedad obtenido del servicio al ngModel del slider
    //     this.humedad = data.humedad; // Suponiendo que el valor de humedad se obtiene de un objeto data con una propiedad 'humedad'
    //   },
    //   (error) => {
    //     console.error('Error al obtener el valor de la humedad:', error);
    //   }
    // );
  

    this.items = [
      {
        label: 'Disposivos',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Disposivos',
            icon: 'pi pi-fw pi-plus',
          },
        ]
      },
      {
        label: 'Data',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-align-left'
          },
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
      }
    ];
  }













}
