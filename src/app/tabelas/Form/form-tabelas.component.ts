 
import {Component, OnInit} from '@angular/core'; 
import {Router,ActivatedRoute} from "@angular/router"; 
import {tabelas} from "../../model/tabelas.model"; 
import {NgForm} from "@angular/forms"; 
import {first} from "rxjs/operators"; 
import {tabelasService} from "../../services/tabelas.service"; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'; 
import {camposComponent} from "../../campos/campos.component"; //componete tabela filha/detalhe
//IMPORTAR OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
//FIM - IMPORTAR OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import {DialogService} from '../../shared/dialog.service'; 
import {Location} from '@angular/common'; 
import {NotificationService} from '../../shared/notification.service'; 
@Component({ 
  selector: 'app-form-tabelas', 
  templateUrl: './form-tabelas.component.html', 
}) 
export class FormtabelasComponent implements OnInit { 
  //DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  //FIM - DECLARAR ARRAYS DAS CHAVES ESTRANGEIRAS 
  isValid: boolean = true; 
  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: ActivatedRoute  
   , private myrouter: Router 
   , public apiService: tabelasService 
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
      this.apiService.gettabelasId(id).subscribe( data => { 
        data[0].status_reg = 'U'; 
        this.apiService.formData = data[0]; 
        this.apiService.formData.status_reg = 'U'; 
        this.apiService.Itemscampos = data[0].Itemscampos; 
        console.log('itens',data[0].Itemscampos); 
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
      tab_codigo: null, 
      tab_nome: null, 
      tab_titulo: null, 
      DeletedItenscamposIDs: '',  
      status_reg:'I'  
    };  
    this.apiService.Itemscampos = []; 
  }  
  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM
    this.isValid = true; 
    if (this.apiService.formData==null) 
      this.isValid = false; 
    else if (this.apiService.formData.tab_nome == null) 
      this.isValid = false; 
    else if (this.apiService.formData.tab_titulo == null) 
      this.isValid = false; 
    return this.isValid; 
  } 
  //FUNCOES DOS ITENS (FILHO/DETALHE) 
  FormItemcampos(ItemIndex, ID) { //FUNCAO PARA ADD E EDITAR ITENS NO FORM NO COMPONENT MATDIALOGCONFIG
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true;  
    dialogConfig.disableClose = true; 
    dialogConfig.width = "50%"; 
    dialogConfig.data = { ItemIndex, ID }; 
    this.dialog.open(camposComponent, dialogConfig).afterClosed().subscribe(res => { 
      if (ItemIndex){ 
        console.log(this.apiService.Itemscampos[ItemIndex].item_status)  
        if (this.apiService.Itemscampos[ItemIndex].item_status!='I'){ 
          this.apiService.Itemscampos[ItemIndex].item_status = 'U';  
        } 
      } 
      else{  
        if (ItemIndex==0){  
         this.apiService.Itemscampos[ItemIndex].item_status = 'U';  
        }else{  
          this.apiService.Itemscampos[this.apiService.Itemscampos.length-1].item_status = 'I'; 
        } 
      } 
    }); 
  } 
  onDeleteItenscampos(cmp_codigo: number, i: number) { //DELETAR ITEM NO FORM  
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        if (cmp_codigo != null) 
          this.apiService.formData.DeletedItenscamposIDs += cmp_codigo+","; 
        this.apiService.Itemscampos[i].item_status = 'D'; 
        this.apiService.Itemscampos.splice(i, 1); 
      } 
    }); 
  } 
  //FIM - FUNCOES DOS ITENS (FILHO/DETALHE) 
  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM PARA SERVICE CHAMAR A FUNCAO PARA GRAVAR NO BACKEND
    if (this.validateForm()) { 
      this.apiService.gravartabelas(this.apiService.formData.status_reg) 
        .pipe(first()) 
        .subscribe( 
           data => {  
             console.log('ret-update',data);
             if (this.apiService.formData.status_reg == 'U'){ 
               if(data[0].chave > 0) { 
                  console.log('TABELAS ATUALIZADO COM EXITO.',data); 
               }else { 
                 console.log('ERRO: AO ATUALIZAR TABELAS'); 
               }  
             }else{  
                console.log('ret-insert',data);
                this.resetForm();
              } 
              this.myrouter.navigate(['Listartabelas'], {skipLocationChange: true, fragment: 'top'}); 
           }, 
           error => { 
             console.log('erro:',error); 
        }); 
    }else{  
      this.notification.success('Favor preencher os campos obrigatórios!') 
    }   
  }  
  onCancelar() { 
    this.myrouter.navigate(['Listartabelas'], {skipLocationChange: true, fragment: 'top'}); 
  } 
} //FIM - EXPORTS 
