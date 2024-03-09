
import { AfterViewInit, Component,Inject, ElementRef,HostListener,Renderer2, OnInit ,ViewChild, Injectable} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule}from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Sidebar } from 'primeng/sidebar';
import { MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';

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


  ngOnInit() {
   
  }
  


  formGroup!: FormGroup;


  rounded1: boolean = true;
  outlined1:boolean = true;
  




  sidebarVisible: boolean = false;
  


  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
