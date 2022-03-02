 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {bonificacao} from "../model/bonificacao.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class bonificacaoService  { 
    formData: bonificacao;  
    formDisabled:permissoes_disabled; 
    formVisible:permissoes_visible; 
    formParRel:any; 
    strParametros:string=''; 
    arrbonificacao:any[]=[]; 
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
 
  postRelatoriobonificacao(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/bonificacao.php?operacao=REL',body, this.httpOptions); 
    } 
 
 
  getRelatoriobonificacao(): Observable<any> { 
    if (environment.TipoGrupo=='V'){
      return this.http.get<any>(this.baseUrl+'/bonificacao.php?operacao=REL&vendedor='+environment.CodigoUsuario, this.httpOptions); 
    }else{
      return this.http.get<any>(this.baseUrl+'/bonificacao.php?operacao=REL', this.httpOptions); 
      
    }
  } 
 
 
  getbonificacao() : Observable<any>{  
    if (environment.TipoGrupo=='V'){
      return this.http.get<bonificacao>(this.baseUrl+'/bonificacao.php?operacao=C&vendedor='+environment.CodigoUsuario, this.httpOptions);
    }else{
      return this.http.get<bonificacao>(this.baseUrl+'/bonificacao.php?operacao=C', this.httpOptions);

    }
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItensbonificacao() {  
    return this.http.get(this.baseUrl+'/bonificacao.php?operacao=C', this.httpOptions).toPromise(); 
  } 
  getbonificacaoId(id: string): Observable<bonificacao> {  
    return this.http.get<bonificacao>(this.baseUrl+'/bonificacao.php?operacao=R&id='+id, this.httpOptions); 
  }  

  uploadimage(formData): Observable<any>{  
    return this.http.post<any>(this.baseUrl+'/uploadbonificacao.php',formData, this.httpOptions); 
  }  

  SetUser(){ 
  } 

  gravarbonificacao(operacao:string) : Observable<bonificacao> { 
    if (environment.TipoGrupo=='V'){
      this.formData.ven_codigo = environment.CodigoUsuario; 
    }
    var body = {  
     ...this.formData 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/bonificacao.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deletebonificacao(id:number): Observable<bonificacao> {  
    return this.http.get<any>(this.baseUrl+'/bonificacao.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
  export class permissoes_visible {  
    bon_codigo: boolean; 
    bon_pontos: boolean; 
    car_codigo: boolean; 
    ven_codigo: boolean; 
} 
export class permissoes_disabled { 
    bon_codigo: boolean; 
    bon_pontos: boolean; 
    car_codigo: boolean; 
    ven_codigo: boolean; 
} 
