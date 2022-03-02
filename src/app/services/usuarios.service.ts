 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {usuarios} from "../model/usuarios.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class usuariosService  { 
  formData: usuarios;  
  Formato:string;
    formParRel:any; 
    strParametros:string=''; 
    arrusuarios:any[]=[]; 
    origem:string;
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
  verificaUsuario(usuario: string): Observable<string> {  
    return this.http.get<string>(this.baseUrl+'/usuarios.php?operacao=VU&filtrologin='+usuario); 
  } 
  verificaEmail(email: string): Observable<string> {  
    return this.http.get<string>(this.baseUrl+'/usuarios.php?operacao=VE&filtroemail='+email); 
  } 
  postRelatoriousuarios(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/usuarios.php?operacao=REL',body, this.httpOptions); 
 
    } 
 
 
  getRelatoriousuarios(): Observable<any> { 
    if (environment.TipoGrupo=="V"){
      return this.http.get<any>(this.baseUrl+'/usuarios.php?operacao=REL&vendedor='+environment.CodigoUsuario, this.httpOptions); 
    }else{
      return this.http.get<any>(this.baseUrl+'/usuarios.php?operacao=REL', this.httpOptions); 
    }
  } 

  importarComprador(): Observable<any>{    
    return this.http.get<any>('http://18.228.213.156/delivery/ms_compradores.php?operacao=A', this.httpOptions); 
  } 
 
 
  getusuarios() : Observable<any>{  
    if (environment.TipoGrupo=="V"){
      return this.http.get<usuarios>(this.baseUrl+'/usuarios.php?operacao=C&vendedor='+environment.CodigoUsuario, this.httpOptions); 
    }else{
      return this.http.get<usuarios>(this.baseUrl+'/usuarios.php?operacao=C', this.httpOptions); 

    }
  } 

   
  getLogin() : Observable<any>{  
      return this.http.get<any>('https://d1cuy5kphlalyw.cloudfront.net/yumy/loginfb.php'); 
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItensusuarios() {  
    return this.http.get(this.baseUrl+'/usuarios.php?operacao=C', this.httpOptions).toPromise(); 
  } 
  getusuariosId(id: string): Observable<usuarios> {  
    return this.http.get<usuarios>(this.baseUrl+'/usuarios.php?operacao=R&id='+id, this.httpOptions); 
  }  
  gravarusuarios(operacao:string) : Observable<usuarios> {
    debugger
    var body = {  
     ...this.formData 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/usuarios.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deleteusuarios(id:number): Observable<usuarios> {  
    return this.http.get<any>(this.baseUrl+'/usuarios.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
