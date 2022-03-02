 
import {Component, OnInit} from '@angular/core'; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router,ActivatedRoute} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {vendedores} from "../../model/vendedores.model"; 
import {NgForm} from "@angular/forms"; 
import {first} from "rxjs/operators"; 
import {vendedoresService} from "../../services/vendedores.service"; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'; 
import { environment } from "../../../environments/environment"; 
import {vendedoresHelpComponent} from '../../shared/loadhelp-vendedores.component'; 
//importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
//FIM - importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import {DialogService} from '../../shared/dialog.service'; 
import {Location} from '@angular/common'; 
import {NotificationService} from '../../shared/notification.service'; 
import { UploadService } from 'src/app/services/upload.service';
@Component({ 
  selector: 'app-form-vendedores', 
  templateUrl: './form-vendedores.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
export class FormvendedoresComponent implements OnInit { bounce:any; 
  Device = environment.Device; 
  files: Set<File>; 
  fileNames:any[]=[]; 
  selectedFiles: FileList;
  imagem_nome:string;
  //DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  //FIM - DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  isValid: boolean = true; 
  baseUrl = environment.URLBase;  
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: ActivatedRoute  
   , private myrouter: Router 
   , private _translate: TranslateService   
   , public apiService: vendedoresService 
   , private dialog: MatDialog 
   , private location:Location 
   , private dialogService: DialogService 
   , private uploadService: UploadService 
   , private notification:NotificationService 
  ) { } 
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS
  ngOnInit() {  
    //************************************************ 
    //INICIO - PERMISSOES 
    this.apiService.formDisabled = { 
        ven_ativo:false,   
        ven_bairro:false,   
        ven_cep:false,   
        ven_cidade:false,   
        ven_cnpj:false,   
        ven_codigo:false,   
        ven_complemento:false,   
        ven_email:false,   
        ven_endereco:false,   
        ven_fone:false,   
        ven_horario:false,   
        ven_info:false,   
        ven_lat:false,   
        ven_login:false,   
        ven_long:false,   
        ven_nome:false,   
        ven_numero:false,   
        ven_senha:false,   
        ven_uf:false,   
    }; 
    this.apiService.formVisible = { 
        ven_ativo:true,   
        ven_bairro:true,   
        ven_cep:true,   
        ven_cidade:true,   
        ven_cnpj:true,   
        ven_codigo:true,   
        ven_complemento:true,   
        ven_email:true,   
        ven_endereco:true,   
        ven_fone:true,   
        ven_horario:true,   
        ven_info:true,   
        ven_lat:true,   
        ven_login:true,   
        ven_long:true,   
        ven_nome:true,   
        ven_numero:true,   
        ven_senha:true,   
        ven_uf:true,   
    }; 
    this.permissaoFieldDisabled('vendedores'); 
    this.permissaoFieldVisible('vendedores'); 
    //FIM - PERMISSOES 
    //************************************************ 
    //VERIFICA SE A ROTA TEM parametro E EDICAO (FAZ LOAD DOS DADOS DO REGISTRO SELECIONADO E ITENS), SENAO E INSERCAO 
    let id = this.router.snapshot.paramMap.get('id'); 
    if (id){ 
      this.apiService.getvendedoresId(id).subscribe( data => { 
        data[0].status_reg = 'U'; 
        if (data[0].ven_logo){  
          data[0].ven_logo = data[0].ven_logo;
        }else{   
          data[0].ven_logo = this.baseUrl+'/alternative.png'; 
        } 
        this.apiService.formData = data[0]; 
        this.apiService.formData.status_reg = 'U';
        this.apiService.formData.ven_nome = this.convertHtml(data[0].ven_nome);
        this.apiService.formData.ven_endereco = this.convertHtml(data[0].ven_endereco);
        this.apiService.formData.ven_bairro = this.convertHtml(data[0].ven_bairro);
        this.apiService.formData.ven_cidade = this.convertHtml(data[0].ven_cidade);
        this.apiService.formData.ven_complemento = this.convertHtml(data[0].ven_complemento);
      });  
    }else{  
      this.resetForm(); 
    }  
    //LOAD DOS ARRAY CHAVE ESTRANGEIRA 
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

  selectFile(event) {
    ////debugger
    this.selectedFiles = event.target.files;
    }

    upload() {
      //debugger
      const file = this.selectedFiles.item(0);
      this.imagem_nome = 'YUMY'+file.name;
      
      this.uploadService.uploadFile(file);

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
    this.dialog.open(vendedoresHelpComponent, dialogConfig).afterClosed().subscribe(res => { 
    });  
  }  

 

  resetForm(form?: NgForm) {//NOVO REGISTRO RESET DADOS E COLOCAR VALORES PADROES 
    if (form = null)  
      form.resetForm(); 
    let vNewDate = new Date();//this.ConverteData(strDate); 
    this.apiService.formData = { 
      ven_ativo:'S',  
      ven_bairro: null, 
      ven_cep: 'SC', 
      ven_cidade: null, 
      ven_cnpj: null, 
      ven_codigo: null, 
      ven_complemento: null, 
      ven_email: null, 
      ven_endereco: null, 
      ven_fone: null, 
      ven_horario: null, 
      ven_info: null, 
      ven_lat: 0, 
      ven_login: null, 
      ven_long:0,  
      ven_nome: null, 
      ven_numero: null, 
      ven_senha: null, 
      ven_uf: null, 
      ven_logo:null,
      status_reg:'I',  
      usu_codigo:environment.CodigoUsuario
    };  

  }  
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM
    this.isValid = true; 
    if (this.apiService.formData==null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_ativo == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_bairro == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_cep == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_cidade == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_cnpj == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_complemento == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_email == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_endereco == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_fone == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_horario == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_lat == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_login == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_long == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_nome == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_numero == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_senha == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ven_uf == null) 
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
            case 'ven_ativo': {   
              this.apiService.formDisabled.ven_ativo = true; 
              break;  
            }    
            case 'ven_bairro': {   
              this.apiService.formDisabled.ven_bairro = true; 
              break;  
            }    
            case 'ven_cep': {   
              this.apiService.formDisabled.ven_cep = true; 
              break;  
            }    
            case 'ven_cidade': {   
              this.apiService.formDisabled.ven_cidade = true; 
              break;  
            }    
            case 'ven_cnpj': {   
              this.apiService.formDisabled.ven_cnpj = true; 
              break;  
            }    
            case 'ven_codigo': {   
              this.apiService.formDisabled.ven_codigo = true; 
              break;  
            }    
            case 'ven_complemento': {   
              this.apiService.formDisabled.ven_complemento = true; 
              break;  
            }    
            case 'ven_email': {   
              this.apiService.formDisabled.ven_email = true; 
              break;  
            }    
            case 'ven_endereco': {   
              this.apiService.formDisabled.ven_endereco = true; 
              break;  
            }    
            case 'ven_fone': {   
              this.apiService.formDisabled.ven_fone = true; 
              break;  
            }    
            case 'ven_horario': {   
              this.apiService.formDisabled.ven_horario = true; 
              break;  
            }    
            case 'ven_info': {   
              this.apiService.formDisabled.ven_info = true; 
              break;  
            }    
            case 'ven_lat': {   
              this.apiService.formDisabled.ven_lat = true; 
              break;  
            }    
            case 'ven_login': {   
              this.apiService.formDisabled.ven_login = true; 
              break;  
            }    
            case 'ven_long': {   
              this.apiService.formDisabled.ven_long = true; 
              break;  
            }    
            case 'ven_nome': {   
              this.apiService.formDisabled.ven_nome = true; 
              break;  
            }    
            case 'ven_numero': {   
              this.apiService.formDisabled.ven_numero = true; 
              break;  
            }    
            case 'ven_senha': {   
              this.apiService.formDisabled.ven_senha = true; 
              break;  
            }    
            case 'ven_uf': {   
              this.apiService.formDisabled.ven_uf = true; 
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
            case 'ven_ativo': {   
              this.apiService.formVisible.ven_ativo = false; 
              break;  
            }    
            case 'ven_bairro': {   
              this.apiService.formVisible.ven_bairro = false; 
              break;  
            }    
            case 'ven_cep': {   
              this.apiService.formVisible.ven_cep = false; 
              break;  
            }    
            case 'ven_cidade': {   
              this.apiService.formVisible.ven_cidade = false; 
              break;  
            }    
            case 'ven_cnpj': {   
              this.apiService.formVisible.ven_cnpj = false; 
              break;  
            }    
            case 'ven_codigo': {   
              this.apiService.formVisible.ven_codigo = false; 
              break;  
            }    
            case 'ven_complemento': {   
              this.apiService.formVisible.ven_complemento = false; 
              break;  
            }    
            case 'ven_email': {   
              this.apiService.formVisible.ven_email = false; 
              break;  
            }    
            case 'ven_endereco': {   
              this.apiService.formVisible.ven_endereco = false; 
              break;  
            }    
            case 'ven_fone': {   
              this.apiService.formVisible.ven_fone = false; 
              break;  
            }    
            case 'ven_horario': {   
              this.apiService.formVisible.ven_horario = false; 
              break;  
            }    
            case 'ven_info': {   
              this.apiService.formVisible.ven_info = false; 
              break;  
            }    
            case 'ven_lat': {   
              this.apiService.formVisible.ven_lat = false; 
              break;  
            }    
            case 'ven_login': {   
              this.apiService.formVisible.ven_login = false; 
              break;  
            }    
            case 'ven_long': {   
              this.apiService.formVisible.ven_long = false; 
              break;  
            }    
            case 'ven_nome': {   
              this.apiService.formVisible.ven_nome = false; 
              break;  
            }    
            case 'ven_numero': {   
              this.apiService.formVisible.ven_numero = false; 
              break;  
            }    
            case 'ven_senha': {   
              this.apiService.formVisible.ven_senha = false; 
              break;  
            }    
            case 'ven_uf': {   
              this.apiService.formVisible.ven_uf = false; 
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
 setImagem(){
  ////debuger
  if(this.apiService.formData.status_reg == 'I'){
    this.apiService.formData.ven_logo = 'https://jsa-angular-engenha.s3-sa-east-1.amazonaws.com/'+this.imagem_nome;
  }else{
    let imagem = this.imagem_nome;
    let strimagem = imagem.substr(0,24)
    if (strimagem.substr(0,24)!='https://yumiimarketplace'){
      this.apiService.formData.ven_logo = 'https://jsa-angular-engenha.s3-sa-east-1.amazonaws.com/'+this.imagem_nome;
    }; 
  }
 }
  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM para SERVICE CHAMAR A FUNCAO para GRAVAR NO BACKEND
    this.setImagem();
    if (this.validateForm()) { 
      
      this.apiService.gravarvendedores(this.apiService.formData.status_reg) 
        .pipe(first()) 
        .subscribe( 
           data => {  
             console.log('ret-update',data);
             if (this.apiService.formData.status_reg == 'U'){ 
               if(data[0].chave > 0) { 
                  console.log('vendedores ATUALIZADO COM EXITO.',data); 
               }else { 
                 console.log('ERRO: AO ATUALIZAR vendedores'); 
               }  
             }else{  
                console.log('ret-insert',data);
                this.resetForm();
              } 
              this.myrouter.navigate(['Listarvendedores'], {skipLocationChange: true, fragment: 'top'}); 
           }, 
           error => { 
             console.log('erro:',error); 
        }); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
    }   
  }  
  
  onCancelar() { 
    this.myrouter.navigate(['Listarvendedores'], {skipLocationChange: true, fragment: 'top'}); 
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
