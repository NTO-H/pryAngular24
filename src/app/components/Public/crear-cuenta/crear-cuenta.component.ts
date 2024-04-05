import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { PreguntaS, Usuario } from 'src/app/models/usuario';
import { MessageService } from 'primeng/api';
import { Pregunta } from 'src/app/models/privado';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss'],
  providers: [MessageService]
})
export class CrearCuentaComponent implements OnInit {
  // usuarioForm!: FormGroup;
  value: number | undefined;


  // seccion de formularios
  frmSeccionDatosPersonales: FormGroup;
  frmSeccionDatosPrivados!: FormGroup;
  
// seccion  de directivas para formularios 
  esFormulario1 : boolean = true;
  esFormulario2 : boolean = false;
  esFormulario3 : boolean = false;
  preguntaSeleccionada: string = '';



  preguntas :PreguntaS[]=[]

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _UsuarioService: UsuarioService) {




    this.frmSeccionDatosPersonales = this.formBuilder.group({
       nombre: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
    });


    this.frmSeccionDatosPrivados = this.formBuilder.group({
      // nombre: ['', Validators.required],
      // correo: ['', Validators.required],
      pass: ['', Validators.required],
      confirmpass: ['', Validators.required],
      // telefono: ['', Validators.required],
      pregunta: ['', Validators.required], // Hacer que la pregunta sea requerida
      respuesta: ['', Validators.required],
    });
  }
  volverAFormulario1() {
    this.esFormulario1 = true;
    this.esFormulario2 = false;
  }


  ngOnInit() {
    this.obtenerPreguntas();
  }



  obtenerPreguntas() {
    
    this._UsuarioService.getPreguntas().subscribe((data: PreguntaS[]) => {
      this.preguntas = data;
      console.log(this.preguntas)
    })

  }

  ValidarCorreo(correo: string) {
    const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return correo.match(validRegex) !== null;
  }
  limitarLongitud(event: any) {
    const input = event.target;
    const maxLength = 10; // Máximo 10 caracteres
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength); // Limitar la longitud
      this.frmSeccionDatosPersonales.get('telefono')?.setValue(input.value); // Actualizar el valor del formulario
    }
  }

  

  ValidaPass(pass: string, confPass: string) :boolean{
  
    return pass === confPass;
  }
  actualizarContador() {
    const telefonoControl = this.frmSeccionDatosPersonales.get('telefono');
    if (telefonoControl && telefonoControl.value) {
      telefonoControl.setValue(telefonoControl.value.substring(0, 10)); // Limitar a 10 caracteres
    }
  }
  tomarDatosPersonales() {

    
    const nombre = this.frmSeccionDatosPersonales.get('nombre')?.value;
    const correo = this.frmSeccionDatosPersonales.get('correo')?.value;
    const telefono = this.frmSeccionDatosPersonales.get('telefono')?.value;
    // Validar que el campo nombre no esté vacío
    if (!nombre) {
      Swal.fire('Error', 'Por favor ingresa tu nombre', 'error');
      return;
    }
    // Validar que el campo correo no esté vacío
    if (!correo) {
      Swal.fire('Error', 'Por favor ingresa tu correo electrónico', 'error');
      return;
    }

    // Validar que el campo teléfono no esté vacío
    if (!telefono &&  telefono!='Number') {
      Swal.fire('Error', 'Por favor ingresa tu número de teléfono', 'error');
      return;
    }

    
    if (!this.ValidarCorreo(correo)) {
      Swal.fire('Error', 'Correo no válido', 'error');
    } else if (nombre === '' || correo === '' ||telefono === '' ) {
      Swal.fire('Error', 'Ingresa los datos correctamente', 'error');

    }else {
      this.esFormulario2 = true;
      this.esFormulario1 = false;

    }
  }

  registrarUsuario() {
   // this.esFormulario1 = false;


    


    const pass = this.frmSeccionDatosPrivados.get('pass')?.value;
    const confirmpass = this.frmSeccionDatosPrivados.get('confirmpass')?.value;
    const respuesta = this.frmSeccionDatosPrivados.get('respuesta')?.value;




    








    const lengthRegex = /^.{8,}$/;
    const lettersRegex = /[a-zA-Z].*[a-zA-Z]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const specialCharacterRegex = /[@$!%*?&]/;

    if (!lengthRegex.test(pass)) {
      this.toastr.error('La contraseña debe tener al menos 8 caracteres.','error');
      return;
    }

    if (!lettersRegex.test(pass)) {
      this.toastr.error('La contraseña debe contener al menos 2 letras.','error');
      return;
    }

    if (!upperCaseRegex.test(pass)) {
      this.toastr.error('La contraseña debe contener al menos una letra mayúscula.','error');
      return;
    }

    if (!lowerCaseRegex.test(pass)) {
      this.toastr.error('La contraseña debe contener al menos una letra minúscula.','error');
      return;
    }

    if (!numberRegex.test(pass)) {
      this.toastr.error('La contraseña debe contener al menos un número.','error');
      return;
    }

    if (!specialCharacterRegex.test(pass)) {
      this.toastr.error('La contraseña debe contener al menos un carácter especial.','error');
      return;
    }

    if (pass !== confirmpass) {
      this.toastr.error('Las contraseñas no coinciden.','error');
      return;
    }



    if (!this.ValidaPass(pass, confirmpass)) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      // ("las contraseñas no coinciden")
    }














    // Validar que el campo contraseña no esté vacío
    if (!pass) {
      Swal.fire('Error', 'Por favor ingresa una contraseña', 'error');
      return;
    }

    // Validar que el campo confirmar contraseña no esté vacío
    if (!confirmpass) {
      Swal.fire('Error', 'Por favor confirma tu contraseña', 'error');
      return;
    }
    if (this.frmSeccionDatosPrivados.get('pregunta')?.value === '') {
      Swal.fire('Error', 'Por favor selecciona una pregunta', 'error');
      return; // No permitir enviar el formulario si no se ha seleccionado una pregunta
    }

    // Validar que el campo respuesta no esté vacío
    if (!respuesta) {
      Swal.fire('Error', 'Por favor ingresa una respuesta', 'error');
      return;
    }




    
    const USUARIO: Usuario = {
      nombre: this.frmSeccionDatosPersonales.get('nombre')?.value,
      correo: this.frmSeccionDatosPersonales.get('correo')?.value,
      telefono: this.frmSeccionDatosPersonales.get('telefono')?.value,
      pass: this.frmSeccionDatosPrivados.get('pass')?.value,
      confirmpass: this.frmSeccionDatosPrivados.get('confirmpass')?.value,
      token:'',
      pregunta: this.frmSeccionDatosPrivados.get('pregunta')?.value?.pregunta,
      respuesta: this.frmSeccionDatosPrivados.get('respuesta')?.value,
    };

    

   
      this._UsuarioService.guardarUsuario(USUARIO).subscribe(response => {
        // this.toastr.success('Usuario agregado con éxito!', 'Success');
        Swal.fire('Exitoso', 'Usuario agregado con éxito!', 'success');

      }, error => {
        this.toastr.error('El correo ya se encuentra registrado', 'Error');
      });
    
  }
}
