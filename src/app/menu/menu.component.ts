 
import { Observable } from "rxjs"; 
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../environments/environment"; 
import { TranslateService }   from './../shared/translate.service'; 
import { AuthService } from "./../auth/auth.service"; 
import { Component, OnInit } from "@angular/core"; 
import { Router } from "@angular/router"; 
import { DeviceDetectorService } from 'ngx-device-detector'; 
import { usuariosService } from '../services/usuarios.service';
import { first } from 'rxjs/operators';
@Component({ 
  selector: 'app-menu', 
  templateUrl: "./menu.component.html", 
}) 
export class MenuComponent implements OnInit {  
  public translatedText: string;   
  public supportedLangs: any[];  
  getStatus_logado$: Observable<boolean>;  
  getTipoGrupo$: Observable<boolean>; 
  getVendas$: Observable<boolean>; 
  getDeviceMob$: Observable<boolean>; 
  getDeviceDes$: Observable<boolean>; 
  navbarOpen = false; 
  TipoGrupo = environment.TipoGrupo;
  constructor(private apiusuarios:usuariosService,private cookieservice:CookieService,public deviceService: DeviceDetectorService, private authService: AuthService, private _translate: TranslateService,private router: Router) { } 
  ngOnInit() { 
    this.supportedLangs = [ 
     { display: 'English', value: 'en' }, 
     { display: 'Brasil', value: 'br' }, 
    ];  
    // set current langage  
    this.selectLang('br'); 
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
    this.getDeviceMob$ = this.authService.getDeviceMob; 
    this.getDeviceDes$ = this.authService.getDeviceDes; 
    this.getStatus_logado$ = this.authService.getStatus_logado; 
    this.getTipoGrupo$ = this.authService.getTipoGrupo; 
    this.getVendas$ = this.authService.getVendas; 
    console.log('getVendas',this.getVendas$);
    

    //console.log('tipo',this.getTipoGrupo$);
  } 
 
  toggleNavbar() { 
    this.navbarOpen = !this.navbarOpen; 
    this.router.navigate(['/Branco'], {skipLocationChange: true, fragment: 'top'}); 
  } 
 
  LoadLink(link:string){
    this.apiusuarios.Formato = 'T';
    this.router.navigate([link], {skipLocationChange: true, fragment: 'top'});
    this.navbarOpen = false; 
  }
 
  refreshText() {  
    // refresh translation when language change  
    this.translatedText = this._translate.instant('hello world'); 
  } 
  isCurrentLang(lang: string) { 
    // check if the selected lang is current lang 
    return lang === this._translate.currentLang; 
  } 
 
  selectLang(lang: string) { 
    // set current lang; 
    this._translate.use(lang); 
    this.refreshText(); 
  } 

  filtrorelusuarios(): void {  //CHAMA ROTA PARA FORM INSERT 
    this.apiusuarios.getRelatoriousuarios() 
      .pipe(first()) 
      .subscribe( 
        dados => { 
          this.authService.setStatus_logado = false;  
          console.log('relatorio',dados);  
          this.apiusuarios.arrusuarios = dados; 
          this.apiusuarios.origem = 'R';
          this.router.navigate(['Relatoriousuarios'], {skipLocationChange: true, fragment: 'top'}); 
        }, 
        error => { 
          console.log('erro:',error); 
      }); 
  };
 
  permissaoTela(Tela:string){ 
    let result:boolean=false; 
    let array:any[]=environment.Permissoes; 
    if (Array.isArray(array) && array.length){  
      for(let x=0;x<array.length;x++){ 
        if (array[x].tab_nome === Tela && array[x].pte_visualizar === '1'){ 
          result = true;  
        } 
      } 
    }else{  
      result = true; 
    } 
    return result; 
  } 
 
  onLogout(){ 
      this.cookieservice.delete('login'); 
      this.cookieservice.delete('senha'); 
      this.authService.setStatus_logado = false; 
      this.router.navigate(['login'], {skipLocationChange: true, fragment: 'top'}); 
  } 
 
  onHome(){ 
    this.router.navigate(['Inicial'], {skipLocationChange: true, fragment: 'top'}); 
  } 
} 
