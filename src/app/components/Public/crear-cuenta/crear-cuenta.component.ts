import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
// import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { MessageService } from 'primeng/api';
import swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Route } from '@angular/router';
// import {}


import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';


import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { response } from 'express';
import { error } from 'console';


export class MyErrorStateMatcher implements ErrorStateMatcher {



  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}




@Component({
  selector: 'app-crear-cuenta',
  // imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule],
  // imports: [ReactiveFormsModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss'], providers: [MessageService]
})
export class CrearCuentaComponent implements OnInit {
  usuarioForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router,
    private toastr: ToastrService,
    private _UsuarioService: UsuarioService,
    private aRouter: ActivatedRoute,
    private messageService: MessageService) {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      pass: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
    });
  }



  ngOnInit(): void {

  }
  ValidarCorreo = function (correo: any) {
    var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo.match(validRegex)) {
      return true;
    } else {
      return false;
    }

  }

  registrarUsuario() {
    const USUARIO: Usuario = {

      nombre: this.usuarioForm.get('nombre')?.value,
      correo: this.usuarioForm.get('correo')?.value,
      telefono: this.usuarioForm.get('telefono')?.value,
      pass: this.usuarioForm.get('pass')?.value,
    }
    if (!this.ValidarCorreo(USUARIO.correo)) {
      Swal.fire('Error', 'correo no valido', 'error');
    }
    else if (USUARIO.nombre == "" || USUARIO.correo == "" || USUARIO.pass == "") {
      Swal.fire('Error', 'ingresa los datos correctamente', 'error');
    } else {
      this._UsuarioService.guardarUsuario(USUARIO).subscribe(response => {
        this.toastr.success('usuario agregado con éxito!', 'succes');
        console.log(USUARIO.nombre, USUARIO.correo)
      }, error => {
        this.toastr.error(' ! El correo ya se encuentra registrado!', 'error');
      }
      )
    }


    // this.router.navigate(['/']);



  }







}
