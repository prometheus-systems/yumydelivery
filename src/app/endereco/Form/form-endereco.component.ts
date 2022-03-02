 
import {Component, OnInit} from '@angular/core'; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router,ActivatedRoute} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {endereco} from "../../model/endereco.model"; 
import {NgForm} from "@angular/forms"; 
import {first} from "rxjs/operators"; 
import {enderecoService} from "../../services/endereco.service"; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'; 
import { environment } from "../../../environments/environment"; 
import {enderecoHelpComponent} from '../../shared/loadhelp-endereco.component'; 
//importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
//FIM - importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import {DialogService} from '../../shared/dialog.service'; 
import {Location} from '@angular/common'; 
import {NotificationService} from '../../shared/notification.service'; 
@Component({ 
  selector: 'app-form-endereco', 
  templateUrl: './form-endereco.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
export class FormenderecoComponent implements OnInit { bounce:any; 
  Device = environment.Device; 
  files: Set<File>; 
  fileNames:any[]=[]; 
  //DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  //FIM - DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  isValid: boolean = true; 
  baseUrl = environment.URLBase;  
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: ActivatedRoute  
   , private myrouter: Router 
   , private _translate: TranslateService   
   , public apiService: enderecoService 
   , private dialog: MatDialog 
   , private location:Location 
   , private dialogService: DialogService 
   , private notification:NotificationService 
  ) { } 
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS
  ngOnInit() {  
    //************************************************ 
    //INICIO - PERMISSOES 
    this.apiService.formDisabled = { 
        end_bairro:false,   
        end_cep:false,   
        end_cidade:false,   
        end_codigo:false,   
        end_complemento:false,   
        end_endereco:false,   
        end_lat:false,   
        end_long:false,   
        end_numero:false,   
        end_referencia:false,   
        end_uf:false,   
    }; 
    this.apiService.formVisible = { 
        end_bairro:true,   
        end_cep:true,   
        end_cidade:true,   
        end_codigo:true,   
        end_complemento:true,   
        end_endereco:true,   
        end_lat:true,   
        end_long:true,   
        end_numero:true,   
        end_referencia:true,   
        end_uf:true,   
    }; 
    this.permissaoFieldDisabled('endereco'); 
    this.permissaoFieldVisible('endereco'); 
    //FIM - PERMISSOES 
    //************************************************ 
    //VERIFICA SE A ROTA TEM parametro E EDICAO (FAZ LOAD DOS DADOS DO REGISTRO SELECIONADO E ITENS), SENAO E INSERCAO 
    let id = this.router.snapshot.paramMap.get('id'); 
    if (id){ 
      this.apiService.getenderecoId(id).subscribe( data => { 
        data[0].status_reg = 'U'; 
        this.apiService.formData = data[0]; 
        this.apiService.formData.status_reg = 'U'; 
        this.apiService.formData.end_endereco = this.convertHtml(data[0].end_endereco);
        this.apiService.formData.end_bairro = this.convertHtml(data[0].end_bairro);
        this.apiService.formData.end_cidade = this.convertHtml(data[0].end_cidade);
        this.apiService.formData.end_complemento = this.convertHtml(data[0].end_complemento);
        this.apiService.formData.end_referencia = this.convertHtml(data[0].end_referencia);
      });  
    }else{  
      this.resetForm(); 
    }  
    //LOAD DOS ARRAY CHAVE ESTRANGEIRA 
  }  

  convertHtml(value){
    let doc = new DOMParser().parseFromString(value, 'text/html');        
    return doc.documentElement.textContent;
  }

  goHelp(tabela:string){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = true; 
    dialogConfig.width = "75%"; 
    dialogConfig.data = { tabela }; 
    this.dialog.open(enderecoHelpComponent, dialogConfig).afterClosed().subscribe(res => { 
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
      end_bairro: null, 
      end_cep: null, 
      end_cidade: null, 
      end_codigo: null, 
      end_complemento: null, 
      end_endereco: null, 
      end_lat: 0, 
      end_long: 0, 
      end_numero: null, 
      end_referencia: null, 
      end_uf: 'SC', 
      status_reg:'I',  
      usu_codigo:environment.CodigoUsuario
    };  

  }  
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM
    this.isValid = true; 
    if (this.apiService.formData==null) 
      this.isValid = false; 
    else if (this.apiService.formData.end_bairro == null) 
      this.isValid = false; 
    else if (this.apiService.formData.end_cep == null) 
      this.isValid = false; 
    else if (this.apiService.formData.end_cidade == null) 
      this.isValid = false; 
    else if (this.apiService.formData.end_endereco == null) 
      this.isValid = false; 
    else if (this.apiService.formData.end_lat == null) 
      this.isValid = false; 
    else if (this.apiService.formData.end_long == null) 
      this.isValid = false; 
    else if (this.apiService.formData.end_numero == null) 
      this.isValid = false; 
    else if (this.apiService.formData.end_referencia == null) 
      this.isValid = false; 
    else if (this.apiService.formData.end_uf == null) 
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
            case 'end_bairro': {   
              this.apiService.formDisabled.end_bairro = true; 
              break;  
            }    
            case 'end_cep': {   
              this.apiService.formDisabled.end_cep = true; 
              break;  
            }    
            case 'end_cidade': {   
              this.apiService.formDisabled.end_cidade = true; 
              break;  
            }    
            case 'end_codigo': {   
              this.apiService.formDisabled.end_codigo = true; 
              break;  
            }    
            case 'end_complemento': {   
              this.apiService.formDisabled.end_complemento = true; 
              break;  
            }    
            case 'end_endereco': {   
              this.apiService.formDisabled.end_endereco = true; 
              break;  
            }    
            case 'end_lat': {   
              this.apiService.formDisabled.end_lat = true; 
              break;  
            }    
            case 'end_long': {   
              this.apiService.formDisabled.end_long = true; 
              break;  
            }    
            case 'end_numero': {   
              this.apiService.formDisabled.end_numero = true; 
              break;  
            }    
            case 'end_referencia': {   
              this.apiService.formDisabled.end_referencia = true; 
              break;  
            }    
            case 'end_uf': {   
              this.apiService.formDisabled.end_uf = true; 
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
            case 'end_bairro': {   
              this.apiService.formVisible.end_bairro = false; 
              break;  
            }    
            case 'end_cep': {   
              this.apiService.formVisible.end_cep = false; 
              break;  
            }    
            case 'end_cidade': {   
              this.apiService.formVisible.end_cidade = false; 
              break;  
            }    
            case 'end_codigo': {   
              this.apiService.formVisible.end_codigo = false; 
              break;  
            }    
            case 'end_complemento': {   
              this.apiService.formVisible.end_complemento = false; 
              break;  
            }    
            case 'end_endereco': {   
              this.apiService.formVisible.end_endereco = false; 
              break;  
            }    
            case 'end_lat': {   
              this.apiService.formVisible.end_lat = false; 
              break;  
            }    
            case 'end_long': {   
              this.apiService.formVisible.end_long = false; 
              break;  
            }    
            case 'end_numero': {   
              this.apiService.formVisible.end_numero = false; 
              break;  
            }    
            case 'end_referencia': {   
              this.apiService.formVisible.end_referencia = false; 
              break;  
            }    
            case 'end_uf': {   
              this.apiService.formVisible.end_uf = false; 
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
      this.apiService.gravarendereco(this.apiService.formData.status_reg) 
        .pipe(first()) 
        .subscribe( 
           data => {  
             console.log('ret-update',data);
             if (this.apiService.formData.status_reg == 'U'){ 
               if(data[0].chave > 0) { 
                  console.log('endereco ATUALIZADO COM EXITO.',data); 
               }else { 
                 console.log('ERRO: AO ATUALIZAR endereco'); 
               }  
             }else{  
                console.log('ret-insert',data);
                this.resetForm();
              } 
              this.myrouter.navigate(['Listarendereco'], {skipLocationChange: true, fragment: 'top'}); 
           }, 
           error => { 
             console.log('erro:',error); 
        }); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
    }   
  }  
  
  onCancelar() { 
    this.myrouter.navigate(['Listarendereco'], {skipLocationChange: true, fragment: 'top'}); 
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
