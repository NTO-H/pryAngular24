import { AuthService } from 'src/app/services/auth.service';

import { AfterViewInit, Component,Inject, ElementRef,HostListener,Renderer2, OnInit ,ViewChild, Injectable} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule}from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Sidebar } from 'primeng/sidebar';
import { MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../../Emitters/Emitter';
import { AuthComponent } from '../../Auth/Auth.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // standalone: true,
})
export class HeaderComponent implements OnInit{
  isScrolled: boolean = false;
  showFiller = false;
  // menuOpen = false;

  
  menuVisible: boolean = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  
  constructor(private authService: AuthService) { }
  
  esUsuario(): boolean {
    const rol = this.authService.obtenerRolUsuario();
    return rol === 'usuario';
  }

  esAdmin(): boolean {
    const rol = this.authService.obtenerRolUsuario();
    return rol === 'admin';
  }




// uso de breadumn
  // items: MenuItem[] | undefined;

  // home: MenuItem | undefined;

  ngOnInit() {
    Emitters.authEmitter.subscribe((auth: boolean) => {
    
    })
    
    // this.items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];

    // this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
  // --->



  formGroup!: FormGroup;
  rounded1: boolean = true;
  outlined1:boolean = true;
  sidebarVisible: boolean = false;
  
  authenticated = false;


  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
