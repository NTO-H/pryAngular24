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


  preguntas =[
    { label: '¿nombre de tu mejor amigo?', value: 'nombre_amigo' },
    { label: '¿color favorito?', value: 'color_favorito' },
    { label: '¿equipo de futbol?', value: 'equipo_futbol' }
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
    if (this.usuarioForm.get('pregunta')?.value === '') {
      Swal.fire('Error', 'Por favor selecciona una pregunta', 'error');
      return; // No permitir enviar el formulario si no se ha seleccionado una pregunta
    }


    




    
    const USUARIO: Usuario = {
      nombre: this.usuarioForm.get('nombre')?.value,
      correo: this.usuarioForm.get('correo')?.value,
      telefono: this.usuarioForm.get('telefono')?.value,
      pass: this.usuarioForm.get('pass')?.value,
      confirmpass: this.usuarioForm.get('confirmpass')?.value,
      token:'',
      pregunta: this.usuarioForm.get('pregunta')?.value,
      respuesta: this.usuarioForm.get('respuesta')?.value,
    };


   


    if (!this.ValidarCorreo(USUARIO.correo)) {
      Swal.fire('Error', 'Correo no válido', 'error');
    } else if (USUARIO.nombre === '' || USUARIO.correo === '' || USUARIO.pass === '') {
      Swal.fire('Error', 'Ingresa los datos correctamente', 'error');
    
    } else if (!this.ValidaPass(USUARIO.pass, USUARIO.confirmpass)){
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
// ("las contraseñas no coinciden")
    }
    else
    {
      this._UsuarioService.guardarUsuario(USUARIO).subscribe(response => {
        this.toastr.success('Usuario agregado con éxito!', 'Success');
        console.log('Nombre:', USUARIO.nombre, 'Correo:', USUARIO.correo);
      }, error => {
        this.toastr.error('El correo ya se encuentra registrado', 'Error');
      });
    }
  }
}
