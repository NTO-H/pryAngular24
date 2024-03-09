
import { AfterViewInit, Component,Inject, ElementRef,HostListener,Renderer2, OnInit ,ViewChild, Injectable} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule}from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Sidebar } from 'primeng/sidebar';
import { MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';

// import { MenuItem } from 'primeng/api';

interface City {
  name: string,
  code: string
}


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


  


  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark'
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video'
              }
            ]
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
          },
          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left'
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          }
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
      }
    ];
  }
  

  cities!: City[];

  formGroup!: FormGroup;

  // ngOnInit() {
   
  // } 


  rounded1: boolean = true;
  outlined1:boolean = true;
  




  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e:any): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
  


  // menusonctnido
  // items: MenuItem[] | undefined;

  // ngOnInit() {
  //   this.items = [
  //     {
  //       label: 'Options',
  //       items: [
  //         {
  //           label: '<span class="text-xl font-bold" style="min-width: 150px;">Refresh</span>',
  //           escape: false,
  //           icon: 'pi pi-refresh',
  //           iconClass: 'text-xl'
  //         },
  //         {
  //           label: '<span class="text-xl font-bold" style="min-width: 150px;">Delete</span>',
  //           escape: false,
  //           icon: 'pi pi-times',
  //           iconClass: 'text-xl'
  //         }
  //       ]
  //     },
  //     {
  //       label: 'Navigate',
  //       items: [
  //         {
  //           label: '<span class="text-xl font-bold" style="min-width: 150px;">Angular</span>',
  //           icon: 'pi pi-external-link',
  //           url: 'http://angular.io'
  //         },
  //         {
  //           label: '<span class="text-xl font-bold" style="min-width: 150px;">Router</span>',
  //           icon: 'pi pi-upload',
  //           routerLink: '/fileupload'
  //         }
  //       ]
  //     }
  //   ];

  // }
// menusonctnido

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


  // ngOnInit() {
  // }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    // Lógica para determinar si la página está desplazada
    this.isScrolled = window.scrollY > 0;
  }
}
