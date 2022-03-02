 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {endereco} from "../model/endereco.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class enderecoService  { 
    formData: endereco;  
    formDisabled:permissoes_disabled; 
    formVisible:permissoes_visible; 
    formParRel:any; 
    strParametros:string=''; 
    arrendereco:any[]=[]; 
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
 
  postRelatorioendereco(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/endereco.php?operacao=REL',body, this.httpOptions); 
    } 
 
 
  getRelatorioendereco(): Observable<any> { 
      return this.http.get<any>(this.baseUrl+'/endereco.php?operacao=REL', this.httpOptions); 
  } 
 
 
  getendereco() : Observable<any>{  
    return this.http.get<endereco>(this.baseUrl+'/endereco.php?operacao=C', this.httpOptions); 
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItensendereco() {  
    return this.http.get(this.baseUrl+'/endereco.php?operacao=C', this.httpOptions).toPromise(); 
  } 
  getenderecoId(id: string): Observable<endereco> {  
    return this.http.get<endereco>(this.baseUrl+'/endereco.php?operacao=R&id='+id, this.httpOptions); 
  }  

  uploadimage(formData): Observable<any>{  
    return this.http.post<any>(this.baseUrl+'/uploadendereco.php',formData, this.httpOptions); 
  }  

  SetUser(){ 
  } 

  gravarendereco(operacao:string) : Observable<endereco> { 
    this.formData.usu_codigo = environment.CodigoUsuario; 
  
    var body = {  
     ...this.formData 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/endereco.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deleteendereco(id:number): Observable<endereco> {  
    return this.http.get<any>(this.baseUrl+'/endereco.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
  export class permissoes_visible {  
    end_bairro: boolean; 
    end_cep: boolean; 
    end_cidade: boolean; 
    end_codigo: boolean; 
    end_complemento: boolean; 
    end_endereco: boolean; 
    end_lat: boolean; 
    end_long: boolean; 
    end_numero: boolean; 
    end_referencia: boolean; 
    end_uf: boolean; 
} 
export class permissoes_disabled { 
    end_bairro: boolean; 
    end_cep: boolean; 
    end_cidade: boolean; 
    end_codigo: boolean; 
    end_complemento: boolean; 
    end_endereco: boolean; 
    end_lat: boolean; 
    end_long: boolean; 
    end_numero: boolean; 
    end_referencia: boolean; 
    end_uf: boolean; 
} 
