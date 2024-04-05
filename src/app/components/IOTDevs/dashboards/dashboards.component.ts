import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DispositivoService } from 'src/app/services/dispositivo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Dispositivo } from 'src/app/models/dispositivos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  @Input() imagen!: string;
  @Input() imagen2!: string;
  @Input() alt!: string;
  temperatura = 25;
  sidebarVisible3 = false;

  dispositivos: Dispositivo[] = [];
  deviceCount = 0;
  mostrarDispositivos = false;
  deviceName = '';
  ultimoDispositivoSeleccionado: string = '';

  humedad = 0;
  humedadOptions = [
    { value: 0, label: '0%', icon: 'fas fa-tint' },
    { value: 25, label: '25%', icon: 'fas fa-tint' },
    { value: 50, label: '50%', icon: 'fas fa-tint' },
    { value: 75, label: '75%', icon: 'fas fa-tint' },
    { value: 100, label: '100%', icon: 'fas fa-tint' }
  ];
  sidebarStyle: { [klass: string]: any } = { height: '50%', width: '100%', textAlign: 'center' };
  isChecked: boolean | null = null;
  isCheckedValancin: boolean | null = null;
  isCheckedCarrucel: boolean | null = null;
  isCheckedMusica: boolean | null = null;
  ledState: boolean | null = null;
  valancinState: boolean | null = null;
  carrucelState: boolean | null = null;
  musicaState: boolean | null = null;

  selectedDevice: string = '';
  constructor(
    private aRouter: ActivatedRoute,
    private fb: FormBuilder,
    private dispositivoService: DispositivoService,
    private usr: UsuarioService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerDispositivos();
  }

  // this.dvName = this.selectedDeviceName; // Asignar el valor a dvName
  updateSelectedDevice(event: any) {
    // Verificar si event es undefined y si event.target es un elemento HTML con la propiedad value
    //NOTE -  Verificar si event es undefined y si event.target es un elemento HTML con la propiedad value
    if (event && event.target instanceof HTMLSelectElement) {
      const selectedOption = event.target.value; // Aquí obtienes el valor de la opción seleccionada
      console.log('Opción seleccionada:', selectedOption);

      // Verifica si la opción seleccionada ha cambiado
      if (selectedOption !== this.ultimoDispositivoSeleccionado) {
        console.log("Se seleccionó un dispositivo diferente.")
        this.ultimoDispositivoSeleccionado = selectedOption;

        // Realiza solicitudes para obtener el estado de cada componente del dispositivo seleccionado
        this.dispositivoService.getEstadoLed(this.ultimoDispositivoSeleccionado).subscribe(
          (response: any) => {
            console.log("obtenerEstadoLed de ", this.ultimoDispositivoSeleccionado)
            this.isChecked = response === 1;
            console.log("valor que se obtiene de getEstadoLed=>", response);
            console.log("valor que se de isckeck=>", this.isChecked);
          },
          (error) => {
            console.error('Error al obtener el estado del LED:', error);
          }
        );

        // Agrega aquí las demás solicitudes HTTP utilizando this.ultimoDispositivoSeleccionado
        this.dispositivoService.getEstadoValancin(this.ultimoDispositivoSeleccionado).subscribe(
          (response: any) => {
            console.log("obtenerEstadoValancin de ", this.ultimoDispositivoSeleccionado)
            this.isCheckedValancin = response === 1;
            console.log("valor que se obtiene de getEstadoValancin=>", response);
            console.log("valor que se de isckeck=>", this.isCheckedValancin);
          },
          (error) => {
            console.error('Error al obtener el estado del valancin:', error);
          }
        );
        this.dispositivoService.getEstadoCarrucel(this.ultimoDispositivoSeleccionado).subscribe(
          (response: any) => {
            console.log("obtenerEstadoCarrucel de ", this.ultimoDispositivoSeleccionado)

            this.isCheckedCarrucel = response === 1;
            console.log("valor que se obtiene de getEstadoCarrucel=>", response);
            console.log("valor que se de isckeck=>", this.isCheckedCarrucel);
          },
          (error) => {
            console.error('Error al obtener el estado del carrucel:', error);
          }
        );
        this.dispositivoService.getEstadoMusica(this.ultimoDispositivoSeleccionado).subscribe(
          (response: any) => {
            console.log("obtenerEstadoMusica de ", this.ultimoDispositivoSeleccionado)

            this.isCheckedMusica = response === 1;
            console.log("valor que se obtiene de getEstadoMusica=>", response);
            console.log("valor que se de isckeck=>", this.isCheckedMusica);
          },
          (error) => {
            console.error('Error al obtener el estado del musica:', error);
          }
        );
      } else {
        console.log("Se seleccionó el mismo dispositivo.");
        // Si es el mismo dispositivo, puedes llamar a la función para obtener los estados de dispositivos aquí
        // this.obtenerEstadosDispositivos();

      }
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

  // obtenerEstadosDispositivos() {
  //   // Realiza solicitudes para obtener el estado de cada componente del dispositivo seleccionado
  //   this.obtenerEstadoLed();
  //   this.obtenerEstadoValancin();
  //   this.obtenerEstadoCarrucel();
  //   this.obtenerEstadoMusica();
  //   this.obtenerEstadoTempHume();
  // }
  
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
    console.log("valor del Carrucel=>", valorCarrucel);
    this.cambiaEstadoCarrucel(valorCarrucel);
  }

  toggleSwitchMusica() {
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

  cambiaEstadoLed(valor: number) {
    this.dispositivoService.editarDispositivoLed(valor, this.ultimoDispositivoSeleccionado).subscribe(
      (response) => {
        this.toastr.success('Estado del LED actualizado correctamente');
        this.isChecked = response === 1;
      },
      (error) => {
        this.toastr.error('Error al actualizar el estado del LED');
        console.error('Error al actualizar el estado del LED:', error);
      }
    );
  }

  cambiaEstadoValancin(valor: number) {
    this.dispositivoService.editarDispositivoValancin(valor, this.ultimoDispositivoSeleccionado).subscribe(
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
    this.dispositivoService.editarDispositivoCarrucel(valor, this.ultimoDispositivoSeleccionado).subscribe(
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
    this.dispositivoService.editarEstadoMusica(valor, this.ultimoDispositivoSeleccionado).subscribe(
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