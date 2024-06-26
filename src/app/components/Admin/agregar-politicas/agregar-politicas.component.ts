import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
// import { AdminService } from './../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Politica } from 'src/app/models/privado';
import { error } from 'console';
// ReactiveFormsModule
@Component({
  selector: 'app-agregar-politicas',

  templateUrl: './agregar-politicas.component.html',
  styleUrl: './agregar-politicas.component.scss'
})
export class AgregarPoliticasComponent {
  frmAgregarPoliticas: FormGroup;

  visible: boolean = false;

  position: string = 'center';

  showDialog(position: string) {
    this.position = position;
    this.visible = true;
  }
  titulo = 'Agregar Politica';
  btnTitle = 'Agregar';


  id: string | null;
  listPoliticas: Politica[] = []

  constructor(private aRouter: ActivatedRoute, private adminService: AdminService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) {





    this.frmAgregarPoliticas = this.formBuilder.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required]

    })
    this.id = this.aRouter.snapshot.paramMap.get('id')


  }



  ngOnInit(): void {
    this.obtenerPoliticas();
    // this.esEditar();

  }

  obtenerPoliticas() {
    this.adminService.getPoliticas().subscribe(data => {
      this.listPoliticas = data;
      console.log(data)

    }, error => {
      console.log("ocurrio un error al obtener las politicas")
    })





  }


  eliminarPolitica(id: any) {
    console.log("esEliminar=>", id)



    this.adminService.eliminarPolitica(id).subscribe((data) => {
      this.obtenerPoliticas()
      this.toastr.success('Politica eliminado con éxito', 'Politica eliminado')

    }, error => {
      this.obtenerPoliticas()
      this.toastr.error('Politica no  elimando', 'Falló al eliminar')

    })


  }




  agregarPolitica() {


    const POLITICA: Politica = {
      titulo: this.frmAgregarPoliticas.get('titulo')?.value,
      contenido: this.frmAgregarPoliticas.get('contenido')?.value,

    };


    if (this.frmAgregarPoliticas.get('politica')?.value === '') {
      Swal.fire('Error', 'Por favor selecciona una pregunta', 'error');
      return; // No permitir enviar el formulario si no se ha seleccionado una pregunta
    }

    // const politica=this.frmAgregarPoliticas.get('politicas')?.value
    console.log("id obtenido=>", this.id)
    if (this.id !== null) {
      this.adminService.editarPolitica(this.id, POLITICA).subscribe(() => {
        this.visible = false;
        this.toastr.success('Politica actualizado correctamente')

        this.obtenerPoliticas()
      }, (error) => {
        this.toastr.error('Ocurrio un error al actualizar la politica')
      }

      )
    } else {
      this.adminService.registrarPoliticas(POLITICA).subscribe(data => {
        this.visible = false;

        console.log('Respuesta 02:', data)
        this.toastr.success('Politica registrado con éxito!', 'Registró éxitoso');
        this.obtenerPoliticas()
        // this.router.navigate(['/agregar-politicas']);
      }, error => {
        // this.router.navigate(['/agregar-politicas']);
        this.toastr.error('ocurrio un error!', 'Error');

      })

    }
  }





  editar(_id: any) {
    // this.position = position;
    this.visible = true;
    this.id = _id;
    console.log("esEditar", _id)
    if (_id) {
      this.titulo = 'Editar Politica';
      this.btnTitle = 'Actualizar';
      this.adminService.obtenerPolitica(_id).subscribe((data) => {
        this.frmAgregarPoliticas.setValue(
          {
            titulo: data.titulo,
            contenido: data.contenido
          })
      })
    }
  }
}
