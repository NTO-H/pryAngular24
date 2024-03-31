import { TablaDispositivosComponent } from './../components/IOTDevs/tabla-dispositivos/tabla-dispositivos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IotRoutingModule } from './iot-routing.module';
import { DashboardsComponent } from '../components/IOTDevs/dashboards/dashboards.component';
import { DevicesComponent } from '../components/IOTDevs/devices/devices.component';
// import { TablaDispositivosComponent } from '../components/IOTDevs/tabla-dispositivos/tabla-dispositivos.component';


@NgModule({
  declarations: [DashboardsComponent, TablaDispositivosComponent,DevicesComponent],
  imports: [
    CommonModule,
    IotRoutingModule
  ]
})
export class IotModule { }
