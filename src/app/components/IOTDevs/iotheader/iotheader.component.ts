import { Component } from '@angular/core';

@Component({
  selector: 'app-iotheader',
  // standalone: true,
  // imports: [],
  templateUrl: './iotheader.component.html',
  styleUrl: './iotheader.component.scss'
})
export class IotheaderComponent {
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
