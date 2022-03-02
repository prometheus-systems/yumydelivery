 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {itens} from "../model/itens.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class itensService  { 
    formData: itens;  
    formDisabled:permissoes_disabled; 
    formVisible:permissoes_visible; 
    formParRel:any; 
    strParametros:string=''; 
    arritens:any[]=[]; 
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
 
  postRelatorioitens(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/itens.php?operacao=REL',body, this.httpOptions); 
    } 
 
 
  getRelatorioitens(): Observable<any> { 
      return this.http.get<any>(this.baseUrl+'/itens.php?operacao=REL', this.httpOptions); 
  } 
 
 
  getitens() : Observable<any>{  
    return this.http.get<itens>(this.baseUrl+'/itens.php?operacao=C', this.httpOptions); 
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItensitens() {  
    return this.http.get(this.baseUrl+'/itens.php?operacao=C', this.httpOptions).toPromise(); 
  } 
  getitensId(id: string): Observable<itens> {  
    return this.http.get<itens>(this.baseUrl+'/itens.php?operacao=R&id='+id, this.httpOptions); 
  }  

  uploadimage(formData): Observable<any>{  
    return this.http.post<any>(this.baseUrl+'/uploaditens.php',formData, this.httpOptions); 
  }  

  SetUser(){ 
  } 

  gravaritens(operacao:string) : Observable<itens> { 
    this.formData.usu_codigo = environment.CodigoUsuario; 
  
    var body = {  
     ...this.formData 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/itens.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deleteitens(id:number): Observable<itens> {  
    return this.http.get<any>(this.baseUrl+'/itens.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
  export class permissoes_visible {  
    car_codigo: boolean; 
    ite_codigo: boolean; 
    ite_preco: boolean; 
    ite_qtde: boolean; 
    ite_subtotal: boolean; 
} 
export class permissoes_disabled { 
    car_codigo: boolean; 
    ite_codigo: boolean; 
    ite_preco: boolean; 
    ite_qtde: boolean; 
    ite_subtotal: boolean; 
} 
