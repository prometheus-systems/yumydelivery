import {Component, OnInit} from "@angular/core"; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router,ActivatedRoute} from "@angular/router"; 
import {NgForm} from "@angular/forms"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {vendedoresService} from "../../services/vendedores.service"; 
import {DialogService} from "../../shared/dialog.service"; 
import {NotificationService} from "../../shared/notification.service"; 
import { first } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service";
import {map} from 'rxjs/operators';  
import {Observable} from 'rxjs'; 
import { environment } from "../../../environments/environment"; 
 
@Component({ 
  selector: 'app-filtrorel-vendedores', 
  templateUrl: './filtrorel-vendedores.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
export class FiltrorelvendedoresComponent implements OnInit { bounce:any;
  Device = environment.Device; 
  isValid: boolean = true; 
  baseUrl = environment.URLBase; 
 
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: Router 
   , public apiService: vendedoresService 
   , private dialogService: DialogService 
   , private _translate: TranslateService 
   , private notification:NotificationService 
   , private authService: AuthService 
  ) { }  
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS 
  ngOnInit() { 
    this.resetForm(); 
  } 
  resetForm(form?: NgForm) {//NOVO REGISTRO RESET DADOS E COLOCAR VALORES PADROES 
    if (form = null) 
      form.resetForm(); 
    this.apiService.formParRel = { 
    }; 
  } 
 
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM  
    this.isValid = true; 
    return this.isValid; 
  }  
 
  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM para SERVICE CHAMAR A FUNCAO para FILTRO DO RELATORIO 
    if (this.validateForm()) { 
      this.apiService.postRelatoriovendedores() 
        .pipe(first()) 
        .subscribe( 
           dados => { 
           if (Array.isArray(dados) && dados.length){ 
              console.log('relatorio',dados);  
              this.apiService.arrvendedores = dados; 
                this.authService.setStatus_logado = false; 
                }else{  
                  this.notification.success('Não encontrou lançamentos!');
               } 
              this.apiService.strParametros = ''; 
              console.log('para',this.apiService.strParametros) 
              if (Array.isArray(this.apiService.arrvendedores) && this.apiService.arrvendedores.length){  
                this.router.navigate(['relatoriovendedores'], {skipLocationChange: true, fragment: 'top'}); 
              }else{ 
                this.notification.success('Não encontrou lançamentos!');
             } 
           }, 
           error => { 
             console.log('erro:',error); 
        }); 
    }else{ 
      this.notification.success('Favor preencher os campos obrigatórios!') 
    } 
  } 
 
 formatDate(vDate:Date){ 
    let dia = vDate.getDate(); 
    let mes = vDate.getMonth()+1; 
    let ano = vDate.getFullYear(); 
    let strDate = dia+'/'+mes+'/'+ano; 
    return strDate; 
  } 
 
  onCancelar() { 
    this.router.navigate(['Inicial'], {skipLocationChange: true, fragment: 'top'}); 
  } 
} //FIM - CONSTRUTOR
