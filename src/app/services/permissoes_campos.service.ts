 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {permissoes_campos} from "../model/permissoes_campos.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class permissoes_camposService  { 
  formData: permissoes_campos;  
    formParRel:any; 
    strParametros:string=''; 
    arrpermissoes_campos:any[]=[]; 
    DataChart:any[]=[]; 
    typeChart:string;
    httpOptions = {  
      headers: new HttpHeaders({  
        'Content-Type':'application/json', 
        'Authorization':'Bearer '+localStorage.getItem('token')
      })  
    } 
  constructor(private http: HttpClient) { }  
  baseUrl = environment.URLBase;  
 
  postRelatoriopermissoes_campos(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/permissoes_campos.php?operacao=REL',body, this.httpOptions); 
    } 
 
 
  getRelatoriopermissoes_campos(): Observable<any> { 
      return this.http.get<any>(this.baseUrl+'/permissoes_campos.php?operacao=REL', this.httpOptions); 
  } 
 
 
  getpermissoes_campos() : Observable<any>{  
    return this.http.get<permissoes_campos>(this.baseUrl+'/permissoes_campos.php?operacao=C', this.httpOptions); 
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItenspermissoes_campos() {  
    return this.http.get(this.baseUrl+'/permissoes_campos.php?operacao=C').toPromise(); 
  } 
  getpermissoes_camposId(id: string): Observable<permissoes_campos> {  
    return this.http.get<permissoes_campos>(this.baseUrl+'/permissoes_campos.php?operacao=R&id='+id, this.httpOptions); 
  }  
  gravarpermissoes_campos(operacao:string) : Observable<permissoes_campos> { 
    var body = {  
     ...this.formData 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/permissoes_campos.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deletepermissoes_campos(id:number): Observable<permissoes_campos> {  
    return this.http.get<any>(this.baseUrl+'/permissoes_campos.php?operacao=D&id='+id); 
  }  
}   
