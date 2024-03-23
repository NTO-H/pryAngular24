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

    getEstadoLed(): Observable<any> {
        return this.http.get<any>(this.url +'obtenerEstadoLed');
    }
    getEstadoValancin(): Observable<any> {
        return this.http.get<any>(this.url +'obtenerEstadoValancin');
    }
    getEstadoMusica(): Observable<any> {
        return this.http.get<any>(this.url +'obtenerEstadoMusica');
    }

    getEstadoCarrucel(): Observable<any> {
        return this.http.get<any>(this.url + 'obtenerEstadoCarrucel');
    }

    obtenerProducto(id: string): Observable<any> {
        return this.http.get(this.url + id);
    }

    editarDispositivoLed(estado: number): Observable<any> {
        return this.http.put(this.url + "cambiarEstadoLed", {"led": estado });
    }

    editarDispositivoValancin(estadoValancin: number): Observable<any> {
        return this.http.put(this.url + "cambiarEstadoValancin", { "valancin": estadoValancin });
    }

    editarDispositivoCarrucel(estadoCarrucel: number): Observable<any> {
        return this.http.put(this.url + "cambiarEstadoCarrucel", { "carrucel": estadoCarrucel });
    }

    editarEstadoMusica(estadoMusica: number): Observable<any> {
        return this.http.put(this.url + "cambiarEstadoMusica", { "musica": estadoMusica });
    }

}
