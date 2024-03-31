import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iot-home',
  // standalone: true,
  // imports: [],
  templateUrl: './iot-home.component.html',
  styleUrls: ['./iot-home.component.scss']
})
export class IotHomeComponent implements OnInit {

  

  sidebarVisible3: boolean = false;




  usuarioId!: string |null; // Variable para almacenar el ID del usuario

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
        this.usuarioId = data._id;
        console.log("id>obtenido", this.usuarioId)
        console.log("id>", data._id)
      });
    }
  }
  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData !== null) {
      console.log(userData);
      this.auth.miPerfilUsuario(userData).subscribe(usuario => {
        this.usuarioId = usuario._id;
    
      
       
      })
  }else{
  
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