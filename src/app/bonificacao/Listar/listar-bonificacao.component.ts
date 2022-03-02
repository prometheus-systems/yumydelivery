import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {bonificacao} from "../../model/bonificacao.model"; 
import {bonificacaoService} from "../../services/bonificacao.service"; 
 
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
  selector: 'app-listar-bonificacao', 
  templateUrl: './listar-bonificacao.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class ListarbonificacaoComponent implements OnInit {bounce:any; 
  Device = environment.Device; 
  arrbonificacao: bonificacao[]; 
  
    ColumnsWeb: string[] = ['bon_codigo','ven_nome','car_nome','bon_pontos','buttons']; 
    ColumnsApp: string[] = ['car_nome','buttons']; 
  displayedColumns: string[] = []; 
  dataSource: any;  
  baseUrl = environment.URLBase;  
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: bonificacaoService  
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
        bon_codigo:true,   
        bon_pontos:true,   
        car_codigo:true,   
        ven_codigo:true,   
    }; 
    this.permissaoFieldVisible('bonificacao'); 
    //FIM - PERMISSOES 
    //************************************************ 
    this.apiService.getbonificacao() 
      .subscribe( data => {  
        if (Array.isArray(data) && data.length){ 
          this.arrbonificacao = data;  
        console.log('lista',data); 
          this.dataSource = new MatTableDataSource<any>(this.arrbonificacao); 
          this.dataSource.paginator = this.paginator; 
          this.dataSource.sort = this.sort; 
        } 
      }); 
    }  
    applyFilter(filterValue: string) { 
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }  
 
  deletebonificacao(Regbonificacao: bonificacao): void { //CHAMA SERVICEparaEXCLUSÃO NO BACKEND
    let i = this.arrbonificacao.findIndex(u => u === Regbonificacao); //BUSCA INDICEparaEXCLUSSÃO NO ARRAY 
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        this.apiService.deletebonificacao(Regbonificacao.bon_codigo) 
          .subscribe( data => { 
            this.arrbonificacao.splice(i, 1); 
            this.dataSource = new MatTableDataSource<any>(this.arrbonificacao); 
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
            case 'bon_codigo': {   
              this.apiService.formVisible.bon_codigo = false; 
              break;  
            }    
            case 'bon_pontos': {   
              this.apiService.formVisible.bon_pontos = false; 
              break;  
            }    
            case 'car_codigo': {   
              this.apiService.formVisible.car_codigo = false; 
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
  editbonificacao(Regbonificacao: bonificacao): void {  //CHAMA ROTAparaFORM INSERT
    if (this.permissaoUpdate('bonificacao')){  
      this.router.navigate(['Formbonificacao',Regbonificacao.bon_codigo], {skipLocationChange: true, fragment: 'top'}); 
    }
  }; 
  
  insertbonificacao(): void { //CHAMA ROTAparaFORM INSERT
    this.router.navigate(['Formbonificacao'], {skipLocationChange: true, fragment: 'top'}); 
  }; 
 
  filtrorelbonificacao(): void {  //CHAMA ROTAparaFORM INSERT 
    this.apiService.getRelatoriobonificacao() 
      .pipe(first()) 
      .subscribe( 
        dados => { 
          console.log('relatorio',dados);  
          this.apiService.arrbonificacao = dados; 
          if (Array.isArray(this.apiService.arrbonificacao) && this.apiService.arrbonificacao.length){ 
            this.authService.setStatus_logado = false;  
            this.router.navigate(['relatoriobonificacao'], {skipLocationChange: true, fragment: 'top'}); 
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
