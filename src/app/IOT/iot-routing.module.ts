import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/Admin/dashboard/dashboard.component';
import { DevicesComponent } from '../components/IOTDevs/devices/devices.component';
import { TablaDispositivosComponent } from '../components/IOTDevs/tabla-dispositivos/tabla-dispositivos.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'tokens', component: TablaDispositivosComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IotRoutingModule {

}
