 
import {Component, OnInit} from '@angular/core'; 
import {Router,ActivatedRoute} from "@angular/router"; 
import {permissoes_tabelas} from "../../model/permissoes_tabelas.model"; 
import {NgForm} from "@angular/forms"; 
import {first} from "rxjs/operators"; 
import {permissoes_tabelasService} from "../../services/permissoes_tabelas.service"; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'; 
import {permissoes_camposComponent} from "../../permissoes_campos/permissoes_campos.component"; //componete tabela filha/detalhe
//IMPORTAR OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {tabelasService} from "../../services/tabelas.service"; 
import {tabelas} from "../../model/tabelas.model"; 
//FIM - IMPORTAR OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import {DialogService} from '../../shared/dialog.service'; 
import {Location} from '@angular/common'; 
import {NotificationService} from '../../shared/notification.service'; 
@Component({ 
  selector: 'app-form-permissoes_tabelas', 
  templateUrl: './form-permissoes_tabelas.component.html', 
}) 
export class Formpermissoes_tabelasComponent implements OnInit { 
  //DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  arrtabelas:Observable<tabelas[]>; 
  //FIM - DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  isValid: boolean = true; 
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: ActivatedRoute  
   , private myrouter: Router 
   , public apiService: permissoes_tabelasService 
   , private dialog: MatDialog 
   , private location:Location 
   , private dialogService: DialogService 
   , private notification:NotificationService 
   , private apitabelas:tabelasService 
  ) { } 
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS
  ngOnInit() {  
    //VERIFICA SE A ROTA TEM PARAMETRO E EDICAO (FAZ LOAD DOS DADOS DO REGISTRO SELECIONADO E ITENS), SENAO E INSERCAO 
    let id = this.router.snapshot.paramMap.get('id'); 
    if (id){ 
      this.apiService.getpermissoes_tabelasId(id).subscribe( data => { 
        data[0].status_reg = 'U'; 
        this.apiService.formData = data[0]; 
        console.log('pai',data[0]); 
        this.apiService.formData.status_reg = 'U'; 
        this.apiService.Itemspermissoes_campos = data[0].Itemspermissoes_campos; 
        console.log('itens',data[0].Itemspermissoes_campos); 
      });  
    }else{  
      this.resetForm(); 
    }  
    //LOAD DOS ARRAY CHAVE ESTRANGEIRA 
    this.arrtabelas = this.apitabelas.gettabelas().pipe( 
      map(dados => { 
      console.log(dados); 
      return dados; 
    }));  
  }  
  resetForm(form?: NgForm) {//NOVO REGISTRO RESET DADOS E COLOCAR VALORES PADROES 
    if (form = null)  
      form.resetForm(); 
    this.apiService.formData = { 
      gus_codigo: null, 
      gus_descricao:null,
      tipo:null,
      tab_titulo:null,
      pte_alterar: null, 
      pte_codigo: null, 
      pte_excluir: null, 
      pte_inserir: null, 
      pte_visualizar: null, 
      tab_codigo: null, 
      DeletedItenspermissoes_camposIDs: '',  
      status_reg:'I'  
    };  
    this.apiService.Itemspermissoes_campos = []; 
  }  
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM
    this.isValid = true; 
    /*if (this.apiService.formData==null) 
      this.isValid = false; 
    else if (this.apiService.formData.gus_codigo == null) 
      this.isValid = false; 
    else if (this.apiService.formData.pte_alterar == null) 
      this.isValid = false; 
    else if (this.apiService.formData.pte_excluir == null) 
      this.isValid = false; 
    else if (this.apiService.formData.pte_inserir == null) 
      this.isValid = false; 
    else if (this.apiService.formData.pte_visualizar == null) 
      this.isValid = false; 
    else if (this.apiService.formData.tab_codigo == null) 
      this.isValid = false; */
    return this.isValid; 
  } 
  //FUNCOES DOS ITENS (FILHO/DETALHE) 
  FormItempermissoes_campos(ItemIndex, ID,ID2) { //FUNCAO PARA ADD E EDITAR ITENS NO FORM NO COMPONENT MATDIALOGCONFIG
    ////debugger
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true;  
    dialogConfig.disableClose = true; 
    dialogConfig.width = "50%"; 
    dialogConfig.data = { ItemIndex, ID, ID2 }; 
    this.dialog.open(permissoes_camposComponent, dialogConfig).afterClosed().subscribe(res => { 
      if (ItemIndex){ 
        console.log(this.apiService.Itemspermissoes_campos[ItemIndex].item_status)  
        if (this.apiService.Itemspermissoes_campos[ItemIndex].item_status!='I'){ 
          this.apiService.Itemspermissoes_campos[ItemIndex].item_status = 'U';  
        } 
      } 
      else{  
        if (ItemIndex==0){  
         this.apiService.Itemspermissoes_campos[ItemIndex].item_status = 'U';  
        }else{  
          this.apiService.Itemspermissoes_campos[this.apiService.Itemspermissoes_campos.length-1].item_status = 'I'; 
        } 
      } 
    }); 
  } 
  onDeleteItenspermissoes_campos(pca_codigo: number, i: number) { //DELETAR ITEM NO FORM  
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        if (pca_codigo != null) 
          this.apiService.formData.DeletedItenspermissoes_camposIDs += pca_codigo+","; 
        this.apiService.Itemspermissoes_campos[i].item_status = 'D'; 
        this.apiService.Itemspermissoes_campos.splice(i, 1); 
      } 
    }); 
  } 
  //FIM - FUNCOES DOS ITENS (FILHO/DETALHE) 
  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM PARA SERVICE CHAMAR A FUNCAO PARA GRAVAR NO BACKEND
    if (this.validateForm()) { 
      this.apiService.gravarpermissoes_tabelas(this.apiService.formData.status_reg) 
        .pipe(first()) 
        .subscribe( 
           data => {  
             console.log('ret-update',data);
             if (this.apiService.formData.status_reg == 'U'){ 
               if(data[0].chave > 0) { 
                  console.log('PERMISSOES_TABELAS ATUALIZADO COM EXITO.',data); 
               }else { 
                 console.log('ERRO: AO ATUALIZAR PERMISSOES_TABELAS'); 
               }  
             }else{  
                console.log('ret-insert',data);
                this.resetForm();
              } 
              this.myrouter.navigate(['Listarpermissoes_tabelas'], {skipLocationChange: true, fragment: 'top'}); 
           }, 
           error => { 
             console.log('erro:',error); 
        }); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
    }   
  }  
  onCancelar() { 
    this.myrouter.navigate(['Listarpermissoes_tabelas'], {skipLocationChange: true, fragment: 'top'}); 
  } 
} //FIM - EXPORTS 
