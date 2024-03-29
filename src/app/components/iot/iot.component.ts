import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DispositivoService } from 'src/app/services/dispositivo.service';

@Component({
  selector: 'app-iot',
  templateUrl: './iot.component.html',
  styleUrls: ['./iot.component.scss']
})
export class IotComponent implements OnInit {
  imagen!: string;
  imagen2!: string;
  alt!: string;
  temperatura: number = 25;
  humedad: number = 0;
  isChecked!: boolean;
  isCheckedValancin!: boolean;
  isCheckedCarrucel!: boolean;
  isCheckedMusica!: boolean;
  sidebarVisible3: boolean = false;

  constructor(private dispositivoService: DispositivoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dispositivoService.getAllDispositivosData().subscribe(data => {
      // Manejar los datos obtenidos
      console.log(data);
      // Actualizar propiedades del componente según sea necesario
      this.humedad = data.tempHum.humedad;
      this.temperatura = data.tempHum.temperatura;
      this.alt = this.getAltText(this.humedad);
      this.isChecked = data.estadoLed === 1;
      this.isCheckedValancin = data.estadoValancin === 1;
      this.isCheckedCarrucel = data.estadoCarrucel === 1;
      this.isCheckedMusica = data.estadoMusica === 1;
    });
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

  getAltText(humedad: number): string {
    if (humedad === 0) {
      return 'Humedad muy baja';
    } else if (humedad <= 25) {
      return 'Humedad baja';
    } else if (humedad <= 50) {
      return 'Humedad media';
    } else if (humedad <= 75) {
      return 'Humedad alta';
    } else {
      return 'Humedad muy alta';
    }
  }

  cambiaEstadoLed(valor: number) {
    // Implementa la lógica para cambiar el estado del LED
  }

  cambiaEstadoValancin(valor: number) {
    // Implementa la lógica para cambiar el estado del valancín
  }

  cambiaEstadoCarrucel(valor: number) {
    // Implementa la lógica para cambiar el estado del carrusel
  }

  cambiaEstadoMusica(valor: number) {
    // Implementa la lógica para cambiar el estado de la música
  }
}
