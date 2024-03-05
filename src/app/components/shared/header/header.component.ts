
import { AfterViewInit, Component,Inject, ElementRef,HostListener,Renderer2, OnInit ,ViewChild, Injectable} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule}from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // standalone: true,
})
export class HeaderComponent implements OnInit{
  isScrolled: boolean = false;
  showFiller = false;
  menuOpen = false;


// nueva libreria 
public componentLinks = [
        {
            link: 'avatar',
            name: 'Avatar'
        },
        {
            link: 'badge',
            name: 'Badge'
        },
        {
            link: 'button-group',
            name: 'Button Group'
        }
    ];
    




  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('drawer', { read: ElementRef }) drawerElement!: ElementRef;
 constructor(private elementRef: ElementRef){}
 

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent): void {
    // Obtén el botón desde tu plantilla. Asegúrate de que el selector '#myButton' corresponda al id de tu botón.
  // Obtén el botón desde tu plantilla. Asegúrate de que el selector 'menu' corresponda al id de tu botón.
    const button = this.elementRef.nativeElement.id('#menu');
  
  // Si el clic fue en el botón, no hagas nada y sal de la función.
  // if (event.target === button) {
  //   return;
  // }

  // Si el menú está abierto y el clic no fue en el menú, cierra el menú.
  if (this.menuOpen && !this.drawerElement.nativeElement.contains(event.target)) {
    this.drawer.close();
    // Establece menuOpen a false.
    this.menuOpen = false;
  }
}
  

  openMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.menuOpen ? this.drawer.open() : this.drawer.close();

  }

  // constructor() { }
  // constructor() {}


  ngOnInit() {
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    // Lógica para determinar si la página está desplazada
    this.isScrolled = window.scrollY > 0;
  }
}
