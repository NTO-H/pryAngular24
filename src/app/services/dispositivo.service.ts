import { Dispositivo } from '../models/dispositivos';
import { HttpClient } from '@angular/common/http';
// Es el módulo de Angular utilizado para realizar solicitudes HTTP.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DispositivoService {

    url = 'http://localhost:4000/Dispositivos/';

    constructor(private http: HttpClient) { }

    // getDispositivos(): Observable<any> {
    //     return this.http.get(this.url);
    // }


    // eliminarDispositivo(id: string): Observable<any> {
    //     return this.http.delete(this.url + id);
    // }


    // guardarProducto(dispositivo: Dispositivo): Observable<any> {
    //     return this.http.post<any>(this.url, dispositivo);
    // }

    // obtenerProducto(id: string): Observable<any> {
    //     return this.http.get(this.url + id);
    // }


    editarDispositivoLed(estado: number): Observable<any> {
        return this.http.put(this.url + "cambiarEstadoLed", {"led": estado });
    }
    editarDispositivoValancin(estadoValancin: number): Observable<any> {
        return this.http.put(this.url + "cambiarEstadoValancin", { "valancin": estadoValancin });
    }


    
    editarDispositivoCarrucel(estadoCarrucel: number): Observable<any> {
        return this.http.put(this.url + "cambiarEstadoCarrucel", { "carrucel": estadoCarrucel });
    }



    // estadoLed(estado :boolean): Observable<any> {
    //     return this.http.get(this.url +'estadoLed/', estado);
    // }

    
    // detalleDispositivoById(id: string): Observable<any> {
    //     //return this.http.get(`${this.apiUrl}/${id}`);
    //     return this.http.get(this.url + id);
    // }







}
