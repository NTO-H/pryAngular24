import { Usuario } from 'src/app/models/usuario';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
// Es el módulo de Angular utilizado para realizar solicitudes HTTP.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class AuthService {

    url = 'http://localhost:4000/usuarios/singIn';
    private token!: string;

    authStatus = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }

    login(correo: string, password: string): Observable<any> {
        return this.http.post(this.url, { correo, password });
    }

    logout():void {
        // Elimina el token de sesión
        localStorage.removeItem('rol');
        this.authStatus.next(false); // Actualiza el estado de la autenticación
    }


    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }


    
    obtenerRolUsuario(): string | null {
        // Recuperar el rol del usuario almacenado en el localStorage o en una variable de estado
        const rol = localStorage.getItem('rol');

        // Si el rol está presente, retornarlo
        if (rol) {
            return rol;
            console.log(rol)
        } else {

            // Si no se encuentra un rol, asumir un rol por defecto (puedes cambiar esto según tus necesidades)
            return null;
        }
    }


}
