// import { jwt_decode } from 'jwt-jwt_decode';
// import { jwt_decode } from 'jwt_decode';
// import { jwt_decode } from 'jwt-decode';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TabView } from 'primeng/tabview';
// const jwt = require('jsonwebtoken');
// import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-Auth',
  templateUrl: './Auth.component.html',
  styleUrls: ['./Auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  loggingIn: boolean = false; // Variable para controlar el estado de carga
  isLoading = false;//variable rastreador de carga de producto
  // @ViewChild('tabView') tabView!: TabView;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
    
    
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }


  


  ngOnInit() { }

  
  
  
  login() {
    const correo = this.loginForm.value.correo;
    const pass = this.loginForm.value.pass;

    this.isLoading = true;
    this.authService.login(correo, pass).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso:', response);
        if (response && response.rol) {
          const rol = response.rol;
          const token = response.token;
          localStorage.setItem('token', token);
          localStorage.setItem('rol', rol);

          localStorage.setItem('currentUser', correo);


          window.location.reload();
        } else {
          console.error('No se recibió el rol del usuario en la respuesta.');
          this.toastr.error('Error en inicio de sesión', 'Error');
          this.loggingIn = false; // Establecer el estado de carga a false
          this.isLoading = false;//variable rastreador de carga de producto
        }
      },
      (error) => {
        console.error('Error en inicio de sesión:', error);
        this.toastr.error('Error en inicio de sesión', 'Error');
        this.loggingIn = false; // Establecer el estado de carga a false
        this.isLoading = false;//variable rastreador de carga de producto
      }
    );
  }
}
