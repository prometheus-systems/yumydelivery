import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {vendedores} from "../../model/vendedores.model"; 
import {vendedoresService} from "../../services/vendedores.service"; 
 
import {MatPaginator} from '@angular/material/paginator';  
import {MatTableDataSource} from '@angular/material/table'; 
import {MatSort} from '@angular/material/sort'; 
import {MaterialModules} from '../../materials-modules'; 
 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { first } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service"; 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import {LoadImage} from '../../shared/loadimage.component';  
import { environment } from "../../../environments/environment";  
import { fadeInUp} from 'ng-animate'; 
import { trigger, transition, useAnimation } from '@angular/animations'; 
 
@Component({ 
  selector: 'app-listar-vendedores', 
  templateUrl: './listar-vendedores.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class ListarvendedoresComponent implements OnInit {bounce:any; 
  Device = environment.Device; 
  TipoGrupo = environment.TipoGrupo;
  arrvendedores: vendedores[];   
    ColumnsWeb: string[] = ['ven_codigo','ven_nome','ven_cnpj','ven_fone','ven_email','ven_horario','ven_ativo','ven_logo','buttons']; 
    ColumnsApp: string[] = ['ven_nome','buttons']; 
  displayedColumns: string[] = []; 
  dataSource: any;  
  baseUrl = environment.URLBase;  
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: vendedoresService  
            , private materialmodule: MaterialModules  
            , private _translate: TranslateService 
            , private dialogService: DialogService  
            , private authService: AuthService 
            , private dialog : MatDialog  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.TipoGrupo = environment.TipoGrupo;

    if(this.Device=='D'){
      this.displayedColumns = this.ColumnsWeb;
    }else{
      this.displayedColumns = this.ColumnsApp;}
    //************************************************ 
    //INICIO - PERMISSOES 
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
    this.permissaoFieldVisible('vendedores'); 
    //FIM - PERMISSOES 
    //************************************************ 
    this.apiService.getvendedores() 
      .subscribe( data => {  
        if (Array.isArray(data) && data.length){ 
          this.arrvendedores = data;  
        console.log('lista',data); 
          this.dataSource = new MatTableDataSource<any>(this.arrvendedores); 
          this.dataSource.paginator = this.paginator; 
          this.dataSource.sort = this.sort; 
          for(let x=0;x<this.arrvendedores.length;x++){ 
            if (this.arrvendedores[x].ven_logo){ 
              if (this.arrvendedores[x].ven_logo.substr(0,24) =='https://yumiimarketplace'){
                this.arrvendedores[x].ven_logo= this.arrvendedores[x].ven_logo; 
              }
              else 
              if (this.arrvendedores[x].ven_logo.substr(0,11) =='https://jsa'){
                this.arrvendedores[x].ven_logo= this.arrvendedores[x].ven_logo; 
              }
              else{
                this.arrvendedores[x].ven_logo = 'https://jsa-angular-engenha.s3-sa-east-1.amazonaws.com/'+this.arrvendedores[x].ven_logo; 
              }
            }else{ 
              this.arrvendedores[x].ven_logo = this.baseUrl+'/alternative.png';  
            } 
          }  
        } 
      }); 
    }  
    applyFilter(filterValue: string) { 
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }  
  

  importarVendedores(){
    this.apiService.importarVendedor()
    .subscribe( data => {  
      console.log('importou',data); 
      this.ngOnInit();
    });  
  }
 
  onClickViewImage(image:string){ 
    this.FormImage(image) 
  } 
 
  FormImage(image:string) {  
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = true; 
    dialogConfig.width = "50%"; 
    dialogConfig.data = { image }; 
    this.dialog.open(LoadImage, dialogConfig).afterClosed().subscribe(res => {  
    });   
  }  
 

  deletevendedores(Regvendedores: vendedores): void { //CHAMA SERVICEparaEXCLUSÃO NO BACKEND
    let i = this.arrvendedores.findIndex(u => u === Regvendedores); //BUSCA INDICEparaEXCLUSSÃO NO ARRAY 
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        this.apiService.deletevendedores(Regvendedores.ven_codigo) 
          .subscribe( data => { 
            this.arrvendedores.splice(i, 1); 
            this.dataSource = new MatTableDataSource<any>(this.arrvendedores); 
            this.dataSource.paginator = this.paginator; 
            this.dataSource.sort = this.sort; 
            this.notification.success('Excluído com sucesso!')  
          }) 
      } 
    }); 
  }; 
  
//permissoes de campos 
 //*********************************** */ 
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
  editvendedores(Regvendedores: vendedores): void {  //CHAMA ROTAparaFORM INSERT
    if (this.permissaoUpdate('vendedores')){  
      this.router.navigate(['Formvendedores',Regvendedores.ven_codigo], {skipLocationChange: true, fragment: 'top'}); 
    }
  }; 
  
  insertvendedores(): void { //CHAMA ROTAparaFORM INSERT
    this.router.navigate(['Formvendedores'], {skipLocationChange: true, fragment: 'top'}); 
  }; 
 
  filtrorelvendedores(): void {  //CHAMA ROTAparaFORM INSERT 
    this.apiService.getRelatoriovendedores() 
      .pipe(first()) 
      .subscribe( 
        dados => { 
          console.log('relatorio',dados);  
          this.apiService.arrvendedores = dados; 
          if (Array.isArray(this.apiService.arrvendedores) && this.apiService.arrvendedores.length){ 
            this.authService.setStatus_logado = false;  
            this.router.navigate(['relatoriovendedores'], {skipLocationChange: true, fragment: 'top'}); 
          }else{  
            this.notification.success('Não encontrou lançamentos!');
          } 
        }, 
        error => { 
          console.log('erro:',error); 
      }); 
  }; 
 
  permissaoInsert(Tela:string){
    let result:boolean=false; 
    let array:any[]=environment.Permissoes; 
    for(let x=0;x<array.length;x++){ 
      if (array[x].tab_nome === Tela && array[x].pte_inserir === '1'){    
        result = true;
      } 
    }  
    return result;  
  } 
  
  permissaoDelete(Tela:string){  
    let result:boolean=false;   
    let array:any[]=environment.Permissoes;  
    for(let x=0;x<array.length;x++){  
      if (array[x].tab_nome === Tela && array[x].pte_excluir === '1'){  
        result = true;  
      } 
    }  
    return result; 
  } 
 
  permissaoUpdate(Tela:string){
    let result:boolean=false;
    let array:any[]=environment.Permissoes; 
    for(let x=0;x<array.length;x++){   
      if (array[x].tab_nome === Tela && array[x].pte_alterar === '1'){ 
        result = true;   
      } 
    }  
    return result; 
  }   
} //FIM - CONSTRUTOR
