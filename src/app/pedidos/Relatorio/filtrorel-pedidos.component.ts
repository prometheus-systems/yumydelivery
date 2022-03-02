import {Component, OnInit} from "@angular/core"; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router,ActivatedRoute} from "@angular/router"; 
import {NgForm} from "@angular/forms"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {pedidosService} from "../../services/pedidos.service"; 
import {DialogService} from "../../shared/dialog.service"; 
import {NotificationService} from "../../shared/notification.service"; 
import { first } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service";
import {map} from 'rxjs/operators';  
import {Observable} from 'rxjs'; 
import { environment } from "../../../environments/environment"; 
 
@Component({ 
  selector: 'app-filtrorel-pedidos', 
  templateUrl: './filtrorel-pedidos.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
export class FiltrorelpedidosComponent implements OnInit { bounce:any;
  Device = environment.Device; 
  isValid: boolean = true; 
  baseUrl = environment.URLBase; 
 
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: Router 
   , public apiService: pedidosService 
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
      ped_datahora1: new Date(),
      strped_datahora1: new Date().toLocaleString(),
      ped_datahora2: new Date(),
      strped_datahora2: new Date().toLocaleString(),
    }; 
  } 
 
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM  
    this.isValid = true; 
    if (this.apiService.formParRel.ped_datahora1 == null) 
      this.isValid = false; 
    if (this.apiService.formParRel.ped_datahora2 == null) 
      this.isValid = false; 
    return this.isValid; 
  }  
 
  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM para SERVICE CHAMAR A FUNCAO para FILTRO DO RELATORIO 
    if (this.apiService.formParRel.ped_datahora1){ 
      this.apiService.formParRel.strped_datahora1 = this.apiService.formParRel.ped_datahora1.toLocaleString();  
    }  
    if (this.apiService.formParRel.ped_datahora2){ 
      this.apiService.formParRel.strped_datahora2 = this.apiService.formParRel.ped_datahora2.toLocaleString();  
    } 
    if (this.validateForm()) { 
      this.apiService.postRelatoriopedidos() 
        .pipe(first()) 
        .subscribe( 
           dados => { 
           if (Array.isArray(dados) && dados.length){ 
              console.log('relatorio',dados);  
              this.apiService.arrpedidos = dados; 
                this.authService.setStatus_logado = false; 
                }else{  
                  this.notification.success('Não encontrou lançamentos!');
               } 
              this.apiService.strParametros = ''; 
              console.log('para',this.apiService.strParametros) 
              if (Array.isArray(this.apiService.arrpedidos) && this.apiService.arrpedidos.length){  
                this.router.navigate(['relatoriopedidos'], {skipLocationChange: true, fragment: 'top'}); 
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
