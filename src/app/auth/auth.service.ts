import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { login } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  serverUrl = environment.URLBase;

  errorData: {};

  private result_login = new BehaviorSubject<login>({CodigoUsuario:0,NomeUsuario:'',EmailUsuario:'',logado:false}); 
  private status_logado = new BehaviorSubject<boolean>(false); 
  private TipoGrupo = new BehaviorSubject<boolean>(false); 
  private Vendas = new BehaviorSubject<boolean>(false); 
  private DeviceDes = new BehaviorSubject<boolean>(null); 
  private DeviceMob = new BehaviorSubject<boolean>(null);  
  //headers = new Headers;
  constructor(
 
      private http: HttpClient
    , private router: Router
   
  ) {      
    /*this.headers.append("Content-Type","application/json");
    this.headers.append("Authorization","Bearer "+localStorage.getItem('token'));*/
  }
  
  ngOnInit() {   

  }


  login(login:Login) : Observable<any> {   
    return this.http.post(this.serverUrl+'/login.php',login)
  } 

  get getDeviceDes(){
    return this.DeviceDes.asObservable();  
  }

  set setDeviceDes(param:boolean) {
    this.DeviceDes.next(param); 
  }

  get getDeviceMob(){
    return this.DeviceMob.asObservable();  
  }

  set setDeviceMob(param:boolean) {
    this.DeviceMob.next(param); 
  }
 
  get getResult_login() {
    return this.result_login.asObservable(); 
  }

  get getStatus_logado(){
    return this.status_logado.asObservable();  
  }

  set setStatus_logado(param:boolean) {
    this.status_logado.next(param); 
  }

  get getTipoGrupo(){
    return this.TipoGrupo.asObservable();  
  }

  set setTipoGrupo(param:boolean) {
    this.TipoGrupo.next(param); 
  }

  get getVendas(){
    return this.Vendas.asObservable();  
  }

  set setVendas(param:boolean) {
    this.Vendas.next(param); 
  }

  set setResult_login(param:login) {
    this.result_login.next(param); 
  }

  logout() {                          
    this.status_logado.next(false);
    this.router.navigate(['/login']);
  }


}

export class Login {
  login: string;
  senha: string;
}
