import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {sabores} from "../../model/sabores.model"; 
import {saboresService} from "../../services/sabores.service"; 
 
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
import { cardapioService } from 'src/app/services/cardapio.service';
 
@Component({ 
  selector: 'app-listar-sabores', 
  templateUrl: './listar-sabores.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class ListarsaboresComponent implements OnInit {bounce:any; 
  Device = environment.Device; 
  arrsabores: sabores[];
  car_codigo1:number;
  car_codigo2:number;
  arrcardapio:any[];
  
    ColumnsWeb: string[] = ['sab_codigo','sab_nome','car_nome','sab_valor','buttons']; 
    ColumnsApp: string[] = ['sab_nome','buttons']; 
  displayedColumns: string[] = []; 
  dataSource: any;  
  baseUrl = environment.URLBase;  
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: saboresService  
            , private materialmodule: MaterialModules  
            , private _translate: TranslateService 
            , private dialogService: DialogService  
            , private apicardapio:cardapioService
            , private authService: AuthService 
            , private dialog : MatDialog  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.apicardapio.getcardapio().subscribe(dados=>{
      console.log('cardapio',dados); 
      this.arrcardapio = dados; 
    });  
    if(this.Device=='D'){
      this.displayedColumns = this.ColumnsWeb;
    }else{
      this.displayedColumns = this.ColumnsApp;}
    //************************************************ 
    //INICIO - PERMISSOES 
    this.apiService.formVisible = { 
        car_codigo:true,   
        sab_codigo:true,   
        sab_descricao:true,   
        sab_nome:true,   
        sab_valor:true,   
    }; 
    this.permissaoFieldVisible('sabores'); 
    //FIM - PERMISSOES 
    //************************************************ 
    this.apiService.getsabores() 
      .subscribe( data => {  
        if (Array.isArray(data) && data.length){ 
          this.arrsabores = data;  
        console.log('lista',data); 
          this.dataSource = new MatTableDataSource<any>(this.arrsabores); 
          this.dataSource.paginator = this.paginator; 
          this.dataSource.sort = this.sort; 
        } 
      }); 
    }  
    applyFilter(filterValue: string) { 
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }  
 
  deletesabores(Regsabores: sabores): void { //CHAMA SERVICEparaEXCLUSÃO NO BACKEND
    let i = this.arrsabores.findIndex(u => u === Regsabores); //BUSCA INDICEparaEXCLUSSÃO NO ARRAY 
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        this.apiService.deletesabores(Regsabores.sab_codigo) 
          .subscribe( data => { 
            this.arrsabores.splice(i, 1); 
            this.dataSource = new MatTableDataSource<any>(this.arrsabores); 
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
            case 'car_codigo': {   
              this.apiService.formVisible.car_codigo = false; 
              break;  
            }    
            case 'sab_codigo': {   
              this.apiService.formVisible.sab_codigo = false; 
              break;  
            }    
            case 'sab_descricao': {   
              this.apiService.formVisible.sab_descricao = false; 
              break;  
            }    
            case 'sab_nome': {   
              this.apiService.formVisible.sab_nome = false; 
              break;  
            }    
            case 'sab_valor': {   
              this.apiService.formVisible.sab_valor = false; 
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
  editsabores(Regsabores: sabores): void {  //CHAMA ROTAparaFORM INSERT
    if (this.permissaoUpdate('sabores')){  
      this.router.navigate(['Formsabores',Regsabores.sab_codigo], {skipLocationChange: true, fragment: 'top'}); 
    }
  }; 
  
  insertsabores(): void { //CHAMA ROTAparaFORM INSERT
    this.router.navigate(['Formsabores'], {skipLocationChange: true, fragment: 'top'}); 
  }; 
 
  filtrorelsabores(): void {  //CHAMA ROTAparaFORM INSERT 
    this.apiService.getRelatoriosabores() 
      .pipe(first()) 
      .subscribe( 
        dados => { 
          console.log('relatorio',dados);  
          this.apiService.arrsabores = dados; 
          if (Array.isArray(this.apiService.arrsabores) && this.apiService.arrsabores.length){ 
            this.authService.setStatus_logado = false;  
            this.router.navigate(['relatoriosabores'], {skipLocationChange: true, fragment: 'top'}); 
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

  copiar(){
    this.apiService.copiar(this.car_codigo1,this.car_codigo2).subscribe(dados=>{
      console.log('copiou',dados);
      if (dados[0].retorno=='OK'){
        this.notification.success('Cópia executada com sucesso!');
      }
    });
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
