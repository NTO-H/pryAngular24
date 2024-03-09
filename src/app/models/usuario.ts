export class Usuario {
    _id?: number;
    nombre: string;
    correo: string;
    pass: string;

    constructor(nombre: string, correo: string, pass: string) {
        this.nombre = nombre;
        this.correo = correo;
        this.pass = pass;
    }
}
