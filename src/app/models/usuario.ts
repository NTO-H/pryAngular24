export class Usuario {
    _id?: number;
    nombre: string;
    telefono: string;
    correo: string;
    pass: string;

    constructor(nombre: string,telefono:string, correo: string, pass: string) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.pass = pass;
    }
}
