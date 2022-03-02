﻿import {Component, OnInit} from "@angular/core"; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router,ActivatedRoute} from "@angular/router"; 
import {NgForm} from "@angular/forms"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {cardapioService} from "../../services/cardapio.service"; 
import {DialogService} from "../../shared/dialog.service"; 
import {NotificationService} from "../../shared/notification.service"; 
import { first } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service";
import {map} from 'rxjs/operators';  
import {Observable} from 'rxjs'; 
import { environment } from "../../../environments/environment"; 
import {vendedoresService} from "../../services/vendedores.service";
import {vendedores} from "../../model/vendedores.model";
 
@Component({ 
  selector: 'app-filtrorel-cardapio', 
  templateUrl: './filtrorel-cardapio.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
export class FiltrorelcardapioComponent implements OnInit { bounce:any;
  Device = environment.Device; 
  isValid: boolean = true; 
  baseUrl = environment.URLBase; 
 arrvendedores:Observable<any[]>; 
 
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: Router 
   , public apiService: cardapioService 
   , private dialogService: DialogService 
   , private _translate: TranslateService 
   , private notification:NotificationService 
   , private authService: AuthService 
, private apivendedores:vendedoresService
  ) { }  
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS 
  ngOnInit() { 
  this.apivendedores.getvendedores().subscribe( data => {  
    this.arrvendedores = data; 
    console.log('combo',data); 
    return data; 
 }); 
    this.resetForm(); 
  } 
  resetForm(form?: NgForm) {//NOVO REGISTRO RESET DADOS E COLOCAR VALORES PADROES 
    if (form = null) 
      form.resetForm(); 
    this.apiService.formParRel = { 
      ven_nome:'',
    }; 
  } 
 
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM  
    this.isValid = true; 
    if (this.apiService.formParRel.ven_nome == null) 
      this.isValid = false; 
    return this.isValid; 
  }  
 
  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM para SERVICE CHAMAR A FUNCAO para FILTRO DO RELATORIO 
    if (this.validateForm()) { 
      this.apiService.postRelatoriocardapio() 
        .pipe(first()) 
        .subscribe( 
           dados => { 
           if (Array.isArray(dados) && dados.length){ 
              console.log('relatorio',dados);  
              this.apiService.arrcardapio = dados; 
              if (Array.isArray(this.apiService.arrcardapio) && this.apiService.arrcardapio.length){ 
                for(let x=0;x<this.apiService.arrcardapio.length;x++){ 
                  if (this.apiService.arrcardapio[x].car_imagen){ 
                    this.apiService.arrcardapio[x].car_imagen= this.baseUrl+'/'+this.apiService.arrcardapio[x].car_imagen; 
                  }else{ 
                    this.apiService.arrcardapio[x].car_imagen = this.baseUrl+'/alternative.png';  
                  } 
                }  
              }  
                this.authService.setStatus_logado = false; 
                }else{  
                  this.notification.success('Não encontrou lançamentos!');
               } 
              this.apiService.strParametros = '   Nome - '+this.apiService.formParRel.ven_nome+''; 
              console.log('para',this.apiService.strParametros) 
              if (Array.isArray(this.apiService.arrcardapio) && this.apiService.arrcardapio.length){  
                this.router.navigate(['relatoriocardapio'], {skipLocationChange: true, fragment: 'top'}); 
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
