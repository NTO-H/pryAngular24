// import { Swal } from 'sweetalert2';
// import { Component } from '@angular/core';

// import { Component } from ‘@angular/core’;
// import { MessageService } from 0./services/message.service’;
import { mensageservice } from 'src/app/services/mensage.service';
// import Swal, * as swal from 'sweetalert2';]
import Swal from 'sweetalert2';

import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
// import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
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
import { response } from 'express';
import { Console } from 'console';
import { MessageService } from 'primeng/api';
import { TREESELECT_VALUE_ACCESSOR } from 'primeng/treeselect';


export class MyErrorStateMatcher implements ErrorStateMatcher {


  selectedOption: string = 'email';

  selectOption(event: any) {
    this.selectedOption = event.target.value;
  }

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
  styleUrls: ['./recuperacion.component.scss']
})
export class RecuperacionComponent {






  preguntas = [
    { label: '¿nombre de tu mejor amigo?', value: 'nombre_amigo' },
    { label: '¿color favorito?', value: 'color_favorito' },
    { label: '¿equipo de futbol?', value: 'equipo_futbol' }
  ];

  frmSeleccion: FormGroup;
  frmbuscarCorreo: FormGroup;
  frmVerificacion: FormGroup;
  frmPregunta: FormGroup;
  frmActualizaPassword: FormGroup;
  

  value: string | undefined;

  // value!: string;
  correoIngresado: string = '';


  esFrmCorreo: boolean = false;
  esFrmPregunta: boolean = false;
  esfrmVerficacion: boolean = false;
  esFrmResetPassword: boolean = false;
  formularioEnviado: boolean = false;




  constructor(public msg: mensageservice, private router: Router, private usuarioService: UsuarioService, private toastr: ToastrService, private formBuilder: FormBuilder) {



    this.frmSeleccion = this.formBuilder.group({
      opcion: new FormControl('pregunta'),
    });


    this.frmbuscarCorreo = this.formBuilder.group({
      correo: new FormControl('', [Validators.required, Validators.email]),
      // correo: new FormControl('', [Validators.required, Validators.email]),

    })


    this.frmVerificacion = this.formBuilder.group({
      codigo: new FormControl('', [Validators.required])
    })

    this.frmPregunta = this.formBuilder.group({})
  
    
    this.frmActualizaPassword = this.formBuilder.group({

      nueva: new FormControl('', [Validators.required]),
      confirma: new FormControl('', [Validators.required]),
      // password2: ['', Validators.required]
    })
  }





  inputControl: FormControl = new FormControl('');
  ngOnInit() {
    this.inputControl = new FormControl('');


    this.frmbuscarCorreo = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]]
    })

    


  }




  //    contactForm(form) {
  //   this.msg.sendMessage(form).subscribe(() => {
  //     this.swal('Formulario de contacto”, “Mensaje enviado correctamente”, ‘success');
  //   });
  // }

  seleccion() {
    if (this.frmSeleccion.value.opcion == "correo") {
      this.esFrmCorreo = true;
      this.toastr.success(`Has seleccionado la opción de recuperación por correo.`, 'Selección');
    } else if (this.frmSeleccion.value.opcion == "pregunta") {
      this.toastr.success(`Has seleccionado la opción de recuperación por pregunta.`, 'Selección');
      this.esFrmPregunta = true;
    } else {
      this.toastr.error(`Debes seleccionar una opción de recuperación.`, 'Error');
    }
    this.formularioEnviado = true;
  }

  enviarYbuscarCorreo() {
    const correo = this.frmbuscarCorreo.value.correo;
    console.log(correo)
    this.esFrmCorreo = true;
    this.usuarioService.enviarCorreo(correo).subscribe((response) => {
      if (response) {
        this.esFrmCorreo = false;
        this.toastr.info(`Revisa tu vandeja de correos.`, 'Envio');

        // const formulario = {
        //   nombre: 'Nombre del remitente',
        //   email: correo,
        //   asunto: 'Recuperación de contraseña',
        //   mensaje: 'Hola, has solicitado recuperar tu contraseña. Aquí está tu código de verificación: 1234'
        // };
        this.msg.enviarCorreo(correo).subscribe(
          () => {
            this.toastr.success('Correo electrónico enviado correctamente');
            this.esfrmVerficacion = true;
          },
          (error) => {
            console.error('Error al enviar correo electrónico:', error);
            this.toastr.error('Error al enviar correo electrónico');
            this.esfrmVerficacion = false;
          }
        );
      } else {
        this.esFrmCorreo = true;
        this.toastr.error('El correo no fue encontrado', 'Error');
        this.esfrmVerficacion = false;
      }
    },
      (error) => {
        console.error('No se encontró el correo:', error);
        this.toastr.error('No se encontró el correo', 'Error');
      }
    )

  }
  enviarCorreoElectronico(correo: string, mensaje: string) {
    // Lógica de envío de correo electrónico
    // Aquí puedes usar tu servicio o método para enviar el correo
    console.log(`Enviando correo electrónico a ${correo} con el mensaje: ${mensaje}`);
  }



  enviarRespuesta() {
    this.esFrmPregunta = false;
    this.toastr.info(`puesdes resetaer ahora tu password.`, 'Envio');
    this.esFrmResetPassword = true;
  }

  // comparacion de token en el usuario
  verficarCodigo() {
    this.esFrmCorreo = false;
    const correo = this.frmbuscarCorreo.value.correo;
    console.log("correo desde html=>", correo)
    

    const token = this.frmVerificacion.get('codigo')?.value;
    console.log("token desde html=>", token)





    this.usuarioService.enviarToken(correo, token).subscribe((response) => {
    
      console.log(response)
      if (response) {
        this.esfrmVerficacion = false;
        // esFrmResetPassword
        this.toastr.success('ya puedes actualizar tu password');

        this.esFrmResetPassword = true;
      } else {
        this.esFrmCorreo = false;
        this.toastr.error('El correo no fue encontrado', 'Error');
        this.esfrmVerficacion = true;
      }
    },
      (error) => {
      

        console.error('No se encontró el correo:', error);
        this.toastr.error('No se encontró el correo', 'Error');
     
      }
    )
  }


  
  ValidaPass(nueva: string, confirma: string): boolean {

    return nueva === confirma;
  }

  actualizaPassword() {
    this.esFrmResetPassword = true;
    const token = this.frmVerificacion.get('codigo')?.value;
    const correo = this.frmbuscarCorreo.value.correo;
    const nueva = this.frmActualizaPassword.get('nueva')?.value;
    console.log(nueva)
    const confirma = this.frmActualizaPassword.get('confirma')?.value;

    // Verifica que las contraseñas sean cadenas
    if (typeof nueva !== 'string' || typeof confirma !== 'string') {
      // Si alguna de las contraseñas no es una cadena, muestra un mensaje de error y retorna
      Swal.fire('Error', 'Las contraseñas no son válidas', 'error');
      return;
    }else if (nueva !== confirma) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    // Realiza la actualización de la contraseña
    this.usuarioService.actualizaPassword(token, correo, nueva).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          Swal.fire('¡Operación exitosa!', 'Se actualizó tu contraseña', 'success');
          this.router.navigate(['/login']); // Redirige al home del cliente
          this.esFrmResetPassword = false;
        } else {
          this.toastr.error('Los datos no fueron encontrados', 'Error');
          this.esFrmResetPassword = true;
        }
      },
      (error) => {
        console.error('No se encontró coincidencias:', error);
        this.toastr.error('Error al actualizar la contraseña', 'Error');
      }
    );
  }

}