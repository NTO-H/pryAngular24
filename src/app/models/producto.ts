export class Producto { 
    _id?: string;
    nombre: string;
    categoria: string;
    precio: number;
    descripcion: string;
    imagen: string;

    constructor(nombre: string, categoria: string, precio: number, descripcion: string, imagen:string) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}


export class Categoria { 
    _id?: string;
    nombre: string;


    constructor(nombre: string) {
        this.nombre = nombre;
    
    }
}


