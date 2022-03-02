import {Component, OnInit, Inject} from "@angular/core"; 
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"; 
import {NgForm } from "@angular/forms"; 
import {tabelasService} from "../services/tabelas.service"; 
import {campos} from "./../model/campos.model"; 
import {NotificationService } from "../shared/notification.service"; 
import {map} from "rxjs/operators"; 
//IMPORTAR COMPONENTES DE TABELA ESTRANGEIRAS 
//FIM - IMPORTAR COMPONENTES DE TABELA ESTRANGEIRAS 
@Component({ 
  selector: 'app-campos', 
  templateUrl: './campos.component.html', 
}) 
 
export class camposComponent implements OnInit { 
  isValid: boolean = true; 
  formData: campos; 
  //ARRAYS DE COMPONENTES DE TABELAS ESTRANGEIRAS 
  //FIM - ARRAYS DE COMPONENTES DE TABELAS ESTRANGEIRAS 
  
constructor(  //INICIA O CONSTRUTOR E VARIAVEIS
  @Inject(MAT_DIALOG_DATA) 
    public data   
   ,public dialogRef: MatDialogRef<camposComponent>  
   ,private notification:NotificationService  
   ,private MestreSevice: tabelasService) { } 
  
  ngOnInit() {  
    //POPULA ARRAYS DE DADOS ESTRANGEIROS
  //FIM - POPULA ARRAYS DE DADOS ESTRANGEIROS

    if (this.data.ItemIndex == null){ //VERIFICA SE TEM INDICE SE TIVE CARREGA DADOS NO FORM PARA EDICAO SENAO RESET DADOS PARA O INSERT  
      this.formData = {  
        cmp_codigo:null,
        cmp_descricao:null,
        cmp_nome:null,
      item_status:'I'  
    } 
    } 
    else{  
      this.formData = Object.assign({}, this.MestreSevice.Itemscampos[this.data.ItemIndex]); 
      this.formData.item_status = 'U'; 
    }  
  }  
  validateForm(formData: campos) { //VALIDA FORM OBRIGATORIOS 
    this.isValid = true; 
    if (formData.cmp_descricao == null) 
      this.isValid = false; 
    if (formData.cmp_nome == null) 
      this.isValid = false; 
    return this.isValid; 
  }
  onSubmit(form: NgForm) { 
    if (this.validateForm(form.value)) { 
      if (this.data.ItemIndex == null) 
        this.MestreSevice.Itemscampos.push(form.value); 
      else  
        this.MestreSevice.Itemscampos[this.data.ItemIndex] = form.value; 
      this.dialogRef.close(); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
    } 
  } 
} //FIM - CONSTRUTOR
