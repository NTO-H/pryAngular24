export class Usuario {
    _id?: number;
    nombre: string;
    telefono: string;
    correo: string;
    pass: string;
    confirmpass: string;
    pregunta: string;
    respuesta: string;
    constructor(nombre: string, telefono: string, correo: string, confirmpass:string,pass: string,pregunta:string,respuesta:string) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.pass = pass;
        this.confirmpass = confirmpass;
        this.pregunta = pregunta;
        this.respuesta = respuesta;
    }
}
