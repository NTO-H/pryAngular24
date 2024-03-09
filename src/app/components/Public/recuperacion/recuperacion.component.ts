// import { Component } from '@angular/core';


import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
// import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

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
import { UsuarioService } from 'src/app/services/usuario.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {



  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-recuperacion',
  // standalone: true,
  // imports: [],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.scss'
})
export class RecuperacionComponent {

  usuarioForm: FormGroup;

  value!: string;


  constructor(private formBuilder: FormBuilder) {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      pass: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }





  inputControl: FormControl = new FormControl('');
  ngOnInit() {
    this.inputControl = new FormControl('');
  }
  registrarUsuario() {
    const USUARIOS: Usuario = {
      nombre: this.usuarioForm.get('nombre')?.value,
      pass: this.usuarioForm.get('pass')?.value,
      correo: this.usuarioForm.get('correo')?.value,
    }
  }



  get nombre() {
    return this.usuarioForm.get('nombre');
  }

  get pass() {
    return this.usuarioForm.get('pass');
  }

  get correo() {
    return this.usuarioForm.get('correo');
  }




  addUser() {
    console.log(this.usuarioForm.value);
  }

}
