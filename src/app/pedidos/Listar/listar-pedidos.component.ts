import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {pedidos} from "../../model/pedidos.model"; 
import {pedidosService} from "../../services/pedidos.service"; 
 
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
  selector: 'app-listar-pedidos', 
  templateUrl: './listar-pedidos.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class ListarpedidosComponent implements OnInit {bounce:any; 
  Device = environment.Device; 
  TipoGrupo = environment.TipoGrupo;
  arrpedidos: pedidos[]; 
  
    ColumnsWeb: string[] = ['ped_codigo','ven_nome','usu_nome','ped_datahora','ped_total','ped_forma_pagto','ped_tipo_pagto','ped_status','buttons']; 
    ColumnsApp: string[] = ['ped_datahora','ped_total','buttons']; 
  displayedColumns: string[] = []; 
  dataSource: any;  
  baseUrl = environment.URLBase;  
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: pedidosService  
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
        ped_codigo:true,   
        ped_datahora:true,   
        ped_datapronto:true,   
        ped_entregue:true,   
        ped_forma_pagto:true,   
        ped_retirado:true,   
        ped_status:true,   
        ped_tipo_pagto:true,   
        ped_total:true,   
        ped_usarbonificacao:true,   
    }; 
    this.permissaoFieldVisible('pedidos'); 
    //FIM - PERMISSOES 
    //************************************************ 
    this.apiService.getpedidos() 
      .subscribe( data => {  
        if (Array.isArray(data) && data.length){ 
          this.arrpedidos = data;  
        console.log('lista',data); 
          this.dataSource = new MatTableDataSource<any>(this.arrpedidos); 
          this.dataSource.paginator = this.paginator; 
          this.dataSource.sort = this.sort; 
        } 
      }); 
    }  
    applyFilter(filterValue: string) { 
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }  
 
  deletepedidos(Regpedidos: pedidos): void { //CHAMA SERVICEparaEXCLUSÃO NO BACKEND
    let i = this.arrpedidos.findIndex(u => u === Regpedidos); //BUSCA INDICEparaEXCLUSSÃO NO ARRAY 
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        this.apiService.deletepedidos(Regpedidos.ped_codigo) 
          .subscribe( data => { 
            this.arrpedidos.splice(i, 1); 
            this.dataSource = new MatTableDataSource<any>(this.arrpedidos); 
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
            case 'ped_codigo': {   
              this.apiService.formVisible.ped_codigo = false; 
              break;  
            }    
            case 'ped_datahora': {   
              this.apiService.formVisible.ped_datahora = false; 
              break;  
            }    
            case 'ped_datapronto': {   
              this.apiService.formVisible.ped_datapronto = false; 
              break;  
            }    
            case 'ped_entregue': {   
              this.apiService.formVisible.ped_entregue = false; 
              break;  
            }    
            case 'ped_forma_pagto': {   
              this.apiService.formVisible.ped_forma_pagto = false; 
              break;  
            }    
            case 'ped_retirado': {   
              this.apiService.formVisible.ped_retirado = false; 
              break;  
            }    
            case 'ped_status': {   
              this.apiService.formVisible.ped_status = false; 
              break;  
            }    
            case 'ped_tipo_pagto': {   
              this.apiService.formVisible.ped_tipo_pagto = false; 
              break;  
            }    
            case 'ped_total': {   
              this.apiService.formVisible.ped_total = false; 
              break;  
            }    
            case 'ped_usarbonificacao': {   
              this.apiService.formVisible.ped_usarbonificacao = false; 
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
  editpedidos(Regpedidos: pedidos): void {  //CHAMA ROTAparaFORM INSERT
    if (this.permissaoUpdate('pedidos')){  
      this.router.navigate(['Formpedidos',Regpedidos.ped_codigo], {skipLocationChange: true, fragment: 'top'}); 
    }
  }; 
  
  insertpedidos(): void { //CHAMA ROTAparaFORM INSERT
    this.router.navigate(['Formpedidos'], {skipLocationChange: true, fragment: 'top'}); 
  }; 

 
  filtrorelpedidos(): void {  //CHAMA ROTAparaFORM INSERT 
    this.router.navigate(['Filtrorelpedidos'], {skipLocationChange: true, fragment: 'top'}); 
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
