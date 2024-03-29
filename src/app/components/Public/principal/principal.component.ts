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
  

  items = [
    { image: 'path/to/image1.jpg', text: 'Texto de la imagen 1' },
    { image: 'path/to/image2.jpg', text: 'Texto de la imagen 2' },
    { image: 'path/to/image3.jpg', text: 'Texto de la imagen 3' }
  ];
  currentIndex = 0;
  interval: any;
  isBlurred = false;



  startCarousel() {
    this.interval = setInterval(() => {
      this.isBlurred = true; // Agrega la clase de desenfoque
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.isBlurred = false; // Quita la clase de desenfoque después de un breve retraso
      }, 500); // Espera 0.5 segundos antes de cambiar la imagen
    }, 3000); // Cambia la imagen cada 3 segundos (3000 ms)
  }

  ngOnDestroy() {
    clearInterval(this.interval); // Limpia el intervalo cuando el componente se destruye
  }

  
  
  ngOnInit(): void {
    
    this.startCarousel();

    
    this.http.get('https://servidortropicalworld-1.onrender.com/usuarios/', { withCredentials: true })
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
