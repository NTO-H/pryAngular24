import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { AfterViewInit, Component, Inject, ElementRef, HostListener, Renderer2, OnInit, ViewChild, Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Sidebar } from 'primeng/sidebar';
import { MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../../Emitters/Emitter';
import { AuthComponent } from '../../Auth/Auth.component';


@Component({
  selector: 'app-adm-header',
  // standalone: true,
  // imports: [],
  templateUrl: './adm-header.component.html',
  styleUrl: './adm-header.component.scss'
})
export class AdmHeaderComponent {
  isScrolled: boolean = false;
  showFiller = false;
  // menuOpen = false;

  loggingIn: boolean = false; // Variable para controlar el estado de carga

  isLoading = false;//variable rastreador de carga de producto

  constructor(private router: Router, private authService: AuthService) { }

  esUsuario(): boolean {
    const rol = this.authService.obtenerRolUsuario();
    return rol === 'usuario';
  }

  esAdmin(): boolean {
    const rol = this.authService.obtenerRolUsuario();
    return rol === 'admin';
  }




  // uso de breadumn
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit() {
    Emitters.authEmitter.subscribe((auth: boolean) => {

    })

    this.items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
  // --->



  formGroup!: FormGroup;
  rounded1: boolean = true;
  outlined1: boolean = true;
  sidebarVisible: boolean = false;

  authenticated = false;

  logout() {
    this.authService.logout();

    console.log("sesion cerrada")
    this.isLoading = true; // Establecer el estado de carga a false
    localStorage.removeItem('rol');
  //  this.router.navigate(['/']); // Redirige al home del cliente
    window.location.reload();
 

    // Realiza cualquier otra lógica que necesites al cerrar sesión, como redirigir al usuario a la página de inicio
  }



  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}