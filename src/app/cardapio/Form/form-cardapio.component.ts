import {Component, OnInit} from '@angular/core'; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router,ActivatedRoute} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {cardapio} from "../../model/cardapio.model"; 
import {NgForm} from "@angular/forms"; 
import {first} from "rxjs/operators"; 
import {cardapioService} from "../../services/cardapio.service"; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'; 
import { environment } from "../../../environments/environment"; 
import {cardapioHelpComponent} from '../../shared/loadhelp-cardapio.component'; 
//importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {vendedoresService} from "../../services/vendedores.service"; 
import {vendedores} from "../../model/vendedores.model"; 
//FIM - importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import {DialogService} from '../../shared/dialog.service'; 
import {Location} from '@angular/common'; 
import {NotificationService} from '../../shared/notification.service'; 
import { UploadService } from 'src/app/services/upload.service';
import { categoriasService } from 'src/app/services/categorias.service';
import { categorias } from 'src/app/model/categorias.model';
@Component({ 
  selector: 'app-form-cardapio', 
  templateUrl: './form-cardapio.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
export class FormcardapioComponent implements OnInit { bounce:any; 
  Device = environment.Device; 
  TipoGrupo = environment.TipoGrupo;
  files: Set<File>; 
  fileNames:any[]=[]; 
  //DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  arrvendedores:Observable<vendedores[]>; 
  arrcategorias:Observable<categorias[]>; 

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
   , public apiService: cardapioService 
   , private dialog: MatDialog 
   , private location:Location 
   , private dialogService: DialogService 
   , private notification:NotificationService 
, private uploadService: UploadService 
   , private apivendedores:vendedoresService 
   , private apicategorias:categoriasService 
  ) { } 
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS
  ngOnInit() {  
    this.TipoGrupo = environment.TipoGrupo;
    //************************************************ 
    //INICIO - PERMISSOES 
    this.apiService.formDisabled = { 
        car_ativo:false,   
        car_codigo:false,   
        car_descricao:false,   
        car_estoque:false,   
        car_imagen:false,   
        car_nome:false,   
        car_valor:false,   
        cat_codigo:false,   
        ven_codigo:false,   
    }; 
    this.apiService.formVisible = { 
        car_ativo:true,   
        car_codigo:true,   
        car_descricao:true,   
        car_estoque:true,   
        car_imagen:true,   
        car_nome:true,   
        car_valor:true,   
        cat_codigo:true,   
        ven_codigo:true,   
    }; 
    this.permissaoFieldDisabled('cardapio'); 
    this.permissaoFieldVisible('cardapio'); 
    //FIM - PERMISSOES 
    //************************************************ 
    //VERIFICA SE A ROTA TEM parametro E EDICAO (FAZ LOAD DOS DADOS DO REGISTRO SELECIONADO E ITENS), SENAO E INSERCAO 
    let id = this.router.snapshot.paramMap.get('id'); 
    if (id){ 
      this.apiService.getcardapioId(id).subscribe( data => { 
        data[0].status_reg = 'U'; 
        if (data[0].car_imagen){  
          data[0].car_imagen = data[0].car_imagen;
        }else{   
          data[0].car_imagen = this.baseUrl+'/alternative.png'; 
        } 
        this.apiService.formData = data[0]; 
        this.apiService.formData.status_reg = 'U'; 
        this.apiService.formData.car_nome = this.convertHtml(data[0].car_nome);
        this.apiService.formData.car_descricao = this.convertHtml(data[0].car_descricao);
      });  
    }else{  
      this.resetForm(); 
    }  
    //LOAD DOS ARRAY CHAVE ESTRANGEIRA 
    this.arrvendedores = this.apivendedores.getvendedores().pipe( 
      map(dados => { 
      console.log(dados); 
      return dados; 
    }));  
    this.arrcategorias = this.apicategorias.getcategorias().pipe( 
      map(dados => { 
      console.log(dados); 
      return dados; 
    })); 
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
    this.dialog.open(cardapioHelpComponent, dialogConfig).afterClosed().subscribe(res => { 
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
  resetForm(form?: NgForm) {//NOVO REGISTRO RESET DADOS E COLOCAR VALORES PADROES 
    if (form = null)  
      form.resetForm(); 
    let vNewDate = new Date();//this.ConverteData(strDate); 
    this.apiService.formData = { 
      car_ativo: true, 
      car_codigo: null, 
      car_descricao: null, 
      car_estoque:0,  
      car_imagen: null, 
      car_nome: null, 
      car_valor:0,  
      cat_codigo: null, 
      ven_codigo: null, 
      status_reg:'I',  
      usu_codigo:environment.CodigoUsuario
    };  

  }  
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM
    this.isValid = true; 
    if (this.apiService.formData==null) 
      this.isValid = false; 
    else if (this.apiService.formData.car_ativo == null) 
      this.isValid = false; 
    else if (this.apiService.formData.car_descricao == null) 
      this.isValid = false; 
    else if (this.apiService.formData.car_estoque == null) 
      this.isValid = false; 
    else if (this.apiService.formData.car_nome == null) 
      this.isValid = false; 
    else if (this.apiService.formData.car_valor == null) 
      this.isValid = false; 
    else if (this.apiService.formData.cat_codigo == null) 
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
            case 'car_ativo': {   
              this.apiService.formDisabled.car_ativo = true; 
              break;  
            }    
            case 'car_codigo': {   
              this.apiService.formDisabled.car_codigo = true; 
              break;  
            }    
            case 'car_descricao': {   
              this.apiService.formDisabled.car_descricao = true; 
              break;  
            }    
            case 'car_estoque': {   
              this.apiService.formDisabled.car_estoque = true; 
              break;  
            }    
            case 'car_imagen': {   
              this.apiService.formDisabled.car_imagen = true; 
              break;  
            }    
            case 'car_nome': {   
              this.apiService.formDisabled.car_nome = true; 
              break;  
            }    
            case 'car_valor': {   
              this.apiService.formDisabled.car_valor = true; 
              break;  
            }    
            case 'cat_codigo': {   
              this.apiService.formDisabled.cat_codigo = true; 
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
            case 'car_ativo': {   
              this.apiService.formVisible.car_ativo = false; 
              break;  
            }    
            case 'car_codigo': {   
              this.apiService.formVisible.car_codigo = false; 
              break;  
            }    
            case 'car_descricao': {   
              this.apiService.formVisible.car_descricao = false; 
              break;  
            }    
            case 'car_estoque': {   
              this.apiService.formVisible.car_estoque = false; 
              break;  
            }    
            case 'car_imagen': {   
              this.apiService.formVisible.car_imagen = false; 
              break;  
            }    
            case 'car_nome': {   
              this.apiService.formVisible.car_nome = false; 
              break;  
            }    
            case 'car_valor': {   
              this.apiService.formVisible.car_valor = false; 
              break;  
            }    
            case 'cat_codigo': {   
              this.apiService.formVisible.cat_codigo = false; 
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
      this.apiService.formData.car_imagen = 'https://jsa-angular-engenha.s3-sa-east-1.amazonaws.com/'+this.imagem_nome;

      this.apiService.gravarcardapio(this.apiService.formData.status_reg) 
        .pipe(first()) 
        .subscribe( 
           data => {  
             console.log('ret-update',data);
             if (this.apiService.formData.status_reg == 'U'){ 
               if(data[0].chave > 0) { 
                  console.log('cardapio ATUALIZADO COM EXITO.',data); 
               }else { 
                 console.log('ERRO: AO ATUALIZAR cardapio'); 
               }  
             }else{  
                console.log('ret-insert',data);
                this.resetForm();
              } 
            if (Array.isArray(this.fileNames) && this.fileNames.length){
              const formData = new FormData(); 
              this.files.forEach(file => formData.append('car_imagen', file, file.name)); 
              formData.append('usu_codigo', environment.CodigoUsuario.toString());  
              formData.append('car_codigo', data[0].chave); 
              console.log('chave',data[0].chave); 
              this.uploadfile(formData); 
            } 
              this.myrouter.navigate(['Listarcardapio'], {skipLocationChange: true, fragment: 'top'}); 
           }, 
           error => { 
             console.log('erro:',error); 
        }); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
    }   
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
    this.myrouter.navigate(['Listarcardapio'], {skipLocationChange: true, fragment: 'top'}); 
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
