 
import {Component, OnInit} from '@angular/core'; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router,ActivatedRoute} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {sabores} from "../../model/sabores.model"; 
import {NgForm} from "@angular/forms"; 
import {first} from "rxjs/operators"; 
import {saboresService} from "../../services/sabores.service"; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'; 
import { environment } from "../../../environments/environment"; 
import {saboresHelpComponent} from '../../shared/loadhelp-sabores.component'; 
//importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {cardapioService} from "../../services/cardapio.service"; 
import {cardapio} from "../../model/cardapio.model"; 
//FIM - importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import {DialogService} from '../../shared/dialog.service'; 
import {Location} from '@angular/common'; 
import {NotificationService} from '../../shared/notification.service'; 
@Component({ 
  selector: 'app-form-sabores', 
  templateUrl: './form-sabores.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
export class FormsaboresComponent implements OnInit { bounce:any; 
  Device = environment.Device; 
  files: Set<File>; 
  fileNames:any[]=[]; 
  //DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  arrcardapio:Observable<cardapio[]>; 
  //FIM - DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  isValid: boolean = true; 
  baseUrl = environment.URLBase;  
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: ActivatedRoute  
   , private myrouter: Router 
   , private _translate: TranslateService   
   , public apiService: saboresService 
   , private dialog: MatDialog 
   , private location:Location 
   , private dialogService: DialogService 
   , private notification:NotificationService 
   , private apicardapio:cardapioService 
  ) { } 
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS
  ngOnInit() {  
    //************************************************ 
    //INICIO - PERMISSOES 
    this.apiService.formDisabled = { 
        car_codigo:false,   
        sab_codigo:false,   
        sab_descricao:false,   
        sab_nome:false,   
        sab_valor:false,   
    }; 
    this.apiService.formVisible = { 
        car_codigo:true,   
        sab_codigo:true,   
        sab_descricao:true,   
        sab_nome:true,   
        sab_valor:true,   
    }; 
    this.permissaoFieldDisabled('sabores'); 
    this.permissaoFieldVisible('sabores'); 
    //FIM - PERMISSOES 
    //************************************************ 
    //VERIFICA SE A ROTA TEM parametro E EDICAO (FAZ LOAD DOS DADOS DO REGISTRO SELECIONADO E ITENS), SENAO E INSERCAO 
    let id = this.router.snapshot.paramMap.get('id'); 
    if (id){ 
      this.apiService.getsaboresId(id).subscribe( data => { 
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
  }  

  goHelp(tabela:string){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = true; 
    dialogConfig.width = "75%"; 
    dialogConfig.data = { tabela }; 
    this.dialog.open(saboresHelpComponent, dialogConfig).afterClosed().subscribe(res => { 
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
      car_codigo: null, 
      sab_codigo: null, 
      sab_descricao: null, 
      sab_nome: null, 
      sab_valor:0,  
      status_reg:'I',  
      usu_codigo:environment.CodigoUsuario
    };  

  }  
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM
    this.isValid = true; 
    if (this.apiService.formData==null) 
      this.isValid = false; 
    else if (this.apiService.formData.car_codigo == null) 
      this.isValid = false; 
    else if (this.apiService.formData.sab_descricao == null) 
      this.isValid = false; 
    else if (this.apiService.formData.sab_nome == null) 
      this.isValid = false; 
    else if (this.apiService.formData.sab_valor == null) 
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
            case 'car_codigo': {   
              this.apiService.formDisabled.car_codigo = true; 
              break;  
            }    
            case 'sab_codigo': {   
              this.apiService.formDisabled.sab_codigo = true; 
              break;  
            }    
            case 'sab_descricao': {   
              this.apiService.formDisabled.sab_descricao = true; 
              break;  
            }    
            case 'sab_nome': {   
              this.apiService.formDisabled.sab_nome = true; 
              break;  
            }    
            case 'sab_valor': {   
              this.apiService.formDisabled.sab_valor = true; 
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
            case 'car_codigo': {   
              this.apiService.formVisible.car_codigo = false; 
              break;  
            }    
            case 'sab_codigo': {   
              this.apiService.formVisible.sab_codigo = false; 
              break;  
            }    
            case 'sab_descricao': {   
              this.apiService.formVisible.sab_descricao = false; 
              break;  
            }    
            case 'sab_nome': {   
              this.apiService.formVisible.sab_nome = false; 
              break;  
            }    
            case 'sab_valor': {   
              this.apiService.formVisible.sab_valor = false; 
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
      this.apiService.gravarsabores(this.apiService.formData.status_reg) 
        .pipe(first()) 
        .subscribe( 
           data => {  
             console.log('ret-update',data);
             if (this.apiService.formData.status_reg == 'U'){ 
               if(data[0].chave > 0) { 
                  console.log('sabores ATUALIZADO COM EXITO.',data); 
               }else { 
                 console.log('ERRO: AO ATUALIZAR sabores'); 
               }  
             }else{  
                console.log('ret-insert',data);
                this.resetForm();
              } 
              this.myrouter.navigate(['Listarsabores'], {skipLocationChange: true, fragment: 'top'}); 
           }, 
           error => { 
             console.log('erro:',error); 
        }); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
    }   
  }  
  
  onCancelar() { 
    this.myrouter.navigate(['Listarsabores'], {skipLocationChange: true, fragment: 'top'}); 
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
