import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/privado';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-preguntas',
  // standalone: true,
  // imports: [],
  templateUrl: './agregar-preguntas.component.html',
  styleUrl: './agregar-preguntas.component.scss'
})
export class AgregarPreguntasComponent {



  id: string | null;


  titulo = 'Agregar Pregunta';
  btnTitle = 'Agregar';
  frmAgregarPreguntas: FormGroup;



  listPreguntas: Pregunta[] = []


  constructor(private aRouter: ActivatedRoute, private adminService: AdminService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) {

    this.frmAgregarPreguntas = this.formBuilder.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');

  }
  ngOnInit(): void {
    this.obtenerPreguntas();
  }


  eliminarPregunta(id: any) {
    console.log("esEliminar=>", id)



    this.adminService.eliminarPregunta(id).subscribe((data) => {
      this.obtenerPreguntas()
      this.toastr.success('Politica eliminado con éxito', 'Politica eliminado')

    }, error => {
      this.obtenerPreguntas()
      this.toastr.error('Politica no  elimando', 'Falló al eliminar')

    })


  }




  obtenerPreguntas() {
    this.adminService.getPreguntas().subscribe(data => {
      this.listPreguntas = data;
      console.log(data)

    }, error => {
      console.log("ocurrio un error al obtener las politicas")
    })

  }

  
  agregarPregunta() {


    const PREGUNTA: Pregunta = {
      titulo: this.frmAgregarPreguntas.get('titulo')?.value,
      contenido: this.frmAgregarPreguntas.get('contenido')?.value,

    };


    if (this.frmAgregarPreguntas.get('titulo')?.value === '') {
      Swal.fire('Error', 'Por favor selecciona una pregunta', 'error');
      return; // No permitir enviar el formulario si no se ha seleccionado una pregunta
    }
    console.log("id obtenido=>", this.id)


    if (this.id !== null) {
      // Si es una edición, llamar al método editarProducto con el ID y el objeto formData
      this.adminService.editarPregunta(this.id, PREGUNTA).subscribe(()=>{
        this.id = null;
        this.titulo = 'Agregar Pregunta';
        this.btnTitle = 'Agregar';
          this.obtenerPreguntas()
        
        this.toastr.info('Pregunta actualizado con éxito!', 'Actualizado');
        this.frmAgregarPreguntas.reset();
        },
        (error) => {
          this.toastr.error('Ocurrio un error al actualizar la Pregunta')
          this.frmAgregarPreguntas.reset();
        }
        
      )
    } else {
      this.adminService.registrarPreguntas(PREGUNTA).subscribe(data => {

        console.log('Respuesta 02:', data)
        this.toastr.success('Politica registrado con éxito!', 'Registró éxitoso');
        this.obtenerPreguntas()
        this.frmAgregarPreguntas.reset();
      }, error => {
        this.toastr.error('ocurrio un error!', 'Error');
        this.frmAgregarPreguntas.reset();
      })
    }
  }

  editar(_id: any) {
    
    
      this.id = _id;
    if (this.id) {
      this.titulo = 'Editar Pregunta';
      this.btnTitle = 'Actualizar';
      this.adminService.obtenerPregunta(_id).subscribe((data) => {
        this.frmAgregarPreguntas.setValue({
          titulo: data.titulo,
          contenido: data.contenido,
        }
        );
      });
    }
  }




}
