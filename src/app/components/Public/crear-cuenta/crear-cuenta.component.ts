import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { MessageService } from 'primeng/api';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss'],
  providers: [MessageService]
})
export class CrearCuentaComponent implements OnInit {
  usuarioForm!: FormGroup;
  value: number | undefined;


  preguntas = [
    { label: '¿Nombre de tu mejor amigo?' },
    { label: '¿Color favorito?' },
    { label: '¿Equipo de fútbol?' }
  ];

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _UsuarioService: UsuarioService) {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      pass: ['', Validators.required],
      confirmpass: ['', Validators.required],
      telefono: ['', Validators.required],
      pregunta: ['', Validators.required], // Hacer que la pregunta sea requerida
      respuesta: ['', Validators.required],
    });
  }

  ngOnInit() {

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
      this.usuarioForm.get('telefono')?.setValue(input.value); // Actualizar el valor del formulario
    }
  }

  

  ValidaPass(pass: string, confPass: string) :boolean{
  
    return pass === confPass;
  }
  actualizarContador() {
    const telefonoControl = this.usuarioForm.get('telefono');
    if (telefonoControl && telefonoControl.value) {
      telefonoControl.setValue(telefonoControl.value.substring(0, 10)); // Limitar a 10 caracteres
    }
  }

  registrarUsuario() {
    


    

    // Validar cada campo individualmente
    const nombre = this.usuarioForm.get('nombre')?.value;
    const correo = this.usuarioForm.get('correo')?.value;
    const telefono = this.usuarioForm.get('telefono')?.value;
    const pass = this.usuarioForm.get('pass')?.value;
    const confirmpass = this.usuarioForm.get('confirmpass')?.value;
    const respuesta = this.usuarioForm.get('respuesta')?.value;

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
    if (!telefono) {
      Swal.fire('Error', 'Por favor ingresa tu número de teléfono', 'error');
      return;
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
    if (this.usuarioForm.get('pregunta')?.value === '') {
      Swal.fire('Error', 'Por favor selecciona una pregunta', 'error');
      return; // No permitir enviar el formulario si no se ha seleccionado una pregunta
    }

    // Validar que el campo respuesta no esté vacío
    if (!respuesta) {
      Swal.fire('Error', 'Por favor ingresa una respuesta', 'error');
      return;
    }




    
    // const USUARIO: Usuario = {
    //   nombre: this.usuarioForm.get('nombre')?.value,
    //   correo: this.usuarioForm.get('correo')?.value,
    //   telefono: this.usuarioForm.get('telefono')?.value,
    //   pass: this.usuarioForm.get('pass')?.value,
    //   confirmpass: this.usuarioForm.get('confirmpass')?.value,
    //   token:'',
    //   pregunta: this.usuarioForm.get('pregunta')?.value,
    //   respuesta: this.usuarioForm.get('respuesta')?.value,
    // };


   


    if (!this.ValidarCorreo(correo)) {
      Swal.fire('Error', 'Correo no válido', 'error');
    } else if (nombre === '' || correo === '' || pass === '') {
      Swal.fire('Error', 'Ingresa los datos correctamente', 'error');
    
    } else if (!this.ValidaPass(pass, confirmpass)){
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
// ("las contraseñas no coinciden")
    }
    else
    {
      this._UsuarioService.guardarUsuario(this.usuarioForm.value).subscribe(response => {
        // this.toastr.success('Usuario agregado con éxito!', 'Success');
        Swal.fire('Exitoso', 'Usuario agregado con éxito!', 'success');

        console.log('Nombre:', nombre, 'Correo:',correo);
      }, error => {
        this.toastr.error('El correo ya se encuentra registrado', 'Error');
      });
    }
  }
}
