export class Usuario {
    _id?: number;
    nombre: string;
    telefono: string;
    correo: string;
    pass: string;
    confirmpass: string;
    pregunta: string;
    token: string;
    respuesta: string;
    constructor(nombre: string, telefono: string, token:string,correo: string, confirmpass:string,pass: string,pregunta:string,respuesta:string) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.token = token;
        this.pass = pass;
        this.confirmpass = confirmpass;
        this.pregunta = pregunta;
        this.respuesta = respuesta;
    }
}
