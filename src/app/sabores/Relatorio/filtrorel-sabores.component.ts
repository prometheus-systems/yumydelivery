import {Component, OnInit} from "@angular/core"; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router,ActivatedRoute} from "@angular/router"; 
import {NgForm} from "@angular/forms"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {saboresService} from "../../services/sabores.service"; 
import {DialogService} from "../../shared/dialog.service"; 
import {NotificationService} from "../../shared/notification.service"; 
import { first } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service";
import {map} from 'rxjs/operators';  
import {Observable} from 'rxjs'; 
import { environment } from "../../../environments/environment"; 
import {cardapioService} from "../../services/cardapio.service";
import {cardapio} from "../../model/cardapio.model";
 
@Component({ 
  selector: 'app-filtrorel-sabores', 
  templateUrl: './filtrorel-sabores.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
export class FiltrorelsaboresComponent implements OnInit { bounce:any;
  Device = environment.Device; 
  isValid: boolean = true; 
  baseUrl = environment.URLBase; 
 arrcardapio:Observable<any[]>; 
 
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: Router 
   , public apiService: saboresService 
   , private dialogService: DialogService 
   , private _translate: TranslateService 
   , private notification:NotificationService 
   , private authService: AuthService 
, private apicardapio:cardapioService
  ) { }  
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS 
  ngOnInit() { 
  this.apicardapio.getcardapio().subscribe( data => {  
    this.arrcardapio = data; 
    console.log('combo',data); 
    return data; 
 }); 
    this.resetForm(); 
  } 
  resetForm(form?: NgForm) {//NOVO REGISTRO RESET DADOS E COLOCAR VALORES PADROES 
    if (form = null) 
      form.resetForm(); 
    this.apiService.formParRel = { 
      car_nome:'',
    }; 
  } 
 
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM  
    this.isValid = true; 
    if (this.apiService.formParRel.car_nome == null) 
      this.isValid = false; 
    return this.isValid; 
  }  
 
  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM para SERVICE CHAMAR A FUNCAO para FILTRO DO RELATORIO 
    if (this.validateForm()) { 
      this.apiService.postRelatoriosabores() 
        .pipe(first()) 
        .subscribe( 
           dados => { 
           if (Array.isArray(dados) && dados.length){ 
              console.log('relatorio',dados);  
              this.apiService.arrsabores = dados; 
                this.authService.setStatus_logado = false; 
                }else{  
                  this.notification.success('Não encontrou lançamentos!');
               } 
              this.apiService.strParametros = '   Nome - '+this.apiService.formParRel.car_nome+''; 
              console.log('para',this.apiService.strParametros) 
              if (Array.isArray(this.apiService.arrsabores) && this.apiService.arrsabores.length){  
                this.router.navigate(['relatoriosabores'], {skipLocationChange: true, fragment: 'top'}); 
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
