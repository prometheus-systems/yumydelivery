 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {cardapio} from "../model/cardapio.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class cardapioService  { 
    formData: cardapio;  
    formDisabled:permissoes_disabled; 
    formVisible:permissoes_visible; 
    formParRel:any; 
    strParametros:string=''; 
    arrcardapio:any[]=[]; 
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
 
  postRelatoriocardapio(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/cardapio.php?operacao=REL',body, this.httpOptions); 
    } 
 
 
  getRelatoriocardapio(): Observable<any> { 
      return this.http.get<any>(this.baseUrl+'/cardapio.php?operacao=REL', this.httpOptions); 
  } 

  importarCardapio(): Observable<any>{    
    return this.http.get<any>('http://18.228.213.156/delivery/ms_produtos.php?operacao=A', this.httpOptions); 
  } 
 
 
  getcardapio() : Observable<any>{  
    if (environment.TipoGrupo=='V'){
      return this.http.get<cardapio>(this.baseUrl+'/cardapio.php?operacao=C&vendedor='+environment.CodigoUsuario, this.httpOptions); 
    }else{
      return this.http.get<cardapio>(this.baseUrl+'/cardapio.php?operacao=C', this.httpOptions); 
    }
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItenscardapio() {  
    return this.http.get(this.baseUrl+'/cardapio.php?operacao=C', this.httpOptions).toPromise(); 
  } 
  getcardapioId(id: string): Observable<cardapio> {  
    return this.http.get<cardapio>(this.baseUrl+'/cardapio.php?operacao=R&id='+id, this.httpOptions); 
  }  

  uploadimage(formData): Observable<any>{  
    return this.http.post<any>(this.baseUrl+'/uploadcardapio.php',formData, this.httpOptions); 
  }  

  SetUser(){ 
  } 

  gravarcardapio(operacao:string) : Observable<cardapio> { 
    if (environment.TipoGrupo=='V'){
      this.formData.ven_codigo = environment.CodigoUsuario; 
    } 
  
    var body = {  
     ...this.formData 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/cardapio.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deletecardapio(id:number): Observable<cardapio> {  
    return this.http.get<any>(this.baseUrl+'/cardapio.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
  export class permissoes_visible {  
    car_ativo: boolean; 
    car_codigo: boolean; 
    car_descricao: boolean; 
    car_estoque: boolean; 
    car_imagen: boolean; 
    car_nome: boolean; 
    car_valor: boolean; 
    cat_codigo: boolean; 
    ven_codigo: boolean; 
} 
export class permissoes_disabled { 
    car_ativo: boolean; 
    car_codigo: boolean; 
    car_descricao: boolean; 
    car_estoque: boolean; 
    car_imagen: boolean; 
    car_nome: boolean; 
    car_valor: boolean; 
    cat_codigo: boolean; 
    ven_codigo: boolean; 
} 
