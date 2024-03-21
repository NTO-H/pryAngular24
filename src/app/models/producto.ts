export class Producto { 
    _id?: number;
    nombre: string;
    categoria: string;
    precio: number;
    descripcion: string;

    constructor(nombre: string, categoria: string, precio: number, descripcion:string) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}
