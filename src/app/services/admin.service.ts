import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Politica}from '../models/privado'
@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) { }


  url = "http://localhost:4000/privado/"
  


  registrarPoliticas(politica: Politica): Observable<any>{
    
    return this.http.post<any>(this.url +'agregarPolitica', politica);
  }

  
  getPoliticas(): Observable<any>{
    
    return this.http.get<any>(this.url +'obtenerPoliticas' );
  }







  
}
