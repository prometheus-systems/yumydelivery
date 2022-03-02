import {Component, OnInit, Inject} from "@angular/core"; 
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"; 
import {NgForm } from "@angular/forms"; 
import {permissoes_tabelasService} from "../services/permissoes_tabelas.service"; 
import {permissoes_campos} from "./../model/permissoes_campos.model"; 
import {NotificationService } from "../shared/notification.service"; 
//IMPORTAR COMPONENTES DE TABELA ESTRANGEIRAS 
import {camposService} from "./../services/campos.service"; 
import {grupo_usuariosService} from "./../services/grupo_usuarios.service"; 
import {tabelasService} from "./../services/tabelas.service"; 
//FIM - IMPORTAR COMPONENTES DE TABELA ESTRANGEIRAS 
@Component({ 
  selector: 'app-permissoes_campos', 
  templateUrl: './permissoes_campos.component.html', 
}) 
 
export class permissoes_camposComponent implements OnInit { 
  isValid: boolean = true; 
  formData: permissoes_campos; 
  
constructor(  //INICIA O CONSTRUTOR E VARIAVEIS
  @Inject(MAT_DIALOG_DATA) 
    public data   
   ,public dialogRef: MatDialogRef<permissoes_camposComponent>  
   ,private notification:NotificationService  
   ,private MestreSevice: permissoes_tabelasService) { } 
  
  ngOnInit() {  
    //POPULA ARRAYS DE DADOS ESTRANGEIROS
    ////debugger
    //this.apicampos.getItenscampos().then(res => this.arrcampos = res as campos[]); 
    //this.apigrupo_usuarios.getItensgrupo_usuarios().then(res => this.arrgrupo_usuarios = res as grupo_usuarios[]); 
    //this.apitabelas.getItenstabelas().then(res => this.arrtabelas = res as tabelas[]); 
  //FIM - POPULA ARRAYS DE DADOS ESTRANGEIROS

    if (this.data.ItemIndex == null){ //VERIFICA SE TEM INDICE SE TIVE CARREGA DADOS NO FORM PARA EDICAO SENAO RESET DADOS PARA O INSERT  
      this.formData = {  
        cmp_codigo:null,
        gus_codigo:null,
        pca_codigo:null,
        pca_permissao:null,
        pca_status:null,
        tab_codigo:null,
        cmp_descricao:null,
        gus_descricao:null,
        tab_titulo:null,
      item_status:'I'  
    } 
    } 
    else{  
      this.formData = Object.assign({}, this.MestreSevice.Itemspermissoes_campos[this.data.ItemIndex]); 
      this.formData.item_status = 'U'; 
    }  
  }  
  validateForm(formData: permissoes_campos) { //VALIDA FORM OBRIGATORIOS 
    this.isValid = true; 
     if (formData.pca_permissao == null) 
      this.isValid = false; 
    return this.isValid; 
  }
  onSubmit(form: NgForm) { 
    if (this.validateForm(form.value)) { 
      if (this.data.ItemIndex == null) 
        this.MestreSevice.Itemspermissoes_campos.push(form.value); 
      else  
        this.MestreSevice.Itemspermissoes_campos[this.data.ItemIndex] = form.value; 
      this.dialogRef.close(); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
    } 
  } 
} //FIM - CONSTRUTOR
