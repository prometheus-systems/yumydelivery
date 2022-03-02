 
import {Component, OnInit} from '@angular/core'; 
import {Router,ActivatedRoute} from "@angular/router"; 
import {grupo_usuarios} from "../../model/grupo_usuarios.model"; 
import {NgForm} from "@angular/forms"; 
import {first} from "rxjs/operators"; 
import {grupo_usuariosService} from "../../services/grupo_usuarios.service"; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'; 
//IMPORTAR OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
//FIM - IMPORTAR OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import {DialogService} from '../../shared/dialog.service'; 
import {Location} from '@angular/common'; 
import {NotificationService} from '../../shared/notification.service'; 
@Component({ 
  selector: 'app-form-grupo_usuarios', 
  templateUrl: './form-grupo_usuarios.component.html', 
}) 
export class Formgrupo_usuariosComponent implements OnInit { 
  //DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  //FIM - DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  isValid: boolean = true; 
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: ActivatedRoute  
   , private myrouter: Router 
   , public apiService: grupo_usuariosService 
   , private dialog: MatDialog 
   , private location:Location 
   , private dialogService: DialogService 
   , private notification:NotificationService 
  ) { } 
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS
  ngOnInit() {  
    //VERIFICA SE A ROTA TEM PARAMETRO E EDICAO (FAZ LOAD DOS DADOS DO REGISTRO SELECIONADO E ITENS), SENAO E INSERCAO 
    let id = this.router.snapshot.paramMap.get('id'); 
    if (id){ 
      this.apiService.getgrupo_usuariosId(id).subscribe( data => { 
        data[0].status_reg = 'U'; 
        this.apiService.formData = data[0]; 
        this.apiService.formData.status_reg = 'U'; 
      });  
    }else{  
      this.resetForm(); 
    }  
    //LOAD DOS ARRAY CHAVE ESTRANGEIRA 
  }  
  resetForm(form?: NgForm) {//NOVO REGISTRO RESET DADOS E COLOCAR VALORES PADROES 
    if (form = null)  
      form.resetForm(); 
    this.apiService.formData = { 
      gus_codigo: null, 
      gus_descricao: null, 
      gus_tipo:'O',
      status_reg:'I'  
    };  
  }  
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM
    this.isValid = true; 
    if (this.apiService.formData==null) 
      this.isValid = false; 
    else if (this.apiService.formData.gus_descricao == null) 
      this.isValid = false; 
    return this.isValid; 
  } 
  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM PARA SERVICE CHAMAR A FUNCAO PARA GRAVAR NO BACKEND
    if (this.validateForm()) { 
      this.apiService.gravargrupo_usuarios(this.apiService.formData.status_reg) 
        .pipe(first()) 
        .subscribe( 
           data => {  
             console.log('ret-update',data);
             if (this.apiService.formData.status_reg == 'U'){ 
               if(data[0].chave > 0) { 
                  console.log('GRUPO_USUARIOS ATUALIZADO COM EXITO.',data); 
               }else { 
                 console.log('ERRO: AO ATUALIZAR GRUPO_USUARIOS'); 
               }  
             }else{  
                console.log('ret-insert',data);
                this.resetForm();
              } 
              this.myrouter.navigate(['Listargrupo_usuarios'], {skipLocationChange: true, fragment: 'top'}); 
           }, 
           error => { 
             console.log('erro:',error); 
        }); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
    }   
  }  
  onCancelar() { 
    this.myrouter.navigate(['Listargrupo_usuarios'], {skipLocationChange: true, fragment: 'top'}); 
  } 
} //FIM - EXPORTS 
