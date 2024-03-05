import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './components/Admin/producto/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/Admin/producto/crear-producto/crear-producto.component';
import { DetalleProductoComponent } from './components/Public/detalle-producto/detalle-producto.component';
  import { FilterPipe } from './pipes/filter/filter.pipe';
import {HeaderComponent} from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
// import { HomeComponent } from './components/Public/home/home.component';

import { AuthComponent } from './components/Auth/Auth.component';
import { CrearCuentaComponent } from './components/Public/crear-cuenta/crear-cuenta.component';
import { CardsProductosComponent } from './components/Public/cards-productos/cards-productos.component';
const routes: Routes = [
  
  {path:'',component:CardsProductosComponent},
  
  {path:'login',component:AuthComponent},
  {path:'crear-cuenta',component:CrearCuentaComponent},

  {path:'cards-productos',component:CardsProductosComponent},
  {path:'listar-productos',component:ListarProductosComponent},
  {path:'crear-producto',component:CrearProductoComponent},
  {path:'detalle-producto/:id',component:DetalleProductoComponent},//componente de ver detalles
  {path:'editar-producto/:id',component:CrearProductoComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule
  ]
})
  
export class AppRoutingModule { }
