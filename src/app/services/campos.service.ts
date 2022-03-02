 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {campos} from "../model/campos.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class camposService  { 
  formData: campos;  
    formParRel:any; 
    strParametros:string=''; 
    arrcampos:any[]=[]; 
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
 
  postRelatoriocampos(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/campos.php?operacao=REL',body, this.httpOptions); 
    } 
 
 
  getRelatoriocampos(): Observable<any> { 
      return this.http.get<any>(this.baseUrl+'/campos.php?operacao=REL', this.httpOptions); 
  } 
 
 
  getcampos() : Observable<any>{  
    return this.http.get<campos>(this.baseUrl+'/campos.php?operacao=C', this.httpOptions); 
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItenscampos() {  
    return this.http.get(this.baseUrl+'/campos.php?operacao=C', this.httpOptions).toPromise(); 
  } 
  getcamposId(id: string): Observable<campos> {  
    return this.http.get<campos>(this.baseUrl+'/campos.php?operacao=R&id='+id, this.httpOptions); 
  }  
  gravarcampos(operacao:string) : Observable<campos> { 
    var body = {  
     ...this.formData 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/campos.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deletecampos(id:number): Observable<campos> {  
    return this.http.get<any>(this.baseUrl+'/campos.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
