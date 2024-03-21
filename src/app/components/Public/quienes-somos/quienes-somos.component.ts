import { Comentario } from './../../../models/comentario';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UsuarioService } from './../../../services/usuario.service';
// import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
// import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
// import { Comentario } from 'src/app/models/usuario';
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
import { ComentarioService } from 'src/app/services/comentario.service';


@Component({
  selector: 'app-quienes-somos',
  standalone: false,
  // imports: [],
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.scss']
})
export class QuienesSomosComponent {

  
  comentarioForm!: FormGroup;



  constructor(private formBuilder: FormBuilder, private router: Router,
    private toastr: ToastrService,
    private _comentarioService: ComentarioService,
    private aRouter: ActivatedRoute,
    private messageService: MessageService) {

    // this.comentarioForm = this.formBuilder.group({
    this.comentarioForm = this.formBuilder.group({
      nombre: [''],
      correo: [''],
      comentario: ['']
    });
  }
  ValidarCorreo = function (correo: any) {
    var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo.match(validRegex)) {
      return true;
    } else {
      return false;
    }

  }
  
  
  registrarComentario() {
    const nombre = this.comentarioForm.get('nombre')?.value;
    const correo = this.comentarioForm.get('correo')?.value;
    const comentario = this.comentarioForm.get('comentario')?.value;

    console.log("nombre=>", nombre);
    console.log("correo=>", correo);
    console.log("comentario=>", comentario);

    // Validar que todos los campos estén completos
    if (!nombre || !correo || !comentario) {
      Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
      return; // Salir de la función si algún campo está vacío
    }

    // Llamar al servicio para guardar el comentario
    this._comentarioService.guardarComentario(nombre, correo, comentario).subscribe(
      response => {
        this.toastr.success('¡Se envió tu comentario con éxito!', 'Éxito');
      },
      error => {
        this.toastr.error('¡Hubo un error al enviar el comentario!', 'Error');
      }
    );
  




  }
}
