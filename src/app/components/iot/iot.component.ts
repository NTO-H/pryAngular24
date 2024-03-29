import { ConsultasService } from './../../services/consultas.service';
import { MatSliderModule } from '@angular/material/slider';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { DispositivoService } from 'src/app/services/dispositivo.service'; // Corregido el import
import { Dispositivo } from 'src/app/models/dispositivos';

@Component({
  selector: 'app-iot',
  templateUrl: './iot.component.html',
  styleUrls: ['./iot.component.scss']
})
export class IotComponent implements OnInit {
  @Input() imagen!: string;
  @Input() imagen2!: string;

  socket$!: WebSocketSubject<any>;

  @Input() alt!: string;
  temperatura: number = 25;

  humedad: number = 0;
  humedadOptions = [
    { value: 0, label: '0%', icon: 'fas fa-tint' },
    { value: 25, label: '25%', icon: 'fas fa-tint' },
    { value: 50, label: '50%', icon: 'fas fa-tint' },
    { value: 75, label: '75%', icon: 'fas fa-tint' },
    { value: 100, label: '100%', icon: 'fas fa-tint' }
  ];

  sidebarStyle: { [klass: string]: any } = { height: '50%', width: '100%', textAlign: 'center' };
  isChecked!: boolean;
  isCheckedValancin!: boolean;
  isCheckedCarrucel!: boolean;
  isCheckedMusica!: boolean;

  sidebarVisible3: boolean = false;

  constructor(
    private consultaService: ConsultasService,
    private dispositivoService: DispositivoService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.initWebSocket();
    this.obtenerEstadoLed();
    this.obtnerEstadoVancin();
    this.obtenerEstadoCarrucel();
    this.obtenerEstadoMusica();
    this.obtenerEstadoTempHume();
  }

  initWebSocket() {
    this.socket$ = webSocket('ws://localhost:3000');
    this.socket$.subscribe(
      (message) => {
        console.log('Mensaje recibido:', message);
      },
      (error) => {
        console.error('Error en la conexión WebSocket:', error);
      },
      () => {
        console.log('Conexión WebSocket cerrada');
      }
    );
  }

  toggleSwitch() {
    this.isChecked = !this.isChecked;
    const valor = this.isChecked ? 1 : 0;
    this.cambiaEstadoLed(valor);
  }

  toggleSwitchValanin() {
    this.isCheckedValancin = !this.isCheckedValancin;
    const valorValancin = this.isCheckedValancin ? 1 : 0;
    this.cambiaEstadoValancin(valorValancin);
  }

  toggleSwitchCarrucel() {
    this.isCheckedCarrucel = !this.isCheckedCarrucel;
    const valorCarrucel = this.isCheckedCarrucel ? 1 : 0;
    this.cambiaEstadoCarrucel(valorCarrucel);
  }

  toggleSwitchMusica() {
    this.isCheckedMusica = !this.isCheckedMusica;
    const valorMusica = this.isCheckedMusica ? 1 : 0;
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

  cambiaEstadoLed(valor: number) {
    this.dispositivoService.editarDispositivoLed(valor).subscribe(
      (response) => {
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
        this.toastr.success('Estado del musica actualizado correctamente');
      },
      (error) => {
        this.toastr.error('Error al actualizar el estado del musica ');
        console.error('Error al actualizar el estado del musica:', error);
      }
    );
  }

  obtenerEstadoTempHume() {
    this.dispositivoService.getTempHum().subscribe(
      (response) => {
        this.humedad = response.humedad;
        this.temperatura = response.temperatura;

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
          this.alt = 'temperatura normal';
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
    this.dispositivoService.getEstadoLed().subscribe(
      (response) => {
        if (response == 1) {
          this.isChecked = true;
        }
        console.log("valor que se obtiene de getEstadoLed=>", response);
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
        if (response == 1) {
          this.isCheckedValancin = true;
        }
        console.log("valor que se obtiene de getEstadoValancin=>", response);
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
        if (response == 1) {
          this.isCheckedCarrucel = true;
        }
        console.log("valor que se obtiene de getEstadoCarrucel=>", response);
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
        if (response == 1) {
          this.isCheckedMusica = true;
        }
        console.log("valor que se obtiene de getEstadoMusica=>", response);
        console.log("valor que se de isckeck=>", this.isChecked);
      },
      (error) => {
        console.error('Error al obtener el estado del carrucel:', error);
      }
    );
  }
}
