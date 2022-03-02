 
import {Component, OnInit} from '@angular/core'; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router,ActivatedRoute} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {categorias} from "../../model/categorias.model"; 
import {NgForm} from "@angular/forms"; 
import {first} from "rxjs/operators"; 
import {categoriasService} from "../../services/categorias.service"; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'; 
import { environment } from "../../../environments/environment"; 
import {categoriasHelpComponent} from '../../shared/loadhelp-categorias.component'; 
//importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
//FIM - importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import {DialogService} from '../../shared/dialog.service'; 
import {Location} from '@angular/common'; 
import {NotificationService} from '../../shared/notification.service'; 
import { UploadService } from 'src/app/services/upload.service';
@Component({ 
  selector: 'app-form-categorias', 
  templateUrl: './form-categorias.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
export class FormcategoriasComponent implements OnInit { bounce:any; 
  Device = environment.Device; 
  files: Set<File>; 
  fileNames:any[]=[]; 
  //DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  //FIM - DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  isValid: boolean = true; 
  baseUrl = environment.URLBase; 
  selectedFiles: FileList;
  imagem_nome:string; 
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: ActivatedRoute  
   , private myrouter: Router 
   , private _translate: TranslateService   
   , public apiService: categoriasService 
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
        cat_codigo:false,   
        cat_imagem:false,   
        cat_nome:false,   
    }; 
    this.apiService.formVisible = { 
        cat_codigo:true,   
        cat_imagem:true,   
        cat_nome:true,   
    }; 
    this.permissaoFieldDisabled('categorias'); 
    this.permissaoFieldVisible('categorias'); 
    //FIM - PERMISSOES 
    //************************************************ 
    //VERIFICA SE A ROTA TEM parametro E EDICAO (FAZ LOAD DOS DADOS DO REGISTRO SELECIONADO E ITENS), SENAO E INSERCAO 
    let id = this.router.snapshot.paramMap.get('id'); 
    if (id){ 
      this.apiService.getcategoriasId(id).subscribe( data => { 
        data[0].status_reg = 'U'; 
        if (data[0].cat_imagem){  
          data[0].cat_imagem = data[0].cat_imagem;
        }else{   
          data[0].cat_imagem = this.baseUrl+'/alternative.png'; 
        } 
        this.apiService.formData = data[0]; 
        this.apiService.formData.status_reg = 'U'; 
      });  
    }else{  
      this.resetForm(); 
    }  
    //LOAD DOS ARRAY CHAVE ESTRANGEIRA 
  }  

  goHelp(tabela:string){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = true; 
    dialogConfig.width = "75%"; 
    dialogConfig.data = { tabela }; 
    this.dialog.open(categoriasHelpComponent, dialogConfig).afterClosed().subscribe(res => { 
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
      cat_codigo: null, 
      cat_imagem: null, 
      cat_nome: null, 
      status_reg:'I',  
      cat_ativo:true,
      usu_codigo:environment.CodigoUsuario
    };  

  }  
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM
    this.isValid = true; 
    if (this.apiService.formData==null) 
      this.isValid = false; 
    else if (this.apiService.formData.cat_imagem == null) 
      this.isValid = false; 
    else if (this.apiService.formData.cat_nome == null) 
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
            case 'cat_codigo': {   
              this.apiService.formDisabled.cat_codigo = true; 
              break;  
            }    
            case 'cat_imagem': {   
              this.apiService.formDisabled.cat_imagem = true; 
              break;  
            }    
            case 'cat_nome': {   
              this.apiService.formDisabled.cat_nome = true; 
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
            case 'cat_codigo': {   
              this.apiService.formVisible.cat_codigo = false; 
              break;  
            }    
            case 'cat_imagem': {   
              this.apiService.formVisible.cat_imagem = false; 
              break;  
            }    
            case 'cat_nome': {   
              this.apiService.formVisible.cat_nome = false; 
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
      this.apiService.formData.cat_imagem = 'https://jsa-angular-engenha.s3-sa-east-1.amazonaws.com/'+this.imagem_nome;
      this.apiService.gravarcategorias(this.apiService.formData.status_reg) 
        .pipe(first()) 
        .subscribe( 
           data => {  
             console.log('ret-update',data);
             if (this.apiService.formData.status_reg == 'U'){ 
               if(data[0].chave > 0) { 
                  console.log('categorias ATUALIZADO COM EXITO.',data); 
               }else { 
                 console.log('ERRO: AO ATUALIZAR categorias'); 
               }  
             }else{  
                console.log('ret-insert',data);
                this.resetForm();
              } 
            if (Array.isArray(this.fileNames) && this.fileNames.length){
              const formData = new FormData(); 
              this.files.forEach(file => formData.append('cat_imagem', file, file.name)); 
              formData.append('usu_codigo', environment.CodigoUsuario.toString());  
              formData.append('cat_codigo', data[0].chave); 
              console.log('chave',data[0].chave); 
              this.uploadfile(formData); 
            } 
              this.myrouter.navigate(['Listarcategorias'], {skipLocationChange: true, fragment: 'top'}); 
           }, 
           error => { 
             console.log('erro:',error); 
        }); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
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
  
  uploadfile(formData){
    this.apiService.uploadimage(formData)  
    .pipe(first()) 
        .subscribe(  
          data => {  
            console.log('ret upload',data); 
          }  
      ); 
  }  
  
  onCancelar() { 
    this.myrouter.navigate(['Listarcategorias'], {skipLocationChange: true, fragment: 'top'}); 
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
