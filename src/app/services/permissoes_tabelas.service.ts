 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {permissoes_tabelas} from "../model/permissoes_tabelas.model"; 
import {permissoes_campos} from "../model/permissoes_campos.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class permissoes_tabelasService  { 
  formData: permissoes_tabelas;  
    formParRel:any; 
    tabela:string;
    strParametros:string=''; 
    arrpermissoes_tabelas:any[]=[]; 
    DataChart:any[]=[]; 
    typeChart:string;
    grupo:string;
    httpOptions = {  
      headers: new HttpHeaders({  
        'Content-Type':'application/json', 
        'Authorization':'Bearer '+localStorage.getItem('token')
      })  
    } 
  Itemspermissoes_campos: permissoes_campos[]; 
  constructor(private http: HttpClient) { }  
  baseUrl = environment.URLBase;  
 
  postRelatoriopermissoes_tabelas(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/permissoes_tabelas.php?operacao=REL',body, this.httpOptions); 
    } 
 
 
  getRelatoriopermissoes_tabelas(): Observable<any> { 
      return this.http.get<any>(this.baseUrl+'/permissoes_tabelas.php?operacao=REL', this.httpOptions); 
  } 
 
 
  getpermissoes_tabelas() : Observable<any>{  
    return this.http.get<permissoes_tabelas>(this.baseUrl+'/permissoes_tabelas.php?operacao=C', this.httpOptions); 
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItenspermissoes_tabelas() {  
    return this.http.get(this.baseUrl+'/permissoes_tabelas.php?operacao=C', this.httpOptions).toPromise(); 
  } 
  getpermissoes_tabelasId(id: string): Observable<permissoes_tabelas> {  
    return this.http.get<permissoes_tabelas>(this.baseUrl+'/permissoes_tabelas.php?operacao=R&id='+id, this.httpOptions); 
  }  
  gravarpermissoes_tabelas(operacao:string) : Observable<permissoes_tabelas> { 
    var body = {  
     ...this.formData 
      , itemspermissoes_campos: this.Itemspermissoes_campos 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/permissoes_tabelas.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deletepermissoes_tabelas(id:number): Observable<permissoes_tabelas> {  
    return this.http.get<any>(this.baseUrl+'/permissoes_tabelas.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
