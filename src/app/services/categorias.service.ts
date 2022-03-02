 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {categorias} from "../model/categorias.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class categoriasService  { 
    formData: categorias;  
    formDisabled:permissoes_disabled; 
    formVisible:permissoes_visible; 
    formParRel:any; 
    strParametros:string=''; 
    arrcategorias:any[]=[]; 
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
 
  postRelatoriocategorias(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/categorias.php?operacao=REL',body, this.httpOptions); 
    } 
 
 
  getRelatoriocategorias(): Observable<any> { 
      return this.http.get<any>(this.baseUrl+'/categorias.php?operacao=REL', this.httpOptions); 
  } 
 
 
  getcategorias() : Observable<any>{  
    return this.http.get<categorias>(this.baseUrl+'/categorias.php?operacao=C', this.httpOptions); 
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItenscategorias() {  
    return this.http.get(this.baseUrl+'/categorias.php?operacao=C', this.httpOptions).toPromise(); 
  } 
  getcategoriasId(id: string): Observable<categorias> {  
    return this.http.get<categorias>(this.baseUrl+'/categorias.php?operacao=R&id='+id, this.httpOptions); 
  }  

  uploadimage(formData): Observable<any>{  
    return this.http.post<any>(this.baseUrl+'/uploadcategorias.php',formData, this.httpOptions); 
  }  

  SetUser(){ 
  } 

  gravarcategorias(operacao:string) : Observable<categorias> { 
    this.formData.usu_codigo = environment.CodigoUsuario; 
  
    var body = {  
     ...this.formData 
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/categorias.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deletecategorias(id:number): Observable<categorias> {  
    return this.http.get<any>(this.baseUrl+'/categorias.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
  export class permissoes_visible {  
    cat_codigo: boolean; 
    cat_imagem: boolean; 
    cat_nome: boolean; 
} 
export class permissoes_disabled { 
    cat_codigo: boolean; 
    cat_imagem: boolean; 
    cat_nome: boolean; 
} 
