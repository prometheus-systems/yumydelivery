import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {endereco} from "../../model/endereco.model"; 
import {enderecoService} from "../../services/endereco.service"; 
 
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
  selector: 'app-listar-endereco', 
  templateUrl: './listar-endereco.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class ListarenderecoComponent implements OnInit {bounce:any; 
  Device = environment.Device; 
  arrendereco: endereco[]; 
  
    ColumnsWeb: string[] = ['end_codigo','end_endereco','end_bairro','end_numero','end_uf','end_cep','end_cidade','buttons']; 
    ColumnsApp: string[] = ['end_endereco','buttons']; 
  displayedColumns: string[] = []; 
  dataSource: any;  
  baseUrl = environment.URLBase;  
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: enderecoService  
            , private materialmodule: MaterialModules  
            , private _translate: TranslateService 
            , private dialogService: DialogService  
            , private authService: AuthService 
            , private dialog : MatDialog  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    if(this.Device=='D'){
      this.displayedColumns = this.ColumnsWeb;
    }else{
      this.displayedColumns = this.ColumnsApp;}
    //************************************************ 
    //INICIO - PERMISSOES 
    this.apiService.formVisible = { 
        end_bairro:true,   
        end_cep:true,   
        end_cidade:true,   
        end_codigo:true,   
        end_complemento:true,   
        end_endereco:true,   
        end_lat:true,   
        end_long:true,   
        end_numero:true,   
        end_referencia:true,   
        end_uf:true,   
    }; 
    this.permissaoFieldVisible('endereco'); 
    //FIM - PERMISSOES 
    //************************************************ 
    this.apiService.getendereco() 
      .subscribe( data => {  
        if (Array.isArray(data) && data.length){ 
          this.arrendereco = data;  
        console.log('lista',data); 
          this.dataSource = new MatTableDataSource<any>(this.arrendereco); 
          this.dataSource.paginator = this.paginator; 
          this.dataSource.sort = this.sort; 
        } 
      }); 
    }  
    applyFilter(filterValue: string) { 
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }  
 
  deleteendereco(Regendereco: endereco): void { //CHAMA SERVICEparaEXCLUSÃO NO BACKEND
    let i = this.arrendereco.findIndex(u => u === Regendereco); //BUSCA INDICEparaEXCLUSSÃO NO ARRAY 
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        this.apiService.deleteendereco(Regendereco.end_codigo) 
          .subscribe( data => { 
            this.arrendereco.splice(i, 1); 
            this.dataSource = new MatTableDataSource<any>(this.arrendereco); 
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
            case 'end_bairro': {   
              this.apiService.formVisible.end_bairro = false; 
              break;  
            }    
            case 'end_cep': {   
              this.apiService.formVisible.end_cep = false; 
              break;  
            }    
            case 'end_cidade': {   
              this.apiService.formVisible.end_cidade = false; 
              break;  
            }    
            case 'end_codigo': {   
              this.apiService.formVisible.end_codigo = false; 
              break;  
            }    
            case 'end_complemento': {   
              this.apiService.formVisible.end_complemento = false; 
              break;  
            }    
            case 'end_endereco': {   
              this.apiService.formVisible.end_endereco = false; 
              break;  
            }    
            case 'end_lat': {   
              this.apiService.formVisible.end_lat = false; 
              break;  
            }    
            case 'end_long': {   
              this.apiService.formVisible.end_long = false; 
              break;  
            }    
            case 'end_numero': {   
              this.apiService.formVisible.end_numero = false; 
              break;  
            }    
            case 'end_referencia': {   
              this.apiService.formVisible.end_referencia = false; 
              break;  
            }    
            case 'end_uf': {   
              this.apiService.formVisible.end_uf = false; 
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
  editendereco(Regendereco: endereco): void {  //CHAMA ROTAparaFORM INSERT
    if (this.permissaoUpdate('endereco')){  
      this.router.navigate(['Formendereco',Regendereco.end_codigo], {skipLocationChange: true, fragment: 'top'}); 
    }
  }; 
  
  insertendereco(): void { //CHAMA ROTAparaFORM INSERT
    this.router.navigate(['Formendereco'], {skipLocationChange: true, fragment: 'top'}); 
  }; 
 
  filtrorelendereco(): void {  //CHAMA ROTAparaFORM INSERT 
    this.apiService.getRelatorioendereco() 
      .pipe(first()) 
      .subscribe( 
        dados => { 
          console.log('relatorio',dados);  
          this.apiService.arrendereco = dados; 
          if (Array.isArray(this.apiService.arrendereco) && this.apiService.arrendereco.length){ 
            this.authService.setStatus_logado = false;  
            this.router.navigate(['relatorioendereco'], {skipLocationChange: true, fragment: 'top'}); 
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
