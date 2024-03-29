import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DispositivoService {

    url = 'https://servidortropicalworld-1.onrender.com/Dispositivos/';

    constructor(private http: HttpClient) { }

    getAllDispositivosData(): Observable<any> {
        const estadoLed$ = this.http.get<any>(this.url + 'obtenerEstadoLed');
        const tempHum$ = this.http.get<any>(this.url + 'obtenerEstadoTemperaturaHumedad');
        const estadoValancin$ = this.http.get<any>(this.url + 'obtenerEstadoValancin');
        const estadoMusica$ = this.http.get<any>(this.url + 'obtenerEstadoMusica');
        const estadoCarrucel$ = this.http.get<any>(this.url + 'obtenerEstadoCarrucel');

        return forkJoin({
            estadoLed: estadoLed$,
            tempHum: tempHum$,
            estadoValancin: estadoValancin$,
            estadoMusica: estadoMusica$,
            estadoCarrucel: estadoCarrucel$
        }).pipe(
            map(data => {
                return {
                    estadoLed: data.estadoLed,
                    tempHum: data.tempHum,
                    estadoValancin: data.estadoValancin,
                    estadoMusica: data.estadoMusica,
                    estadoCarrucel: data.estadoCarrucel
                };
            })
        );
    }
}
