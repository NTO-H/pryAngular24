import { ErrorStateMatcher } from '@angular/material/core';

import { SidebarModule } from 'primeng/sidebar';
// import { ToastModule } from 'primeng/toast';;
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
import { CrearProductoComponent } from './components/Admin/producto/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './components/Admin/producto/listar-productos/listar-productos.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DetalleProductoComponent } from './components/Public/detalle-producto/detalle-producto.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { HeaderComponent } from './components/shared/header/header.component';
import { FormsModule } from '@angular/forms';
import { CardsProductosComponent } from './components/Public/cards-productos/cards-productos.component';
// import { TarjetasComponent } from './home/tarjetas/tarjetas.component';
import { ButtonModule } from 'primeng/button'; // Import the ButtonModule
import { MatButtonModule } from '@angular/material/button';
// import { AppModule } from './app.module';
// 
// import { RecuperacionComponent } from './components/Public/recuperacion/recuperacion.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

// import { ButtonModule } from 'primeng/button';
// import { FloatLabelModule } from 'primeng/;
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { FloatLabelModule}from'primeng/

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatDrawer } from '@angular/material/sidenav';
// import {ButtonModule} from 'primeng/button';
//  import { CrearCuentaComponent } from './components/Public/crear-cuenta/crear-cuenta.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import{di}
import { DividerModule } from 'primeng/divider';
// No se encuentra el módulo "primeng/floatlabel" ni sus declaraciones de tipos correspondientes.ts(2307)
import { InputTextModule } from 'primeng/inputtext';
import { CrearCuentaComponent } from './components/Public/crear-cuenta/crear-cuenta.component';
// import { ComponentesComponent } from './Componentes/Componentes.componentes';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { IgxButtonModule, IgxIconModule, IgxLayoutModule, IgxNavigationDrawerModule, IgxRippleModule, IgxToggleModule } from "igniteui-angular";
import { RouterModule } from '@angular/router';
// import { NavDrawerRoutingComponent } from "./nav-drawer-routing/nav-drawer-routing.component";
import { AccordionModule } from 'primeng/accordion';
import { PrincipalComponent } from './components/Public/principal/principal.component';

import { PasswordModule } from 'primeng/password';

import { CardModule } from 'primeng/card';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { AuthComponent } from './components/Auth/Auth.component';
import { AyudaComponent } from './components/Public/ayuda/ayuda.component';
import { RecuperacionComponent } from './components/Public/recuperacion/recuperacion.component';
@NgModule({

  declarations: [
  
    AppComponent,AyudaComponent,
    CrearCuentaComponent, PrincipalComponent,
    CrearProductoComponent, RecuperacionComponent,
    ListarProductosComponent,
    DetalleProductoComponent,AuthComponent,
    FilterPipe, CardsProductosComponent, FooterComponent, HeaderComponent
  ],
  imports: [MenuModule, ListboxModule,
    SidebarModule, MdbCheckboxModule, AvatarGroupModule, AvatarModule,
    BrowserModule, CommonModule, AccordionModule,
    AppRoutingModule, PasswordModule,
    ReactiveFormsModule, MatSnackBarModule, InputGroupAddonModule,
    BrowserAnimationsModule, InputGroupModule, MdbAccordionModule,
    ToastrModule.forRoot(), CardModule, DividerModule, MenubarModule,
    HttpClientModule, MatListModule, MatIconButton,
    FormsModule, MatButtonModule, MatIconModule, MatDrawer, MatPaginatorModule, MatButtonToggleModule,
    ButtonModule, ProgressSpinnerModule, MatSidenavModule, MatInputModule, ToastModule, InputTextModule

  ],
  providers: [
    provideAnimationsAsync(), MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

//I keep the new line
// src/app/app.module.ts:

// Propósito: Define el módulo principal de la aplicación.
// Funcionalidad: En este archivo, se registran todos los
//  componentes, servicios y otras dependencias que forman
//   parte del módulo principal de la aplicación. También puede
// contener configuraciones específicas del módulo.
