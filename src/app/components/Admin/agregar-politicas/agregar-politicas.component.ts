import { Router } from '@angular/router';
import { AdminService } from './../../../services/admin.service';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
// import { AdminService } from './../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Politica } from 'src/app/models/privado';
// ReactiveFormsModule
@Component({
  selector: 'app-agregar-politicas',
  
  templateUrl: './agregar-politicas.component.html',
  styleUrl: './agregar-politicas.component.scss'
})
export class AgregarPoliticasComponent {
  frmAgregarPoliticas: FormGroup;

  
  listPoliticas: Politica[]=[]
  
  constructor(private adminService:AdminService,private router:Router,private toastr: ToastrService ,private formBuilder: FormBuilder) {
    




    this.frmAgregarPoliticas = this.formBuilder.group({
    titulo: ['', Validators.required],
    contenido: ['', Validators.required]
    
    })

    

  }

  

  ngOnInit(): void {
    this.obtenerPoliticas();
    
  }

  //                      ,//@@@.
  //                 .///////@@@@@@@&.
  //            ,////////////@@@@@@@@@@@@@/
  //       ./////////////////#@@@@@@@@@@@@@@@@@,
  //  ,/////////////////.         ,&@@@@@@@@@@@@@@@@#
  // /////////////.                     %@@@@@@@@@@@@@
  // /////////.                             .%@@@@@@@@
  // //////.                                   /@@@@@@
  // ///////     @@%     .@@/    .@@@@@@/      %@@@@@@
  // .//////     @@@@(   .@@/   @@@%. ,@@@#    @@@@@@&
  // .//////     @@%@@@  .@@/  &@@             @@@@@@(
  //  //////     @@# ,@@@.@@/  @@@   &@@@@@.   @@@@@@.
  //  //////,    @@#   %@@@@/  ,@@@    *@@#   ,@@@@@@
  //  //////.    @@#     @@@/    @@@@@@@@,    #@@@@@@
  //  ,//////                                 @@@@@@&
  //  .//////                                 @@@@@@/
  //   //////.      @@@  @@@  @@  @ @@@@     .@@@@@@.
  //   //////,     @    @   @ @ @ @ @==      (@@@@@@
  //   .//////      @@@  @@@  @  @@ @        &@@@@@@
  //   .///////.                           %@@@@@@@&
  //    ///////////                    ,@@@@@@@@@@@(
  //      ,///////////,             #@@@@@@@@@@@&
  //         .///////////.       &@@@@@@@@@@@%
  //            ./////////////@@@@@@@@@@@@*
  //               ./////////@@@@@@@@@@,
  //                   ./////@@@@@@%
  //                      .//@@@#
  


  obtenerPoliticas() {
    this.adminService.getPoliticas().subscribe(data => {
      this.listPoliticas = data;
      console.log(data)
    
    }, error => {
    console.log("ocurrio un error al obtener las politicas")
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
    } else {

    // const politica=this.frmAgregarPoliticas.get('politicas')?.value

      
      this.adminService.registrarPoliticas(POLITICA).subscribe(data => {
      
        console.log('Respuesta 02:', data)
        this.toastr.success('Politica registrado con éxito!', 'Registró éxitoso');
        // this.router.navigate(['/agregar-politicas']);
      }, error => {
        // this.router.navigate(['/agregar-politicas']);
        this.toastr.error('ocurrio un error!', 'Error');

      

        
      })


    }
    
  



    this.toastr.success("agregado",'succes');
  }













}
