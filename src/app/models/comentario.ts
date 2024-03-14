

export class Comentario {
    _id?: number;
    nombre: string;
    comentario: string;
    correo: string;

    constructor(nombre: string,comentario :string,correo: string) {
        this.nombre = nombre;
        this.correo = correo;
        this.comentario = comentario;
    }
}
