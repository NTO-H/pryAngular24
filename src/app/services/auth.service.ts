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

    url = 'https://servidortropicalworld-1.onrender.com/usuarios/';
    private token!: string;

    authStatus = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }

    getCurrentUser(correo:string,password:string){
        return this.http.post(this.url, { correo, password });

        
    }
    login(correo: string, password: string): Observable<any> {
        // this.getCurrentUser(correo, password)
        return this.http.post(this.url +'singIn', { correo, password });
    }

    // verPerfil()

    miPerfilUsuario(correo: string): Observable<any> {
        return this.http.get<any>(`${this.url}miPerfil/${correo}`);
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
