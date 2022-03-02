import {Component, OnInit} from "@angular/core"; 
import {Router,ActivatedRoute} from "@angular/router"; 
import {NgForm} from "@angular/forms"; 
import {permissoes_tabelasService} from "../../services/permissoes_tabelas.service"; 
import {DialogService} from "../../shared/dialog.service"; 
import {NotificationService} from "../../shared/notification.service"; 
import { first } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service";
import {map} from 'rxjs/operators';  
import {Observable} from 'rxjs'; 
import {tabelasService} from "../../services/tabelas.service";
import {tabelas} from "../../model/tabelas.model";
 
@Component({ 
  selector: 'app-filtrorel-permissoes_tabelas', 
  templateUrl: './filtrorel-permissoes_tabelas.component.html', 
}) 
export class Filtrorelpermissoes_tabelasComponent implements OnInit { 
  isValid: boolean = true; 
 arrtabelas:Observable<any[]>; 
 
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: Router 
   , public apiService: permissoes_tabelasService 
   , private dialogService: DialogService 
   , private notification:NotificationService 
   , private authService: AuthService 
, private apitabelas:tabelasService
  ) { }  
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS 
  ngOnInit() { 
  this.apitabelas.gettabelas().subscribe( data => {  
    this.arrtabelas = data; 
    console.log('combo',data); 
    return data; 
 }); 
    this.resetForm(); 
  } 
  resetForm(form?: NgForm) {//NOVO REGISTRO RESET DADOS E COLOCAR VALORES PADROES 
    if (form = null) 
      form.resetForm(); 
    this.apiService.formParRel = { 
      tab_titulo:'',
    }; 
  } 
 
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM  
    this.isValid = true; 
    if (this.apiService.formParRel.tab_titulo == null) 
      this.isValid = false; 
    return this.isValid; 
  }  
 
  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM PARA SERVICE CHAMAR A FUNCAO PARA GRAVAR NO BACKEND 
    if (this.validateForm()) { 
      this.apiService.postRelatoriopermissoes_tabelas() 
        .pipe(first()) 
        .subscribe( 
           dados => { 
              console.log('relatorio',dados);  
              this.apiService.arrpermissoes_tabelas = dados; 
              this.authService.setStatus_logado = false; 
              this.apiService.strParametros = '    Título - '+this.apiService.formParRel.tab_titulo+''; 
              console.log('para',this.apiService.strParametros) 
              this.router.navigate(['Relatoriopermissoes_tabelas'], {skipLocationChange: true, fragment: 'top'}); 
           }, 
           error => { 
             console.log('erro:',error); 
        }); 
    }else{ 
      this.notification.success('Favor preencher os campos obrigatórios!') 
    } 
  } 
 
 formatDate(vDate:Date){ 
    let dia = vDate.getDate()-1; 
    let mes = vDate.getMonth()+1; 
    let ano = vDate.getFullYear(); 
    let strDate = dia+'/'+mes+'/'+ano; 
    return strDate; 
  } 
 
  onCancelar() { 
    this.router.navigate(['Listarpermissoes_tabelas'], {skipLocationChange: true, fragment: 'top'}); 
  } 
} //FIM - CONSTRUTOR
