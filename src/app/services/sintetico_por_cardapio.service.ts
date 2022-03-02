 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class sintetico_por_cardapioService  { 
    formParRel:any; 
    strParametros:string=''; 
    arrsintetico_por_cardapio:any[]=[]; 
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
 
  postRelatoriosintetico_por_cardapio(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      if (environment.TipoGrupo=='V'){
        return this.http.post<any>(this.baseUrl+'/sintetico_por_cardapio.php?vendedor='+environment.CodigoUsuario,body, this.httpOptions); 
      }else{
        return this.http.post<any>(this.baseUrl+'/sintetico_por_cardapio.php',body, this.httpOptions); 

      }
    } 
 
 
  getRelatoriosintetico_por_cardapio(): Observable<any> { 
      return this.http.get<any>(this.baseUrl+'/sintetico_por_cardapio.php', this.httpOptions); 
  } 
}   
