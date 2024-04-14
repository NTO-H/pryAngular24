import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DispositivoService } from 'src/app/services/dispositivo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Dispositivo } from 'src/app/models/dispositivos';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  @Input() imagen!: string;
  @Input() imagen2!: string;
  @Input() text!: string;
  @Input() text2!: string;
  temperatura = 0;
  sidebarVisible3 = false;

  dispositivos: Dispositivo[] = [];
  deviceCount = 0;
  mostrarDispositivos = false;
  deviceName = '';
  ultimoDispositivoSeleccionado: string = '';

  humedad = 0;

  sidebarStyle: { [klass: string]: any; } = { height: '50%', width: '100%', textAlign: 'center' };
  isCheckedLed: boolean | null = null;
  isCheckedValancin: boolean | null = null;
  isCheckedCarrucel: boolean | null = null;
  isCheckedMusica: boolean | null = null;
  ledState: boolean | null = null;
  valancinState: boolean | null = null;
  carrucelState: boolean | null = null;
  musicaState: boolean | null = null;
  currentSelectedDevice: string = ''; // Variable para almacenar el dispositivo seleccionado actualmente
  private dispositivoSubscription!: Subscription;
  value: number = 50;
  selectedDevice: string = '';
  constructor(private http: HttpClient,
    private aRouter: ActivatedRoute,
    private fb: FormBuilder,
    private dispositivoService: DispositivoService,
    private usr: UsuarioService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerDispositivos();
  }



  dateSelectedDevice(selectedDevice: string) {
    if (selectedDevice !== this.currentSelectedDevice) {
      this.currentSelectedDevice = selectedDevice;

      // Cancelar la suscripción anterior si existe
      if (this.dispositivoSubscription) {
        this.dispositivoSubscription.unsubscribe();
      }

      // Realizar una solicitud cada 5 segundos
      this.dispositivoSubscription = interval(1000).pipe(
        switchMap(() => this.http.get<any>(`https://servidortropicalworld-1.onrender.com/dispositivos/obtenerEstadoDispositivo/${selectedDevice}`))
      ).subscribe(
        (response) => {
          console.log("Estado del dispositivo:", response);
          // Actualizar el estado de los componentes en el frontend
          this.isCheckedLed = response.led === 1;
          this.isCheckedValancin = response.valancin === 1;
          this.isCheckedCarrucel = response.carrucel === 1;
          this.isCheckedMusica = response.musica === 1;
          // Asignar el valor de temperatura obtenido a la variable temperatura
          this.temperatura = response.temperatura;

          // Asignar el valor de humedad obtenido a la variable humedad
          this.humedad = response.humedad;

          // Llamar a la función para determinar la imagen basada en la temperatura
          this.actualizarImagenTemperatura(this.temperatura);

          // Llamar a la función para determinar la imagen basada en la humedad
          this.actualizarImagenHumedad(this.humedad);
        },
        (error) => {
          console.error('Error al obtener el estado del dispositivo:', error);
        }
      );
    }
  }


  actualizarImagenHumedad(humedad: number) {
    let borderColor = '#00ff00'; // Verde por defecto

    if (humedad > 75) {
      borderColor = '#ff0000'; // Rojo para humedad alta
      this.text = 'Humedad alta';
    } else if (humedad > 50) {
      borderColor = '#ffff00'; // Amarillo para humedad media
      this.text = 'Humedad media';
    } else if (humedad > 25) {
      borderColor = '#00ff00'; // Verde para humedad baja
      this.text = 'Humedad baja';
    } else {
      borderColor = '#0000ff'; // Azul para humedad muy baja
      this.text = 'Humedad muy baja';
    }
    const speedometer = document.querySelector('.speedometer') as HTMLElement;
    const speedText = document.querySelector('.speed-text') as HTMLElement;
    if (speedometer && speedText) {
      speedometer.style.border = `5px solid ${borderColor}`;
      speedText.textContent = `${this.humedad}%`;
    }
    // Actualizar la imagen y el texto alternativo en el componente
  }



  actualizarImagenTemperatura(temperatura: number) {
    let borderColor = '#00ff00'; // Verde por defecto
    if (temperatura > 41) {
      borderColor = '#ff0000'; // Rojo para temperatura alta
      this.text2 = 'Temperatura alta';
    } else if (temperatura > 30 && temperatura < 37) {
      borderColor = '#00ff00'; // Verde para temperatura normal
      this.text2 = 'Temperatura normal';
    } else {
      this.text2 = 'Temperatura baja';
    }
    const speedometer = document.querySelector('.speedometer') as HTMLElement;
    const speedText = document.querySelector('.speed-text') as HTMLElement;
    if (speedometer && speedText) {
      speedometer.style.border = `5px solid ${borderColor}`;
      speedText.textContent = `${this.temperatura}°C`;
    }
  }



  copiarClave() {
    const claveInput = document.getElementById('keyInput') as HTMLInputElement;
    claveInput.select();
    document.execCommand('copy');
  }

  obtenerDispositivos() {
    console.log("entró=>currentUser ");
    const correo = localStorage.getItem('currentUser');
    if (!correo) {
      this.toastr.error('Correo electrónico del usuario no encontrado', 'Error');
      return;
    }

    this.usr.buscaUsuarioByCorreo(correo).subscribe(
      (data: any) => {
        if (data && data.usuarioId) {
          const id = data.usuarioId;

          this.dispositivoService.encontrarDispositivosPorUsuarioId(id).subscribe(
            (data: Dispositivo[]) => {
              console.log("entró=>encontrarDispositivosPorUsuarioId ");
              console.log("entró=>data.usuarioId ", id);

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

  toggleSwitch() {
    this.isCheckedLed = !this.isCheckedLed;
    const valor = this.isCheckedLed ? 1 : 0;
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
    console.log("valor del Carrucel=>", valorCarrucel);
    this.cambiaEstadoCarrucel(valorCarrucel);
  }

  toggleSwitchMusica() {
    this.isCheckedMusica = !this.isCheckedMusica;
    const valorMusica = this.isCheckedMusica ? 1 : 0;

    console.log("valor del Musica=>", valorMusica);

    this.cambiaEstadoMusica(valorMusica);
  }

  cambiaEstadoLed(valor: number) {
    this.dispositivoService.editarDispositivoLed(valor, this.currentSelectedDevice).subscribe(
      (response) => {
        this.toastr.success('Estado del LED actualizado correctamente');
        this.isCheckedLed = response === 1;
      },
      (error) => {
        this.toastr.error('Error al actualizar el estado del LED');
        console.error('Error al actualizar el estado del LED:', error);
      }
    );
  }

  cambiaEstadoValancin(valor: number) {
    this.dispositivoService.editarDispositivoValancin(valor, this.currentSelectedDevice).subscribe(
      (response) => {
        this.toastr.success('Estado del valancin actualizado correctamente');
        this.isCheckedValancin = response === 1;
      },
      (error) => {
        this.toastr.error('Error al actualizar el estado del valancin');
        console.error('Error al actualizar el estado del valancin:', error);
      }
    );
  }

  cambiaEstadoCarrucel(valor: number) {
    this.dispositivoService.editarDispositivoCarrucel(valor, this.currentSelectedDevice).subscribe(
      (response) => {
        this.toastr.success('Estado del carrucel actualizado correctamente');
        this.isCheckedCarrucel = response === 1;
      },
      (error) => {
        this.toastr.error('Error al actualizar el estado del carrucel');
        console.error('Error al actualizar el estado del carrucel:', error);
      }
    );
  }

  cambiaEstadoMusica(valor: number) {
    this.dispositivoService.editarEstadoMusica(valor, this.currentSelectedDevice).subscribe(
      (response) => {
        this.toastr.success('Estado del musica actualizado correctamente');
        this.isCheckedMusica = response === 1;
      },
      (error) => {
        this.toastr.error('Error al actualizar el estado del musica');
        console.error('Error al actualizar el estado del musica:', error);
      }
    );
  }
}
