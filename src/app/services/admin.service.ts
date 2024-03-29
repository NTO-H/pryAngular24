import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Politica, Pregunta}from '../models/privado'
@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) { }


  url = "https://servidortropicalworld-1.onrender.com/privado/"
  


  registrarPoliticas(politica: Politica): Observable<any>{
    
    return this.http.post<any>(this.url +'agregarPolitica', politica);
  }

  


  getPoliticas(): Observable<any>{
    
    return this.http.get<any>(this.url +'obtenerPoliticas' );
  }
  registrarPreguntas(pregunta: Pregunta): Observable<any>{
    
    return this.http.post<any>(this.url +'agregarPregunta', pregunta);
  }

  
  getPreguntas(): Observable<any>{
    
    return this.http.get<any>(this.url +'obtenerPreguntas' );
  }



  


  eliminarPregunta(id: string): Observable<any> {
    return this.http.delete(this.url+'pregunta/' + id);
  }


  obtenerPregunta(id: string): Observable<any> {
    return this.http.get(this.url +'pregunta/'+ id);
  }


  editarPregunta(id: string, pregunta:Pregunta) {
    return this.http.put<any>(this.url +'pregunta/'+ id, pregunta);
  }



  // politica

  eliminarPolitica(id: string): Observable<any> {
    return this.http.delete(this.url + 'politica/'+id);
  }


  obtenerPolitica(id: string): Observable<any> {
    return this.http.get(this.url + 'politica/' + id);
  }


  editarPolitica(id: string, politica:Politica) {
    return this.http.put<any>(this.url + 'politica/' + id, politica);
  }






  
}
