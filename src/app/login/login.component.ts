import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'; 
import { AuthService } from "./../auth/auth.service";
import {NotificationService} from './../shared/notification.service';
import { TranslateService }   from './../shared/translate.service'; 
import { CookieService } from 'ngx-cookie-service'
import { usuariosService } from '../services/usuarios.service';
import { Observable } from 'rxjs/internal/Observable';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { first } from 'rxjs/operators';
import { pedidosService } from '../services/pedidos.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  public translatedText: string;
  public supportedLangs: any[];


  loginForm: FormGroup;
  returnUrl: string;
  vbase:string='';//this.cookieservice.get('base');
  getDeviceMob$: Observable<boolean>; 
  getDeviceDes$: Observable<boolean>; 
  Device:string;
  user: SocialUser;
  loggedIn: boolean;
  loginFB:boolean = false;
  
  cookievalue:string;
  constructor(
     private fb: FormBuilder
    , private http: HttpClient
    ,private router: Router
    ,private authService: AuthService
    ,private _translate : TranslateService 
    ,private notification:NotificationService 
    ,private cookieservice: CookieService
    ,private apiusuarios:usuariosService
    ,public deviceService: DeviceDetectorService
    ,private authServiceFB: SocialAuthService
    ,private apiusuario:usuariosService
    ,private apipedidos:pedidosService
    ) {

     }

    loginGoogle(){
      debugger
      
      this.apiusuario.getLogin()
      .subscribe(dados=>{
        console.log(dados);
      })
      
      }

      loginGoogleExt(){
        window.location.href = 'https://d1cuy5kphlalyw.cloudfront.net/yumy/loginfb.php';
      }
    

     signInWithGoogle(): void {
      debugger
      this.loginFB = true;
      this.authServiceFB.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
        debugger
        console.log('x',x);
        this.apiusuario.formData = { 
          gus_codigo: 22, 
          usu_codigo: null, 
          usu_email: x.email, 
          usu_login: x.email,
          usu_nome: x.name, 
          usu_senha: x.id, 
          usu_tipo:'C',
          usu_fone:null,
          usu_pontos:0,
          end_codigo:null,
          usu_foto:x.photoUrl,
          status_reg:'I'  
        };  
   this.apiusuarios.gravarusuarios(this.apiusuario.formData.status_reg) 
   .pipe(first()) 
   .subscribe( 
      data => { 
         console.log('usuario',data);
         if (data[0].retorno=='OK' && data[0].chave>0){
           this.cookieservice.set('login',x.email);
           this.cookieservice.set('senha',x.id);
           environment.NomeUsuario = x.name;
           environment.CodigoUsuario = data[0].chave;
           environment.EmailUsuario = x.email;
           environment.GrupoUsuario = 'COMPRADORES';
           environment.TipoUsuario = 'C'; 
           environment.TipoGrupo = 'C'; 
           let Login = {CodigoUsuario:data[0].chave,NomeUsuario:x.name,EmailUsuario:x.email,GrupoUsuario:'COMPRADORES',logado:true};
           this.authService.setResult_login = Login;
           this.authService.setStatus_logado = true;  
           this.authService.setTipoGrupo = false;
           this.authService.setVendas = false;
           this.router.navigate(['Formpedidos'], {skipLocationChange: true, fragment: 'top'});         
         }else{
           this.notification.success('Usuário não encontrado!')
         }
       }
      , 
      error => { 
        console.log('erro:',error); 
   });  

    


   console.log('2',x)});
}



signInWithFB(): void {
      debugger
      this.loginFB = true;
      
        
        

      
        this.authServiceFB.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
          debugger
          console.log('x',x);
          this.apiusuario.formData = { 
            gus_codigo: 22, 
            usu_codigo: null, 
            usu_email: x.email, 
            usu_login: x.email,
            usu_nome: x.name, 
            usu_senha: x.id, 
            usu_tipo:'C',
            usu_fone:null,
            usu_pontos:0,
            end_codigo:null,
            usu_foto:x.photoUrl,
            status_reg:'I'  
          };  
          this.apiusuarios.gravarusuarios(this.apiusuario.formData.status_reg) 
          .pipe(first()) 
          .subscribe( 
            data => { 
                console.log('usuario',data);
                if (data[0].retorno=='OK' && data[0].chave>0){
                  this.cookieservice.set('login',x.email);
                  this.cookieservice.set('senha',x.id);
                  environment.NomeUsuario = x.name;
                  environment.CodigoUsuario = data[0].chave;
                  environment.EmailUsuario = x.email;
                  environment.GrupoUsuario = 'COMPRADORES';
                  environment.TipoUsuario = 'C'; 
                  environment.TipoGrupo = 'C'; 
                  let Login = {CodigoUsuario:data[0].chave,NomeUsuario:x.name,EmailUsuario:x.email,GrupoUsuario:'COMPRADORES',logado:true};
                  this.authService.setResult_login = Login;
                  this.authService.setStatus_logado = true;  
                  this.authService.setTipoGrupo = false;
                  this.authService.setVendas = false;
                  this.router.navigate(['Formpedidos'], {skipLocationChange: true, fragment: 'top'});         
                }else{
                  this.notification.success('Usuário não encontrado!')
                }
              }
            , 
            error => { 
              console.log('erro:',error); 
          });  
        
        });
        
}
  
    signOut(): void {
      this.authServiceFB.signOut();
    }

    getPosition()
    {  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.apipedidos.lat = position.coords.latitude;
          this.apipedidos.lng = position.coords.longitude;
          console.log("position", position);
        });
      }
  
    }

  ngOnInit() {
   debugger
    if (!this.loginFB){
    this.getPosition();
      this.authServiceFB.authState.subscribe((user) => {
        this.user = user;
        console.log('user1',user);
      });
      if (this.deviceService.isMobile()){  
        this.authService.setDeviceMob = true; 
        environment.Device = 'M'; 
    } 
    else  
    if(this.deviceService.isTablet()){  
        this.authService.setDeviceDes = false;  
        environment.Device = 'T';  
    }  
    else 
    if (this.deviceService.isDesktop()){ 
        this.authService.setDeviceDes = true;  
        environment.Device = 'D'; 
    }
    this.Device = environment.Device;
    console.log('device',this.Device);
      this.vbase=this.cookieservice.get('base');
      console.log('base',this.vbase);

      console.log('server',this.cookieservice.get('servername'));
      localStorage.clear();
      this.supportedLangs = [
        { display: 'English', value: 'en' },
        { display: 'Brasil', value: 'br' },];

        // set current langage
        this.selectLang('br');

        this.loginForm = this.fb.group({
        login: ['', Validators.required],
        senha: ['', Validators.required]
      });
      //debugger
      let login = this.cookieservice.get('login');
      let senha = this.cookieservice.get('senha');
      this.loginForm.value.login = login;
      this.loginForm.value.senha = senha;
      if ((login != 'undefined')&&(senha != 'undefined')&&(login != '')&&(senha != '')){

        this.authService.login(this.loginForm.value).subscribe((data) => {
          console.log('ret login',data[0])
          
          
          if (data[0].autenticado==true) {    
            this.cookieservice.set('login',data[0].login);
            this.cookieservice.set('senha',data[0].senha);
            environment.NomeUsuario = data[0].nome;
            environment.CodigoUsuario = data[0].codigo;
            environment.EmailUsuario = data[0].email;
            environment.GrupoUsuario = data[0].grupo;
            environment.Permissoes = data[0].permissoes;
            environment.Sistema = data[0].sistema; 
            environment.TipoUsuario = data[0].tipo; 
            environment.Endereco = data[0].end_endereco;
            environment.TipoGrupo = data[0].tipo_grupo; 
            if (data[0].tipo_grupo=='A'){
              this.authService.setTipoGrupo = true;
            }else{
              this.authService.setTipoGrupo = false;
            }
            if (data[0].tipo_grupo=='C'){
              this.authService.setVendas = false;
            }else{
              this.authService.setVendas = true;
            }
            localStorage.setItem('token', data[0].token);        
            let Login = {CodigoUsuario:data[0].codigo,NomeUsuario:data[0].nome,EmailUsuario:data[0].email,GrupoUsuario:data[0].grupo,logado:true};
            this.authService.setResult_login = Login;
            this.authService.setStatus_logado = true;   
            console.log('ret login',this.authService.getResult_login)
            
            if (environment.TipoGrupo=='A' || environment.TipoGrupo=='V'){
              this.router.navigate(['Inicial'], {skipLocationChange: true, fragment: 'top'}); 
            }else{
              console.log('vai para onde',environment.TipoGrupo);
              this.router.navigate(['Formpedidos'], {skipLocationChange: true, fragment: 'top'}); 
            }
          } else {
            this.notification.success('Login e senha incorretos!') 
          }
        },
        );
      }
    }
  

  }

  isCurrentLang(lang: string) {
    // check if the selected lang is current lang
    return lang === this._translate.currentLang;
  }

  refreshText() {
      // refresh translation when language change
      this.translatedText = this._translate.instant('hello world');
  }

  selectLang(lang: string) {
      // set current lang;
      this._translate.use(lang);
      this.refreshText();
  }

  registrar(){
    if (this.Device === 'D'){
      this.apiusuarios.Formato = 'W';
    }else{
      this.apiusuarios.Formato = 'C';
    }
    
    this.apiusuarios.origem = 'L';
    this.router.navigate(['Formusuarios'], {skipLocationChange: true, fragment: 'top'});
  }

  onSubmit() {
    debugger
    this.authService.login(this.loginForm.value).subscribe((data) => {
      console.log('ret login',data[0])
      
       
      if (data[0].autenticado==true) {
        //debugger    
        this.cookieservice.set('login',this.loginForm.value.login);
        this.cookieservice.set('senha',this.loginForm.value.senha);
        environment.NomeUsuario = data[0].nome;
        environment.CodigoUsuario = data[0].codigo;
        environment.EmailUsuario = data[0].email;
        environment.GrupoUsuario = data[0].grupo;
        environment.Permissoes = data[0].permissoes;
        environment.Sistema = data[0].sistema; 
        environment.TipoUsuario = data[0].tipo; 
        environment.TipoGrupo = data[0].tipo_grupo; 
        environment.Endereco = data[0].end_endereco;
        localStorage.setItem('token', data[0].token);        
        let Login = {CodigoUsuario:data[0].codigo,NomeUsuario:data[0].nome,EmailUsuario:data[0].email,GrupoUsuario:data[0].grupo,logado:true};
        this.authService.setResult_login = Login;
        this.authService.setStatus_logado = true;  
        if (data[0].tipo_grupo=='A'){
          this.authService.setTipoGrupo = true;
        }else{
          this.authService.setTipoGrupo = false;
        }
        if (data[0].tipo_grupo=='C'){
          this.authService.setVendas = false;
        }else{
          this.authService.setVendas = true;
        }
        
        console.log('ret login',this.authService.getResult_login)
        if (environment.TipoGrupo=='A' || environment.TipoGrupo=='V'){
          this.router.navigate(['Inicial'], {skipLocationChange: true, fragment: 'top'}); 
        }else{
          this.router.navigate(['Formpedidos'], {skipLocationChange: true, fragment: 'top'}); 
        }
         
      } else {
        this.notification.success('Login e senha incorretos!') 
      }
    },
    );
  }
}


