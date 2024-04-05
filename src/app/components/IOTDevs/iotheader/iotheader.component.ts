import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iotheader',
  // standalone: true,
  // imports: [],
  templateUrl: './iotheader.component.html',
  styleUrl: './iotheader.component.scss'
})
export class IotheaderComponent {
  sidebarVisible3: boolean = false;

  
  // mostrarSidebar() {
  //   this.sidebarVisible3 = true;
  // }

  
  // copiarClave() {
  //   // Obtener el valor del input
  //   const claveInput = document.getElementById('keyInput') as HTMLInputElement;
  //   claveInput.select();
  //   document.execCommand('copy');
  // }


  // sidebarVisible3: boolean = false;




  usuarioId: any; // Variable para almacenar el ID del usuario

  // constructor(private authService: AuthService) { }



  constructor(private auth: AuthService) { }
  mostrarSidebar() {
    this.sidebarVisible3 = true;

    // this.getToken();

    const userData = localStorage.getItem('currentUser');

    console.log(userData)
    // Verificar si hay datos de usuario en el localStorage
    if (userData) {
      // Obtener los datos del usuario por correo electrónico
      this.auth.miPerfilUsuario(userData).subscribe(data => {
        this.usuarioId = data.datos;
        console.log("id>obtenido", this.usuarioId)
        console.log("id>", data.datos)
      });
    }
  }
  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData !== null) {
      console.log(userData);
      this.auth.miPerfilUsuario(userData).subscribe(usuario => {
        this.usuarioId = usuario.datos;
      })
    } else {
      Swal.fire('Error', 'No se obtubo datos', 'error');
    }
  }
  copiarClave() {
    // Obtener el valor del input
    const claveInput = document.getElementById('keyInput') as HTMLInputElement;
    claveInput.select();
    document.execCommand('copy');
  }


  


}
