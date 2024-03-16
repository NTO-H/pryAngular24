import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TabView } from 'primeng/tabview';
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

    this.isLoading = true; // Establecer el estado de carga a true

    this.authService.login(correo, pass).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso:', response);

        // Verifica si hay un rol en la respuesta
        if (response && response.rol) {
          // Accede al rol del usuario
          const rol = response.rol;
          localStorage.setItem('rol', rol);
          // Recarga la página después de iniciar sesión
          // window.location.reload();
          window.location.reload();
          // if (rol === 'admin') {
          //   this.router.navigate(['admin-home']); // Redirige al home del administrador
          //   // window.location.reload();
          // } else if (rol === 'cliente') {
          //   this.router.navigate(['client-home']); // Redirige al home del cliente
          //   // window.location.reload();
          // } else {

          //   this.router.navigate(['/l|ogin']); // Redirige al login

          //   console.error('Rol de usuario no válido:', rol);
          //   this.toastr.error('Error en inicio de sesión', 'Error');
          // }


        } else {
          console.error('No se recibió el rol del usuario en la respuesta.');
          this.toastr.error('Error en inicio de sesión', 'Error');
          this.loggingIn = false; // Establecer el estado de carga a false
        }
      },
      (error) => {
        console.error('Error en inicio de sesión:', error);
        this.toastr.error('Error en inicio de sesión', 'Error');
        this.loggingIn = false; // Establecer el estado de carga a false
      }
    );
  }
}
