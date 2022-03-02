 
import {Component, OnInit} from '@angular/core'; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router,ActivatedRoute} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {bonificacao} from "../../model/bonificacao.model"; 
import {NgForm} from "@angular/forms"; 
import {first} from "rxjs/operators"; 
import {bonificacaoService} from "../../services/bonificacao.service"; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'; 
import { environment } from "../../../environments/environment"; 
import {bonificacaoHelpComponent} from '../../shared/loadhelp-bonificacao.component'; 
//importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {cardapioService} from "../../services/cardapio.service"; 
import {cardapio} from "../../model/cardapio.model"; 
import {vendedoresService} from "../../services/vendedores.service"; 
import {vendedores} from "../../model/vendedores.model"; 
//FIM - importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import {DialogService} from '../../shared/dialog.service'; 
import {Location} from '@angular/common'; 
import {NotificationService} from '../../shared/notification.service'; 
@Component({ 
  selector: 'app-form-bonificacao', 
  templateUrl: './form-bonificacao.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
export class FormbonificacaoComponent implements OnInit { bounce:any; 
  Device = environment.Device;
  TipoGrupo = environment.TipoGrupo;
  files: Set<File>; 
  fileNames:any[]=[]; 
  //DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  arrcardapio:Observable<cardapio[]>; 
  arrvendedores:Observable<vendedores[]>; 
  //FIM - DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  isValid: boolean = true; 
  baseUrl = environment.URLBase;  
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: ActivatedRoute  
   , private myrouter: Router 
   , private _translate: TranslateService   
   , public apiService: bonificacaoService 
   , private dialog: MatDialog 
   , private location:Location 
   , private dialogService: DialogService 
   , private notification:NotificationService 
   , private apicardapio:cardapioService 
   , private apivendedores:vendedoresService 
  ) { } 
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS
  ngOnInit() {  
    this.TipoGrupo = environment.TipoGrupo;
    //************************************************ 
    //INICIO - PERMISSOES 
    this.apiService.formDisabled = { 
        bon_codigo:false,   
        bon_pontos:false,   
        car_codigo:false,   
        ven_codigo:false,   
    }; 
    this.apiService.formVisible = { 
        bon_codigo:true,   
        bon_pontos:true,   
        car_codigo:true,   
        ven_codigo:true,   
    }; 
    this.permissaoFieldDisabled('bonificacao'); 
    this.permissaoFieldVisible('bonificacao'); 
    //FIM - PERMISSOES 
    //************************************************ 
    //VERIFICA SE A ROTA TEM parametro E EDICAO (FAZ LOAD DOS DADOS DO REGISTRO SELECIONADO E ITENS), SENAO E INSERCAO 
    let id = this.router.snapshot.paramMap.get('id'); 
    if (id){ 
      this.apiService.getbonificacaoId(id).subscribe( data => { 
        data[0].status_reg = 'U'; 
        this.apiService.formData = data[0]; 
        this.apiService.formData.status_reg = 'U'; 
      });  
    }else{  
      this.resetForm(); 
    }  
    //LOAD DOS ARRAY CHAVE ESTRANGEIRA 
    this.arrcardapio = this.apicardapio.getcardapio().pipe( 
      map(dados => { 
      console.log(dados); 
      return dados; 
    }));  
    this.arrvendedores = this.apivendedores.getvendedores().pipe( 
      map(dados => { 
      console.log(dados); 
      return dados; 
    }));  
  }  

  goHelp(tabela:string){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = true; 
    dialogConfig.width = "75%"; 
    dialogConfig.data = { tabela }; 
    this.dialog.open(bonificacaoHelpComponent, dialogConfig).afterClosed().subscribe(res => { 
    });  
  }  

  onFileSelect(event) { 
    const selectedFiles = <FileList>event.srcElement.files; 
    const fileNames = []; 
    this.files = new Set(); 
    for (let i = 0; i < selectedFiles.length; i++) { 
       this.fileNames.push(selectedFiles[i].name); 
       this.files.add(selectedFiles[i]); 
     } 
  } 

  resetForm(form?: NgForm) {//NOVO REGISTRO RESET DADOS E COLOCAR VALORES PADROES 
    if (form = null)  
      form.resetForm(); 
    let vNewDate = new Date();//this.ConverteData(strDate); 
    this.apiService.formData = { 
      bon_codigo: null, 
      bon_pontos:0,  
      car_codigo: null, 
      ven_codigo: null, 
      status_reg:'I',  
      usu_codigo:environment.CodigoUsuario
    };  

  }  
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM
    this.isValid = true; 
    if (this.apiService.formData==null) 
      this.isValid = false; 
    else if (this.apiService.formData.bon_pontos == null) 
      this.isValid = false; 
    else if (this.apiService.formData.car_codigo == null) 
      this.isValid = false;     
    else if (this.apiService.formData.ven_codigo == null && this.TipoGrupo=='A') 
      this.isValid = false; 
    return this.isValid; 
  } 
  //************************************ */  
  //verifica permissoes de campos   
  permissaoFieldDisabled(Tela:string){ 
    let array:any[]=[];   
    array = environment.Permissoes.filter(x=>x.tab_nome===Tela);    
    if (Array.isArray(array) && array.length){   
      for(let x=0;x<array[0].campos.length;x++){ 
        if (array[0].campos[x].pca_permissao === 'Visualiza'){ 
          //***********************/   
          switch(array[0].campos[x].cmp_nome) {
            case 'bon_codigo': {   
              this.apiService.formDisabled.bon_codigo = true; 
              break;  
            }    
            case 'bon_pontos': {   
              this.apiService.formDisabled.bon_pontos = true; 
              break;  
            }    
            case 'car_codigo': {   
              this.apiService.formDisabled.car_codigo = true; 
              break;  
            }    
            case 'ven_codigo': {   
              this.apiService.formDisabled.ven_codigo = true; 
              break;  
            }    
         }
        //**************/  
        } 
      } 
    }  
  }  

  permissaoFieldVisible(Tela:string){ 
    let array:any[]=[]; 
    array = environment.Permissoes.filter(x=>x.tab_nome===Tela);
    if (Array.isArray(array) && array.length){   
      for(let x=0;x<array[0].campos.length;x++){  
        if (array[0].campos[x].pca_permissao === 'Invisivel'){ 
          //***********************/  
          switch(array[0].campos[x].cmp_nome) {  
            case 'bon_codigo': {   
              this.apiService.formVisible.bon_codigo = false; 
              break;  
            }    
            case 'bon_pontos': {   
              this.apiService.formVisible.bon_pontos = false; 
              break;  
            }    
            case 'car_codigo': {   
              this.apiService.formVisible.car_codigo = false; 
              break;  
            }    
            case 'ven_codigo': {   
              this.apiService.formVisible.ven_codigo = false; 
              break;  
            }    
         } 
        //**************/ 
        }  
      } 
    } 
  } 
//fim permissoes de campos 
 //*********************************** */ 
  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM para SERVICE CHAMAR A FUNCAO para GRAVAR NO BACKEND
    if (this.validateForm()) { 
      this.apiService.gravarbonificacao(this.apiService.formData.status_reg) 
        .pipe(first()) 
        .subscribe( 
           data => {  
             console.log('ret-update',data);
             if (this.apiService.formData.status_reg == 'U'){ 
               if(data[0].chave > 0) { 
                  console.log('bonificacao ATUALIZADO COM EXITO.',data); 
               }else { 
                 console.log('ERRO: AO ATUALIZAR bonificacao'); 
               }  
             }else{  
                console.log('ret-insert',data);
                this.resetForm();
              } 
              this.myrouter.navigate(['Listarbonificacao'], {skipLocationChange: true, fragment: 'top'}); 
           }, 
           error => { 
             console.log('erro:',error); 
        }); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
    }   
  }  
  
  onCancelar() { 
    this.myrouter.navigate(['Listarbonificacao'], {skipLocationChange: true, fragment: 'top'}); 
  } 


permissaoInsert(Tela:string){ 
    let result:boolean=false; 
    let array:any[]=environment.Permissoes;
      if (Array.isArray(array) && array.length){ 
      for(let x=0;x<array.length;x++){
        if (array[x].tab_nome === Tela && array[x].pte_inserir === '1'){ 
          result = true; 
        }  
      }  
    }else{  
      result = true; 
    }  
    return result;  
  } 

  permissaoDelete(Tela:string){ 
    let result:boolean=false; 
    let array:any[]=environment.Permissoes; 
    if (Array.isArray(array) && array.length){ 
      for(let x=0;x<array.length;x++){ 
        if (array[x].tab_nome === Tela && array[x].pte_excluir === '1'){
          result = true; 
        }   
      }  
    }else{  
      result = true; 
    }  
    return result;
  } 

  permissaoUpdate(Tela:string){ 
    let result:boolean=false; 
    let array:any[]=environment.Permissoes; 
    if (Array.isArray(array) && array.length){ 
      for(let x=0;x<array.length;x++){   
        if (array[x].tab_nome === Tela && array[x].pte_alterar === '1'){
          result = true;   
        }  
      }  
    }else{  
      result = true; 
    }  
    return result;   
  }  

  permissaoView(Tela:string){  
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
} //FIM - EXPORTS 
