import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const adminGuard = () => {
    const router =inject(Router)


    const rol = localStorage.getItem('rol');

    // Verificar si el rol es admin
    if (rol && rol === 'admin') {
        return true; // Usuario tiene rol de admin
    } else {
        router.navigate(['/']);
        return false; // Usuario no tiene rol de admin
    }
}

export const clientGuard = () => {
    const router =inject(Router)


    const rol = localStorage.getItem('rol');

    // Verificar si el rol es admin
    if (rol && rol === 'cliente') {
        return true; // Usuario tiene rol de admin
    } else {
        router.navigate(['/']);
        return false; // Usuario no tiene rol de admin
    }
}
