export class Politica {
    _id?: number;
    titulo: string;
    contenido: string;
   

    constructor(titulo: string, contenido: string) {
        this.titulo = titulo;
        this.contenido = contenido;
        
    }

}

export class Pregunta {
    _id?: number;
    titulo: string;
    contenido: string;
   

    constructor(titulo: string, contenido: string) {
        this.titulo = titulo;
        this.contenido = contenido;
        
    }
}
