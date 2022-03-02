 
import {Component, OnInit} from '@angular/core'; 
import {Router,ActivatedRoute} from "@angular/router"; 
import {usuarios} from "../../model/usuarios.model"; 
import {NgForm} from "@angular/forms"; 
import {first} from "rxjs/operators"; 
import {usuariosService} from "../../services/usuarios.service"; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'; 
//IMPORTAR OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {grupo_usuariosService} from "../../services/grupo_usuarios.service"; 
import {grupo_usuarios} from "../../model/grupo_usuarios.model"; 
//FIM - IMPORTAR OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import {DialogService} from '../../shared/dialog.service'; 
import {Location} from '@angular/common'; 
import {NotificationService} from '../../shared/notification.service'; 
import { environment } from 'src/environments/environment';
import { enderecoService } from 'src/app/services/endereco.service';
import { pedidosService } from 'src/app/services/pedidos.service';
import { endereco } from 'src/app/model/endereco.model';
import { UploadService } from 'src/app/services/upload.service';
@Component({ 
  selector: 'app-form-usuarios', 
  templateUrl: './form-usuarios.component.html', 
}) 
export class FormusuariosComponent implements OnInit { 
  //DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  arrgrupo_usuarios:Observable<grupo_usuarios[]>;
  arrenderecos:Observable<endereco[]>;
  TipoGrupo = environment.TipoGrupo;
  //FIM - DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  isValid: boolean = true; 
  Valido:boolean=true;
  vRetorno:any;
  loginErro:boolean = false;
  emailErro:boolean = false;
  Device:string;
  files: Set<File>; 
  fileNames:any[]=[]; 
  selectedFiles: FileList;
  imagem_nome:string='';
  baseUrl = environment.URLBase;
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: ActivatedRoute  
   , private myrouter: Router 
   , public apiService: usuariosService 
   , private dialog: MatDialog 
   , private location:Location 
   , private dialogService: DialogService 
   , private notification:NotificationService 
   , private apigrupo_usuarios:grupo_usuariosService 
   , private apienderecos:enderecoService
   , private apipedidos:pedidosService
   , private uploadService: UploadService 
  ) { } 
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS
  ngOnInit() {
    //debugger
    this.Device = environment.Device;
    
    //this.apiService.Formato = environment.Formato;
    //VERIFICA SE A ROTA TEM PARAMETRO E EDICAO (FAZ LOAD DOS DADOS DO REGISTRO SELECIONADO E ITENS), SENAO E INSERCAO 
    this.TipoGrupo = environment.TipoGrupo;
    let id = this.router.snapshot.paramMap.get('id'); 
    if (id){ 
      this.apiService.getusuariosId(id).subscribe( data => { 
        data[0].status_reg = 'U'; 
        if (data[0].usu_foto){  
          data[0].usu_foto = data[0].usu_foto;
        }else{   
          data[0].usu_foto = this.baseUrl+'/alternative.png'; 
        } 
        this.apiService.formData = data[0]; 
        this.apiService.formData.status_reg = 'U'; 
        this.apiService.formData.usu_nome = this.convertHtml(data[0].usu_nome);
      });  
    }else{  
      this.resetForm(); 
    }  
    
    //LOAD DOS ARRAY CHAVE ESTRANGEIRA 
    this.arrgrupo_usuarios = this.apigrupo_usuarios.getgrupo_usuarios().pipe( 
      map(dados => { 
      console.log(dados); 
      return dados; 
    }));  

    this.arrenderecos = this.apienderecos.getendereco().pipe( 
      map(dados => { 
      console.log(dados); 
      return dados; 
    }));
    console.log('formato',this.apiService.Formato);
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
    this.apiService.formData = { 
      gus_codigo: 22, 
      usu_codigo: null, 
      usu_email: null, 
      usu_login: null, 
      usu_nome: null, 
      usu_senha: null, 
      usu_tipo:'C',
      usu_fone:null,
      usu_pontos:0,
      end_codigo:null,
      usu_foto:null,
      status_reg:'I'  
    };  
  }  
  convertHtml(value){
    let doc = new DOMParser().parseFromString(value, 'text/html');        
    return doc.documentElement.textContent;
  }
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM
    this.isValid = true; 
    if (this.apiService.formData==null) 
      this.isValid = false; 
    else if (this.apiService.formData.gus_codigo == null) 
      this.isValid = false; 
    else if (this.apiService.formData.usu_email == null) 
      this.isValid = false; 
    else if (this.apiService.formData.usu_login == null) 
      this.isValid = false; 
    else if (this.apiService.formData.usu_nome == null) 
      this.isValid = false; 
    else if (this.apiService.formData.usu_senha == null) 
      this.isValid = false; 
    return this.isValid; 
  } 

  validaEmail(email:string){
    //debugger
    this.apiService.verificaEmail(email)
    .subscribe( data => {  
      this.vRetorno = data[0] as any;

      if(this.vRetorno.retorno=='ERRO') {
        this.emailErro = true;
        this.Valido=false;
      }
      else if (this.vRetorno.retorno=='OK'){
        this.emailErro = false;
        this.Valido=true;
      }  
      console.log('VU',data); 
    });
  }

  validaUsuario(usuario:string){
    this.apiService.verificaUsuario(usuario)
    .subscribe( data => {  
      this.vRetorno = data[0] as any;

      if(this.vRetorno.retorno=='ERRO') {
        this.loginErro = true;
        this.Valido=false;
      }
      else if (this.vRetorno.retorno=='OK'){
        this.loginErro = false;
        this.Valido=true;
      }  
      console.log('VU',data); 
    });
  }
  onProxProjetos(){

  }

  setImagem(){
   ////debuger
   if(this.apiService.formData.status_reg == 'I'){
     this.apiService.formData.usu_foto = 'https://jsa-angular-engenha.s3-sa-east-1.amazonaws.com/'+this.imagem_nome;
   }else{
     let imagem = this.imagem_nome;
     if (imagem!=''){
      let strimagem = imagem.substr(0,24)
      if (strimagem.substr(0,24)!='https://yumiimarketplace'){
        this.apiService.formData.usu_foto = 'https://jsa-angular-engenha.s3-sa-east-1.amazonaws.com/'+this.imagem_nome;
      }; 
    }
   }
  }

  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM PARA SERVICE CHAMAR A FUNCAO PARA GRAVAR NO BACKEND
    debugger
    this.setImagem();    
    if (this.validateForm()) {
      if(this.apiService.formData.status_reg == 'I'){
        this.apiService.formData.usu_foto = 'https://jsa-angular-engenha.s3-sa-east-1.amazonaws.com/'+this.imagem_nome;
      }
      
      this.apiService.gravarusuarios(this.apiService.formData.status_reg) 
        .pipe(first()) 
        .subscribe( 
           data => {  
             debugger
             console.log('ret-update',data);
             environment.CodigoUsuario = data[0].chave;
             if (this.apiService.formData.status_reg == 'U'){ 
               if(data[0].chave > 0) { 
                  console.log('USUARIOS ATUALIZADO COM EXITO.',data); 
               }else { 
                 console.log('ERRO: AO ATUALIZAR USUARIOS'); 
               }  
             }else{  
                console.log('ret-insert',data);
                this.resetForm();
              } 
              if (this.apiService.Formato == 'T'){
                this.myrouter.navigate(['Listarusuarios'], {skipLocationChange: true, fragment: 'top'}); 
              }
              else
              if (this.apiService.Formato == 'C'){
                environment.TipoGrupo = 'C';
                this.apipedidos.tela = 0;
                this.myrouter.navigate(['Formpedidos'], {skipLocationChange: true, fragment: 'top'}); 
              }else{
                environment.TipoGrupo = 'C';
                this.apipedidos.tela = 0;
                this.myrouter.navigate(['Formpedidos'], {skipLocationChange: true, fragment: 'top'}); 
              }
              
           }, 
           error => { 
             console.log('erro:',error); 
        }); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
    }   
  }  
  onCancelar() { 
    
    if (this.apiService.Formato == 'T'){
      this.myrouter.navigate(['Listarusuarios'], {skipLocationChange: true, fragment: 'top'}); 
    }
    else
    if (this.apiService.Formato == 'C'){
      this.apipedidos.tela = 0;
      if (this.apiService.origem=='L'){
        this.myrouter.navigate(['login'], {skipLocationChange: true, fragment: 'top'}); 
      }else{
        this.myrouter.navigate(['Formpedidos'], {skipLocationChange: true, fragment: 'top'}); 
      }
      
    }else{
      this.apipedidos.tela = 0;
      this.myrouter.navigate(['Formpedidos'], {skipLocationChange: true, fragment: 'top'}); 
    }
  } 
} //FIM - EXPORTS 
