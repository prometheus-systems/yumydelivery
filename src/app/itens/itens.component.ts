import {Component, OnInit, Inject} from "@angular/core"; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
//import { TranslateService }   from '../shared/translate.service'; 
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"; 
import {NgForm } from "@angular/forms"; 
import {pedidosService} from "../services/pedidos.service"; 
import {itensService} from "../services/itens.service"; 
import {itens} from "../model/itens.model"; 
import {NotificationService } from "../shared/notification.service"; 
import {map} from "rxjs/operators"; 
import { environment } from "../../environments/environment";  
import { cardapio } from '../model/cardapio.model';
import { cardapioService } from '../services/cardapio.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
//importar COMPONENTES DE TABELA ESTRANGEIRAS 
//FIM - importar COMPONENTES DE TABELA ESTRANGEIRAS 
@Component({ 
  selector: 'app-itens', 
  templateUrl: './itens.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class itensComponent implements OnInit { bounce:any;
  Device = environment.Device; 
  isValid: boolean = true; 
  teclado:boolean = false;
  formData: itens; 
  arrcardapio: Observable<cardapio[]>;
  datasource:any;
  TipoGrupo = environment.TipoGrupo;
  //ARRAYS DE COMPONENTES DE tabelas ESTRANGEIRAS 
  //FIM - ARRAYS DE COMPONENTES DE tabelas ESTRANGEIRAS 
  
constructor(  //INICIA O CONSTRUTOR E VARIAVEIS
  @Inject(MAT_DIALOG_DATA) 
    public data   
    
   ,public dialogRef: MatDialogRef<itensComponent>  
   ,private notification:NotificationService  
   ,public apiService: itensService 
   ,public apicardapio:cardapioService
   ,public MestreSevice: pedidosService) { } 

  focusFunction(){
    if (this.Device=='M'){
      this.teclado = true;
    }
    

  }
  
   focusOutFunction(){
    this.teclado = false;
  }
  
  ngOnInit() {  
    this.arrcardapio = this.apicardapio.getcardapio().pipe( 
      map(dados => { 
      console.log(dados); 
      this.datasource = new MatTableDataSource<any>(dados); 
      return dados; 
    })); 

    //************************************************ 
    //INICIO - PERMISSOES 
    this.apiService.formDisabled = { 
        car_codigo:false,   
        ite_codigo:false,   
        ite_preco:false,   
        ite_qtde:false,   
        ite_subtotal:false,   
    }; 
    this.apiService.formVisible = { 
        car_codigo:true,   
        ite_codigo:true,   
        ite_preco:true,   
        ite_qtde:true,   
        ite_subtotal:true,   
    }; 

    //FIM - PERMISSOES 
    //************************************************ 
    //POPULA ARRAYS DE DADOS ESTRANGEIROS
    //FIM - POPULA ARRAYS DE DADOS ESTRANGEIROS

    if (this.data.ItemIndex == null){ //VERIFICA SE TEM INDICE SE TIVE CARREGA DADOS NO FORMparaEDICAO SENAO RESET DADOSparaO INSERT 
      
 
        this.formData = {  
          ped_codigo:this.data.ped_codigo,
          ite_codigo:null,
          car_codigo:this.data.car_codigo,
          car_nome:this.data.car_nome,
          ite_preco:this.data.car_valor,
          ite_qtde:1,
          ite_subtotal:this.data.car_valor,
          item_status:'I',  
          usu_codigo:environment.CodigoUsuario 
        } 
    }else{  
      //debugger 
      if (this.TipoGrupo=='C'){
        this.formData = {  
          ped_codigo:null,
          ite_codigo:null,
          car_codigo:this.data.ID,
          car_nome:this.data.nome,
          ite_preco:this.data.valor,
          ite_qtde:1,
          ite_subtotal:this.data.valor,
          item_status:'I',  
          usu_codigo:environment.CodigoUsuario 
        }
      }
      else{
        this.formData = Object.assign({}, this.MestreSevice.Itemsitens[this.data.ItemIndex]); 
        this.formData.item_status = 'U'; 
  
      }
    }  
  }  
  

  atualizarSubTotal() { 
    //debugger
    if (this.formData.ite_qtde>this.data.estoque){
      this.formData.ite_qtde = this.data.estoque;
      this.notification.success('Quantidade insuficiênte no estoque!') 
    }
    this.formData.ite_subtotal = parseFloat(((this.formData.ite_preco*1.0) * (this.formData.ite_qtde*1.0)).toFixed(2))*1.0; 
  }

  updateItemsitens(ctrl) {//carrega os valores nos campos hidden 
    ////debugger
    if (ctrl.selectedIndex < 0) { 
      this.formData.car_nome = null;  
      this.formData.ite_preco = null;  
    } 
    else { 
      this.formData.car_nome = this.datasource.data[ctrl.selectedIndex].car_nome; 
      this.formData.ite_preco = this.datasource.data[ctrl.selectedIndex].car_valor; 
    } 
    this.atualizarSubTotal(); 
  }  
  validateForm(formData: itens) { //VALIDA FORM OBRIGATORIOS 
    //debugger 
    this.isValid = true; 
    if (formData.car_codigo == null) 
      this.isValid = false; 
    if (formData.car_nome == null) 
      this.isValid = false;   
    if (formData.ite_preco == null) 
      this.isValid = false; 
    if (formData.ite_qtde == null) 
      this.isValid = false; 
    if (formData.ite_subtotal == null) 
      this.isValid = false; 
    return this.isValid; 
  }
  onSubmit(form: NgForm) { 
    //debugger 
    if (this.validateForm(form.value)) { 
      if (this.data.ItemIndex == null) 
        this.MestreSevice.Itemsitens.push(form.value); 
      else  
        if (this.TipoGrupo=='C'){
          this.MestreSevice.Itemsitens.push(form.value); 
        }else{
          this.MestreSevice.Itemsitens[this.data.ItemIndex] = form.value; 
        }
        
      this.dialogRef.close(); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
    } 
  } 
} //FIM - CONSTRUTOR
