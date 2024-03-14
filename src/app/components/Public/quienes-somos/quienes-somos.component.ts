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

    this.comentarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      comemtario: ['', Validators.required],
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
    const COMENTARIO: Comentario = {
      nombre: this.comentarioForm.get('nombre')?.value,
      correo: this.comentarioForm.get('correo')?.value,
      comentario: this.comentarioForm.get('comentario')?.value,
    }
   
   if (COMENTARIO.nombre == "" || COMENTARIO.correo == "" || COMENTARIO.comentario == "") {
      Swal.fire('Error', 'ingresa los datos correctamente', 'error');
   } else if (!this.ValidarCorreo(COMENTARIO.correo)) {
     Swal.fire('Error', 'correo no valido', 'error');
   } 
   
   else {
     this._comentarioService.guardarComentario(COMENTARIO).subscribe(response => {
        this.toastr.success('usuario agregado con éxito!', 'succes');
        console.log(COMENTARIO.nombre, COMENTARIO.correo)
      }, error => {
        this.toastr.error(' ! El correo ya se encuentra registrado!', 'error');
      }
      )
    }







  }
}
