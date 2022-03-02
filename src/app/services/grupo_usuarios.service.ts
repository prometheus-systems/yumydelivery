 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {grupo_usuarios} from "../model/grupo_usuarios.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class grupo_usuariosService  { 
  formData: grupo_usuarios;  
    formParRel:any; 
    strParametros:string=''; 
    arrgrupo_usuarios:any[]=[]; 
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
 
  postRelatoriogrupo_usuarios(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/grupo_usuarios.php?operacao=REL',body, this.httpOptions); 
    } 
 
 
  getRelatoriogrupo_usuarios(): Observable<any> { 
      return this.http.get<any>(this.baseUrl+'/grupo_usuarios.php?operacao=REL', this.httpOptions); 
  } 
 
 
  getgrupo_usuarios() : Observable<any>{  
    return this.http.get<grupo_usuarios>(this.baseUrl+'/grupo_usuarios.php?operacao=C', this.httpOptions); 
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItensgrupo_usuarios() {  
    return this.http.get(this.baseUrl+'/grupo_usuarios.php?operacao=C').toPromise(); 
  } 
  getgrupo_usuariosId(id: string): Observable<grupo_usuarios> {  
    return this.http.get<grupo_usuarios>(this.baseUrl+'/grupo_usuarios.php?operacao=R&id='+id, this.httpOptions); 
  }  
  gravargrupo_usuarios(operacao:string) : Observable<grupo_usuarios> { 
    var body = {  
     ...this.formData 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/grupo_usuarios.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deletegrupo_usuarios(id:number): Observable<grupo_usuarios> {  
    return this.http.get<any>(this.baseUrl+'/grupo_usuarios.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
