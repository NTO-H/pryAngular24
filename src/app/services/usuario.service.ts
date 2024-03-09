import { HttpClient } from '@angular/common/http';
// Es el módulo de Angular utilizado para realizar solicitudes HTTP.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';


// src/app/services/:

// Propósito: Contiene los servicios utilizados en la aplicación.
// Funcionalidad: Los servicios son utilizados para encapsular la
//  lógica de negocio, la interacción con APIs, y otras operaciones 
//  que no pertenecen directamente a un componente. Al organizar los
//   servicios en esta carpeta, se mejora la modularidad y la reutilización del código.

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {

    url = 'http://localhost:4000/usuarios/';

    constructor(private http: HttpClient) { }

    getUsuarios(): Observable<any> {
        return this.http.get(this.url);
    }


    // eliminarProducto(id: string): Observable<any> {
    //     return this.http.delete(this.url + id);
    // }
    guardarUsuario(usuario: Usuario): Observable<any> {
        return this.http.post<any>(this.url, usuario);
    }



    obtenerProducto(id: string): Observable<any> {

        return this.http.get(this.url + id);

    }



    // editarProducto(id: string, producto: Producto): Observable<any> {
    //     return this.http.put(this.url + id, producto);

    // }




    // detalleProductoById(id: string): Observable<any> {
    //     //return this.http.get(`${this.apiUrl}/${id}`);
    //     return this.http.get(this.url + id);
    // }







}
