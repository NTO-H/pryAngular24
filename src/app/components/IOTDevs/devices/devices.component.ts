import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router, response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { DispositivoService } from 'src/app/services/dispositivo.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss'
})
export class DevicesComponent {

  sidebarVisible2: boolean = false;
  frmCrearDev: FormGroup;
      id: string | null;

  constructor(private toastr: ToastrService, private aRouter:ActivatedRoute,private fb: FormBuilder,private dvs:DispositivoService) {
  
    
    this.frmCrearDev = this.fb.group({
      devName: ['', Validators.required],
      devLabel: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');

  }

    crearDispositivo(){
    
      this.dvs.crearDispositivo(this.frmCrearDev.value).subscribe(response=>{
        this.toastr.success('Producto registrado con éxito!', 'Registró éxitoso');

      },
        error => {
          this.toastr.error('Error al guardar!', 'Registró fallido');

        }
      
      )
    }
    



  




}
