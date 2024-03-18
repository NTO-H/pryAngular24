import { Dispositivo } from './../models/dispositivos';
import { HttpClient } from '@angular/common/http';
// Es el módulo de Angular utilizado para realizar solicitudes HTTP.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductoService {

    url = 'http://localhost:4000/Dispositivos/';

    constructor(private http: HttpClient) { }

    getDispositivos(): Observable<any> {
        return this.http.get(this.url);
    }


    eliminarDispositivo(id: string): Observable<any> {
        return this.http.delete(this.url + id);
    }
    guardarProducto(dispositivo: Dispositivo): Observable<any> {
        return this.http.post<any>(this.url, dispositivo);
    }

    obtenerProducto(id: string): Observable<any> {
        return this.http.get(this.url + id);
    }


    editarProducto(id: string ,dispositivo: Dispositivo): Observable<any> {
        return this.http.put(this.url + id, dispositivo);
    }

    
    detalleDispositivoById(id: string): Observable<any> {
        //return this.http.get(`${this.apiUrl}/${id}`);
        return this.http.get(this.url + id);
    }







}
