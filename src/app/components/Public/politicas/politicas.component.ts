import { Component } from '@angular/core';
import { Politica } from 'src/app/models/privado';
import { AdminService } from './../../../services/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-politicas',
 
  templateUrl: './politicas.component.html',
  styleUrl: './politicas.component.scss'
})
export class PoliticasComponent {

  listPoliticas: any[] = []; // Aquí deberías tener tu lista de políticas
  activeIndex: number = -1; // Va

  ngOnInit(): void {
    this.obtenerPoliticas();

  }


  constructor(private adminService: AdminService,){}

  obtenerPoliticas() {
    this.adminService.getPoliticas().subscribe(data => {
      this.listPoliticas = data;
      console.log(data)

    }, error => {
      console.log("ocurrio un error al obtener las politicas")
    })
  }

  

}
