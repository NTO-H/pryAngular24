import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './components/Admin/producto/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/Admin/producto/crear-producto/crear-producto.component';
import { DetalleProductoComponent } from './components/Public/detalle-producto/detalle-producto.component';
  import { FilterPipe } from './pipes/filter/filter.pipe';
import {HeaderComponent} from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
// import { HomeComponent } from './components/Public/home/home.component';
import { PrincipalComponent } from './components/Public/principal/principal.component';
import { QuienesSomosComponent } from './components/Public/quienes-somos/quienes-somos.component';
import { AuthComponent } from './components/Auth/Auth.component';
import { CrearCuentaComponent } from './components/Public/crear-cuenta/crear-cuenta.component';
import { CardsProductosComponent } from './components/Public/cards-productos/cards-productos.component';
import { PoliticasComponent } from './components/Public/politicas/politicas.component';
import { IotComponent } from './components/iot/iot.component';
import { AyudaComponent } from './components/Public/ayuda/ayuda.component';
import { PreguntasComponent } from './components/Public/preguntas/preguntas.component';
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { RecuperacionComponent } from './components/Public/recuperacion/recuperacion.component';
// import { RecuperacionComponent } from './components/Public/recuperacion/recuperacion.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'recuperacion', component: RecuperacionComponent },

  { path: 'preguntas', component: PreguntasComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'iot', component: IotComponent },
  { path: 'login', component: AuthComponent },
  { path: 'politicas', component: PoliticasComponent },
  {path:'crear-cuenta',component:CrearCuentaComponent},
  { path: 'quienesSomos', component: QuienesSomosComponent },
  {path:'cards-productos',component:CardsProductosComponent},
  {path:'listar-productos',component:ListarProductosComponent},
  {path:'crear-producto',component:CrearProductoComponent},
  { path:'detalles/:id',component:DetalleProductoComponent},//componente de ver detalles
  {path:'editar-producto/:id',component:CrearProductoComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule
  ]
})
  
export class AppRoutingModule { }
