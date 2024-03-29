import { HttpClient } from '@angular/common/http';
// Es el módulo de Angular utilizado para realizar solicitudes HTTP.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';



// src/app/services/:

// Propósito: Contiene los servicios utilizados en la aplicación.
// Funcionalidad: Los servicios son utilizados para encapsular la
//  lógica de negocio, la interacción con APIs, y otras operaciones 
//  que no pertenecen directamente a un componente. Al organizar los
//   servicios en esta carpeta, se mejora la modularidad y la reutilización del código.

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  
  url = 'https://servidortropicalworld-1.onrender.com/productos';
  

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  getCategorias(): Observable<any>{
    return this.http.get(this.url +'obtenerCategorias')
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  
  guardarProducto(formdata: FormData): Observable<any> {
    return this.http.post<any>(this.url, formdata);
  }
  
  // guardarProducto(producto: Producto): Observable<any> {
  //   return this.http.post<any>(this.url, producto);
  // }



  obtenerProducto(id:string):Observable<any>{
    return this.http.get(this.url+id);
  }


  editarProducto(id: string, formData: FormData) {
    return this.http.put<any>(this.url+id, formData);
  }




detalleProductoById(id:string):Observable<any>{
//return this.http.get(`${this.apiUrl}/${id}`);
  return this.http.get(this.url+id);
}







}
