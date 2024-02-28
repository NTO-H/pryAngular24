import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// componentes
import { AppComponent } from './app.component';
import { CrearProductoComponent } from './components/Admin/producto/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './components/Admin/producto/listar-productos/listar-productos.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule}from'@angular/common/http';

import { DetalleProductoComponent } from './components/Public/detalle-producto/detalle-producto.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import {HeaderComponent}  from './components/shared/header/header.component';
import { FormsModule} from '@angular/forms';
import { CardsProductosComponent } from './components/Public/cards-productos/cards-productos.component';
// import { TarjetasComponent } from './home/tarjetas/tarjetas.component';
import { ButtonModule } from 'primeng/button'; // Import the ButtonModule
import { MatButtonModule } from '@angular/material/button';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconButton } from '@angular/material/button';
import { MatIconModule} from'@angular/material/icon';
// ./filter.pipez
import { FooterComponent } from './components/shared/footer/footer.component';

// import { ComponentesComponent } from './Componentes/Componentes.component';
@NgModule({

  declarations: [		

    AppComponent,
    CrearProductoComponent,
    ListarProductosComponent,
    DetalleProductoComponent,
    FilterPipe,HeaderComponent,CardsProductosComponent,FooterComponent,
     
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
   BrowserAnimationsModule,
   ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,MatButtonModule,MatIconModule,
    ButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




// src/app/app.module.ts:

// Propósito: Define el módulo principal de la aplicación.
// Funcionalidad: En este archivo, se registran todos los
//  componentes, servicios y otras dependencias que forman
//   parte del módulo principal de la aplicación. También puede 
// contener configuraciones específicas del módulo.