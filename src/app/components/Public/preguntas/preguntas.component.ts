import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-preguntas',
  // standalone: true,
  // imports: [],
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.scss'
})
export class PreguntasComponent {

  listPreguntas: any[] = []; //
  activeIndex: number = -1; // Va

  ngOnInit(): void {
    this.ontenerPreguntas();

  }


  constructor(private adminService: AdminService,) { }

  ontenerPreguntas() {
    this.adminService.getPreguntas().subscribe(data => {
      this.listPreguntas = data;
      console.log(data)

    }, error => {
      console.log("ocurrio un error al obtener las politicas")
    })
  }



}
