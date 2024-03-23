import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // constructor() { }
  currentUser: any; // Variable para almacenar la información del usuario logeado


  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    // Obtener los datos del usuario almacenados en el localStorage
    const userData = localStorage.getItem('currentUser');
  
console.log(userData)
    // Verificar si hay datos de usuario en el localStorage
    if (userData) {
      // Obtener los datos del usuario por correo electrónico
      this.auth.miPerfilUsuario(userData).subscribe(data => {
        this.currentUser = data.datos;
      });
    }
  }

  
}
