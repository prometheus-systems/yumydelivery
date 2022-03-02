 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {vendedores} from "../model/vendedores.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class vendedoresService  { 
    formData: vendedores;  
    formDisabled:permissoes_disabled; 
    formVisible:permissoes_visible; 
    formParRel:any; 
    strParametros:string=''; 
    arrvendedores:any[]=[]; 
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

  importarVendedor(): Observable<any>{    
    return this.http.get<any>('http://18.228.213.156/delivery/ms_vendedores.php?operacao=A', this.httpOptions); 
  } 
 
  postRelatoriovendedores(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/vendedores.php?operacao=REL',body, this.httpOptions); 
    } 
 
 
  getRelatoriovendedores(): Observable<any> {
    if (environment.TipoGrupo=="V"){
      return this.http.get<any>(this.baseUrl+'/vendedores.php?operacao=REL&vendedor='+environment.CodigoUsuario, this.httpOptions);
    }else{
      return this.http.get<any>(this.baseUrl+'/vendedores.php?operacao=REL', this.httpOptions);
    }
  } 
 
 
  getvendedores() : Observable<any>{  
    if (environment.TipoGrupo=="V"){
      return this.http.get<vendedores>(this.baseUrl+'/vendedores.php?operacao=C&vendedor='+environment.CodigoUsuario, this.httpOptions); 
    }else{
      return this.http.get<vendedores>(this.baseUrl+'/vendedores.php?operacao=C', this.httpOptions); 
    }
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItensvendedores() {  
    return this.http.get(this.baseUrl+'/vendedores.php?operacao=C', this.httpOptions).toPromise(); 
  } 
  getvendedoresId(id: string): Observable<vendedores> {  
    return this.http.get<vendedores>(this.baseUrl+'/vendedores.php?operacao=R&id='+id, this.httpOptions); 
  }  

  uploadimage(formData): Observable<any>{  
    return this.http.post<any>(this.baseUrl+'/uploadvendedores.php',formData, this.httpOptions); 
  }  

  SetUser(){ 
  } 

  gravarvendedores(operacao:string) : Observable<vendedores> { 
  
    var body = {  
     ...this.formData 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/vendedores.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deletevendedores(id:number): Observable<vendedores> {  
    return this.http.get<any>(this.baseUrl+'/vendedores.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
  export class permissoes_visible {  
    ven_ativo: boolean; 
    ven_bairro: boolean; 
    ven_cep: boolean; 
    ven_cidade: boolean; 
    ven_cnpj: boolean; 
    ven_codigo: boolean; 
    ven_complemento: boolean; 
    ven_email: boolean; 
    ven_endereco: boolean; 
    ven_fone: boolean; 
    ven_horario: boolean; 
    ven_info: boolean; 
    ven_lat: boolean; 
    ven_login: boolean; 
    ven_long: boolean; 
    ven_nome: boolean; 
    ven_numero: boolean; 
    ven_senha: boolean; 
    ven_uf: boolean; 
} 
export class permissoes_disabled { 
    ven_ativo: boolean; 
    ven_bairro: boolean; 
    ven_cep: boolean; 
    ven_cidade: boolean; 
    ven_cnpj: boolean; 
    ven_codigo: boolean; 
    ven_complemento: boolean; 
    ven_email: boolean; 
    ven_endereco: boolean; 
    ven_fone: boolean; 
    ven_horario: boolean; 
    ven_info: boolean; 
    ven_lat: boolean; 
    ven_login: boolean; 
    ven_long: boolean; 
    ven_nome: boolean; 
    ven_numero: boolean; 
    ven_senha: boolean; 
    ven_uf: boolean; 
} 
