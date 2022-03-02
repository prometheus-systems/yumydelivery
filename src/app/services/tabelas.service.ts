 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {tabelas} from "../model/tabelas.model"; 
import {campos} from "../model/campos.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class tabelasService  { 
  formData: tabelas;  
    formParRel:any; 
    strParametros:string=''; 
    arrtabelas:any[]=[]; 
    DataChart:any[]=[]; 
    typeChart:string;
  Itemscampos: campos[]; 
  httpOptions = {  
    headers: new HttpHeaders({  
      'Content-Type':'application/json', 
      'Authorization':'Bearer '+localStorage.getItem('token')
    })  
  } 
  constructor(private http: HttpClient) { }  
  baseUrl = environment.URLBase;  
 
  postRelatoriotabelas(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/tabelas.php?operacao=REL',body, this.httpOptions); 
    } 
 
 
  getRelatoriotabelas(): Observable<any> { 
      return this.http.get<any>(this.baseUrl+'/tabelas.php?operacao=REL', this.httpOptions); 
  } 
 
 
  gettabelas() : Observable<any>{  
    return this.http.get<tabelas>(this.baseUrl+'/tabelas.php?operacao=C', this.httpOptions); 
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItenstabelas() {  
    return this.http.get(this.baseUrl+'/tabelas.php?operacao=C', this.httpOptions).toPromise(); 
  } 
  gettabelasId(id: string): Observable<tabelas> {  
    return this.http.get<tabelas>(this.baseUrl+'/tabelas.php?operacao=R&id='+id, this.httpOptions); 
  }  
  gravartabelas(operacao:string) : Observable<tabelas> { 
    var body = {  
     ...this.formData 
      , itemscampos: this.Itemscampos 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/tabelas.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deletetabelas(id:number): Observable<tabelas> {  
    return this.http.get<any>(this.baseUrl+'/tabelas.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
