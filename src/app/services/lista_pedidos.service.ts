 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class lista_pedidosService  { 
    formParRel:any; 
    strParametros:string=''; 
    arrlista_pedidos:any[]=[]; 
    DataChart:any[]=[]; 
    typeChart:string;
    httpOptions = {  
      headers: new HttpHeaders({  
      'Content-Type': 'application/json', 
      'Authorization':'Bearer '+localStorage.getItem('token')
      })  
    }   
  constructor(private http: HttpClient) { }  
  baseUrl = environment.URLBase;  
 
  postRelatoriolista_pedidos(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      if (environment.TipoGrupo=='V'){
        return this.http.post<any>(this.baseUrl+'/lista_pedidos.php?vendedor='+environment.CodigoUsuario,body, this.httpOptions); 
      }
      else{
        return this.http.post<any>(this.baseUrl+'/lista_pedidos.php',body, this.httpOptions); 
      }
    } 
 
 
  getRelatoriolista_pedidos(): Observable<any> { 
    if (environment.TipoGrupo=='V'){
      return this.http.get<any>(this.baseUrl+'/lista_pedidos.php?vendedor='+environment.CodigoUsuario, this.httpOptions); 

    }else{
      return this.http.get<any>(this.baseUrl+'/lista_pedidos.php', this.httpOptions); 

    }
  } 
}   
