import {Component, OnInit} from "@angular/core"; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router,ActivatedRoute} from "@angular/router"; 
import { TranslateService }   from './../../shared/translate.service'; 
import {NgForm} from "@angular/forms"; 
import {checklist_pedidosService} from "../../services/checklist_pedidos.service"; 
import {DialogService} from "../../shared/dialog.service"; 
import {NotificationService} from "../../shared/notification.service"; 
import { first } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service";
import {map} from 'rxjs/operators';  
import {Observable} from 'rxjs'; 
import { environment } from 'src/environments/environment';
 
@Component({ 
  selector: 'app-filtroapto-checklist_pedidos', 
  templateUrl: './filtroapto-checklist_pedidos.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
export class Filtroaptochecklist_pedidosComponent implements OnInit { bounce:any;
  Device = environment.Device; 
  isValid: boolean = true; 
 
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: Router 
   , public apiService: checklist_pedidosService 
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
    this.apiService.formParApto = { 
    }; 
  } 
 
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM  
    this.isValid = true; 
    return this.isValid; 
  }  
 
  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM para SERVICE CHAMAR A FUNCAO para FILTRO DE APONTAMENTO 
    if (this.validateForm()) { 
      this.apiService.postApontamentochecklist_pedidos() 
        .pipe(first()) 
        .subscribe( 
           dados => { 
              console.log('APONTAMENTO',dados);  
              this.apiService.arrchecklist_pedidos = [];  
              this.apiService.arrTempochecklist_pedidos = []; 
              this.apiService.arrItenschecklist_pedidos = []; 
              this.apiService.arrchecklist_pedidos = dados; 
              if (Array.isArray(this.apiService.arrchecklist_pedidos) && this.apiService.arrchecklist_pedidos.length){ 
                for (let i=0;i<this.apiService.arrchecklist_pedidos.length;i++){  
                  if (Array.isArray(this.apiService.arrchecklist_pedidos[i].itemsTime) && this.apiService.arrchecklist_pedidos[i].itemsTime.length){ 
                    for (let x=0;x<this.apiService.arrchecklist_pedidos[i].itemsTime.length;x++){ 
                      this.apiService.arrTempochecklist_pedidos.push(this.apiService.arrchecklist_pedidos[i].itemsTime[x]); 
                    } 
                  } 
                } 
                for (let i=0;i<this.apiService.arrchecklist_pedidos.length;i++){  
                  if (Array.isArray(this.apiService.arrchecklist_pedidos[i].itemsChild) && this.apiService.arrchecklist_pedidos[i].itemsChild.length){ 
                    for (let x=0;x<this.apiService.arrchecklist_pedidos[i].itemsChild.length;x++){ 
                      this.apiService.arrItenschecklist_pedidos.push(this.apiService.arrchecklist_pedidos[i].itemsChild[x]); 
                    } 
                  } 
                } 
                this.apiService.setarrchecklist_pedidos = dados; 
                this.apiService.dataSource.data = dados;  
                console.log('pai',this.apiService.arrchecklist_pedidos); 
                this.apiService.strParametros = ''; 
                console.log('para',this.apiService.strParametros) 
                this.router.navigate(['Apontamentochecklist_pedidos'], {skipLocationChange: true, fragment: 'top'}); 
              } 
              else{  
                this.notification.success('Não encontrou lançamentos!')  
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
 
} //FIM - CONSTRUTOR
