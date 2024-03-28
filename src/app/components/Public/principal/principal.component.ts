import { Component, HostListener, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Emitters } from '../../Emitters/Emitter';
@Component({
  selector: 'app-principal',

  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  
  isScrolled: boolean = false;


  message!: string;
  
 
  constructor(private http: HttpClient) {
  }
  


  
  ngOnInit(): void {
    
    this.http.get('http://localhost:4000/usuarios/', { withCredentials: true })
      .subscribe((res: any) => {
        this.message = `Hi ${res.nombre}`;
        Emitters.authEmitter.emit(true);

      }, (err) => {
        this.message = `you are not logged in `;
        Emitters.authEmitter.emit(false);

      }
      )
    
  }

  



  @HostListener("window:scroll", [])
  onWindowScroll() {
    // const imagen = document.getElementById('imagen');
    // const imagenHeight = imagen?.offsetHeight;
    // const imagenTop = imagen, getBoundingClientRect().top + window.pageXOffset;
    

    this.isScrolled = window.scrollY  >150;
    // this
  }

}
