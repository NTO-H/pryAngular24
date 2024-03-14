import { Component } from '@angular/core';


import {provideAnimations}from '@angular/platform-browser/animations'
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
 
 
  title = 'pry';


  isAdmin: boolean = false;
  isClient: boolean = false;
  isPublic: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Verifica el rol del usuario
    const userRole = this.authService.obtenerRolUsuario();
    // Dependiendo del rol, establece las variables correspondientes
    if (userRole === 'admin') {
      this.isAdmin = true;
      console.log("admin?=>",this.isAdmin);
    } else if (userRole === 'cliente') {
      this.isClient = true;
      console.log("cliente?=>", this.isClient);
    } else {
      this.isPublic = true;
      console.log("publica?=>", this.isPublic);
    }
  }


}
