import { ListarUsuariosComponent } from './components/Admin/usuario/listar-usuarios/listar-usuarios.component';
import { CarritoComponent } from './components/shared/carrito/carrito.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { clientGuard, adminGuard } from './components/guards/private.guard';
// clientGuard
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './components/Admin/producto/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/Admin/producto/crear-producto/crear-producto.component';
import { DetalleProductoComponent } from './components/Public/detalle-producto/detalle-producto.component';
  import { FilterPipe } from './pipes/filter/filter.pipe';
import {HeaderComponent} from './components/shared/header/header.component';
import { PrincipalComponent } from './components/Public/principal/principal.component';
import { QuienesSomosComponent } from './components/Public/quienes-somos/quienes-somos.component';
import { AuthComponent } from './components/Auth/Auth.component';
import { CrearCuentaComponent } from './components/Public/crear-cuenta/crear-cuenta.component';
import { CardsProductosComponent } from './components/Public/cards-productos/cards-productos.component';
import { PoliticasComponent } from './components/Public/politicas/politicas.component';
import { AyudaComponent } from './components/Public/ayuda/ayuda.component';
import { PreguntasComponent } from './components/Public/preguntas/preguntas.component';
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { RecuperacionComponent } from './components/Public/recuperacion/recuperacion.component';
// import { UsuarioHomeComponent } from './components/usuario/usuario-home/usuario-home.component';
import { AdminHomeComponent } from './components/Admin/admin-home/admin-home.component';
import { ClientHomeComponent } from './components/client/client-home/client-home.component';
import { PerfilComponent } from './components/Public/perfil/perfil.component';
import { AgregarPoliticasComponent } from './components/Admin/agregar-politicas/agregar-politicas.component';
import { AgregarPreguntasComponent } from './components/Admin/agregar-preguntas/agregar-preguntas.component';
import { DevicesComponent } from './components/IOTDevs/devices/devices.component';
import { TablaDispositivosComponent } from './components/IOTDevs/tabla-dispositivos/tabla-dispositivos.component';
import { DashboardsComponent } from './components/IOTDevs/dashboards/dashboards.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  // { path: '', component: PrincipalComponent },

  { path: 'ayuda', component: AyudaComponent },
  { path: 'preguntas', component: AgregarPreguntasComponent },
  { path: 'preguntasPublic', component: PreguntasComponent },
  { path: 'recuperacion', component: RecuperacionComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'listar-usuarios', component: ListarUsuariosComponent },
  { path: 'admin-home', component: AdminHomeComponent ,data:{breadcrumb:'Administrador'},canActivate: [adminGuard] } ,
  { path: 'agregar-politicas', component: AgregarPoliticasComponent, data: { breadcrumb: 'Administrador' } },
  // { path: 'admin', component: AdminHomeComponent },
  { path: 'client-home', component: ClientHomeComponent, data: { breadcrumb: 'Cliente' }, canActivate: [clientGuard]	},
  { path: 'preguntas', component: PreguntasComponent, data: { breadcrumb: 'Preguntas' }},
  { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },
  // { path: 'iot', component: IotComponent, data: { breadcrumb: 'Iot' } },
  { path: 'login', component: AuthComponent,data: { breadcrumb: 'Login' } },
  { path: 'miPerfil', component: PerfilComponent },
  { path: 'politicas', component: PoliticasComponent, data: { breadcrumb: 'Políticas' } },
  { path: 'crear-cuenta', component: CrearCuentaComponent, data: { breadcrumb: 'Registro' } },
  { path: 'quienesSomos', component: QuienesSomosComponent, data: { breadcrumb: 'Acerca de' } },
  {path:'cards-productos',component:CardsProductosComponent,data: { breadcrumb: 'Productos' }},
  { path: 'listar-productos', component: ListarProductosComponent, data: { breadcrumb: 'Listar productos' },canActivate:[adminGuard]},
  { path: 'crear-producto', component: CrearProductoComponent, data: { breadcrumb: 'Crear producto' }, canActivate: [adminGuard] },
  { path: 'detalles/:id', component: DetalleProductoComponent, data: { breadcrumb: 'Detalles producto' }},//componente de ver detalles
  { path: 'editar-producto/:id', component: CrearProductoComponent, data: { breadcrumb: 'Editar producto' }, canActivate: [adminGuard]},
   { path: 'dashboard', component: DashboardsComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'tokens', component: TablaDispositivosComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule
  ]
})
  
export class AppRoutingModule { }
