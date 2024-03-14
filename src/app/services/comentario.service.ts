import { Comentario } from './../models/comentario';



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class ComentarioService {

    url = 'http://localhost:4000/comentario/comentar';

    constructor(private http: HttpClient) { }

    getComentario(): Observable<any> {
        return this.http.get(this.url);
    }
    eliminarComentario(id: string): Observable<any> {
        return this.http.delete(this.url + id);
    }

    guardarComentario(comentario: Comentario): Observable<any> {
        return this.http.post<any>(this.url, comentario);
    }

    // editarProducto(id: string, comentario: Comentario): Observable<any> {
    //     return this.http.put(this.url + id, comentario);

    // }

    // detalleProductoById(id: string): Observable<any> {
    //     //return this.http.get(`${this.apiUrl}/${id}`);
    //     return this.http.get(this.url + id);
    // }







}
