import { Component } from '@angular/core';


import {provideAnimations}from '@angular/platform-browser/animations'
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // Verifica el rol del usuario
    const userRole = this.authService.obtenerRolUsuario();
    // Dependiendo del rol, establece las variables correspondientes
    // window.location.reload();
    if (userRole === 'admin') {
      this.isAdmin = true;
      console.log("admin?=>", this.isAdmin);
      this.router.navigate(['/admin-home']); // Redirige al home del administrador

    } else if (userRole === 'cliente') {
      this.isClient = true;
      console.log("cliente?=>", this.isClient);
      this.router.navigate(['/client-home']); // Redirige al home del cliente

    } else {
      this.isPublic = true;
      console.log("publica?=>", this.isPublic);
      this.router.navigate(['/']); // Redirige al home del cliente

    }

   
  }


}
