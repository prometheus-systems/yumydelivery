 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {sabores} from "../model/sabores.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class saboresService  { 
    formData: sabores;  
    formDisabled:permissoes_disabled; 
    formVisible:permissoes_visible; 
    formParRel:any; 
    strParametros:string=''; 
    arrsabores:any[]=[]; 
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
 
  postRelatoriosabores(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/sabores.php?operacao=REL',body, this.httpOptions); 
    } 


 
 
  getRelatoriosabores(): Observable<any> { 
    if (environment.TipoGrupo=='V'){
      return this.http.get<any>(this.baseUrl+'/sabores.php?operacao=REL&vendedor='+environment.CodigoUsuario, this.httpOptions); 
    }else{
      return this.http.get<any>(this.baseUrl+'/sabores.php?operacao=REL', this.httpOptions); 

    }
  } 
  
  copiar(car1,car2) : Observable<any>{  
      return this.http.get<any>(this.baseUrl+'/sabores.php?operacao=COP&carde='+car1+'&carpara='+car2, this.httpOptions); 
  }
  
 
  getsabores() : Observable<any>{  
    if (environment.TipoGrupo=='V'){
        return this.http.get<sabores>(this.baseUrl+'/sabores.php?operacao=C&vendedor='+environment.CodigoUsuario, this.httpOptions); 
    }else{
      return this.http.get<sabores>(this.baseUrl+'/sabores.php?operacao=C', this.httpOptions); 
      
    }
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItenssabores() {  
    return this.http.get(this.baseUrl+'/sabores.php?operacao=C', this.httpOptions).toPromise(); 
  } 
  getsaboresId(id: string): Observable<sabores> {  
    return this.http.get<sabores>(this.baseUrl+'/sabores.php?operacao=R&id='+id, this.httpOptions); 
  }  

  uploadimage(formData): Observable<any>{  
    return this.http.post<any>(this.baseUrl+'/uploadsabores.php',formData, this.httpOptions); 
  }  

  SetUser(){ 
  } 

  gravarsabores(operacao:string) : Observable<sabores> { 
    this.formData.usu_codigo = environment.CodigoUsuario; 
  
    var body = {  
     ...this.formData 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/sabores.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deletesabores(id:number): Observable<sabores> {  
    return this.http.get<any>(this.baseUrl+'/sabores.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
  export class permissoes_visible {  
    car_codigo: boolean; 
    sab_codigo: boolean; 
    sab_descricao: boolean; 
    sab_nome: boolean; 
    sab_valor: boolean; 
} 
export class permissoes_disabled { 
    car_codigo: boolean; 
    sab_codigo: boolean; 
    sab_descricao: boolean; 
    sab_nome: boolean; 
    sab_valor: boolean; 
} 
