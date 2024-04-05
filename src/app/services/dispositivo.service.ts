import { Dispositivo } from '../models/dispositivos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DispositivoService {
    url = 'https://servidortropicalworld-1.onrender.com/dispositivos/';

    constructor(private http: HttpClient) { }

    getEstadoDispositivo(deviceName: string): Observable<any> {
        return interval(2000).pipe(
            switchMap(() => this.http.get<any>(`${this.url}obtenerEstadoDispositivo/${deviceName}`))
        );
    }


    
    getEstadoLed(deviceName: string): Observable<any> {
        return interval(2000).pipe(
            switchMap(() => this.http.get<any>(`${this.url}obtenerEstadoLed/${deviceName}`))
        );
    }

    getTempHum(deviceName: string): Observable<any> {
        return interval(2000).pipe(
            switchMap(() => this.http.get<any>(`${this.url}obtenerEstadoTemperaturaHumedad/${deviceName}`))
        );
    }

    getEstadoValancin(deviceName: string): Observable<any> {
        return interval(2000).pipe(
            switchMap(() => this.http.get<any>(`${this.url}obtenerEstadoValancin/${deviceName}`))
        );
    }

    getEstadoMusica(deviceName: string): Observable<any> {
        return interval(2000).pipe(
            switchMap(() => this.http.get<any>(`${this.url}obtenerEstadoMusica/${deviceName}`))
        );
    }

    getEstadoCarrucel(deviceName: string): Observable<any> {
        return interval(2000).pipe(
            switchMap(() => this.http.get<any>(`${this.url}obtenerEstadoCarrucel/${deviceName}`))
        );
    }

    editarDispositivoLed(estado: number, deviceName: string): Observable<any> {
        return this.http.put(`${this.url}cambiarEstadoLed/`, { "led": estado, "deviceName": deviceName });
    }

    editarDispositivoValancin(estadoValancin: number, deviceName: string): Observable<any> {
        return this.http.put(`${this.url}cambiarEstadoValancin`, { "valancin": estadoValancin, "deviceName": deviceName });
    }

    editarDispositivoCarrucel(estadoCarrucel: number, deviceName: string): Observable<any> {
        return this.http.put(`${this.url}cambiarEstadoCarrucel`, { "carrucel": estadoCarrucel, "deviceName": deviceName });
    }

    editarEstadoMusica(estadoMusica: number, deviceName: string): Observable<any> {
        return this.http.put(`${this.url}cambiarEstadoMusica`, { "musica": estadoMusica, "deviceName": deviceName });
    }

    encontrarDispositivosPorUsuarioId(id: string): Observable<any> {
        return this.http.get(`${this.url}encontrarDispositivosPorUsuarioId/${id}`);
    }

    crearDispositivo(devs: Dispositivo): Observable<any> {
        return this.http.post(`${this.url}crearDispositivo`, devs);
    }
}
