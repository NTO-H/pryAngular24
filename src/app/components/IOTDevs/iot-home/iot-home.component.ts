import { Component } from '@angular/core';

@Component({
  selector: 'app-iot-home',
  // standalone: true,
  // imports: [],
  templateUrl: './iot-home.component.html',
  styleUrls: ['./iot-home.component.scss']
})
export class IotHomeComponent {

  

  sidebarVisible3: boolean = false;


  mostrarSidebar() {
    this.sidebarVisible3 = true;
  }


  copiarClave() {
    // Obtener el valor del input
    const claveInput = document.getElementById('keyInput') as HTMLInputElement;
    claveInput.select();
    document.execCommand('copy');
  }
}
