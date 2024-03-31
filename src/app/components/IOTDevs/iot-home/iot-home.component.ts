import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iot-home',
  // standalone: true,
  // imports: [],
  templateUrl: './iot-home.component.html',
  styleUrls: ['./iot-home.component.scss']
})
export class IotHomeComponent implements OnInit {

  

  sidebarVisible3: boolean = false;



  usuarioId?: String;

  constructor(private auth: AuthService) { }
  mostrarSidebar() {
    this.sidebarVisible3 = true;

    // this.getToken();


  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
  
  // getToken() {
    
  // }
    
  
  

  copiarClave() {
    // Obtener el valor del input
    const claveInput = document.getElementById('keyInput') as HTMLInputElement;
    claveInput.select();
    document.execCommand('copy');
  }

}