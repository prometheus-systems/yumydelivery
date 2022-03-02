import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router} from "@angular/router"; 
import {permissoes_tabelas} from "../../model/permissoes_tabelas.model"; 
import {grupo_usuarios} from "../../model/grupo_usuarios.model"; 
import {permissoes_tabelasService} from "../../services/permissoes_tabelas.service"; 
import {grupo_usuariosService} from "../../services/grupo_usuarios.service"; 
 
import {MatPaginator} from '@angular/material/paginator';  
import {MatTableDataSource} from '@angular/material/table'; 
import {MatSort} from '@angular/material/sort'; 
import {MaterialModules} from './../../materials-modules'; 
 
import { DialogService } from '../../shared/dialog.service'; 
//import { decodeutf8 } from '../../shared/decode.pipe';
import { NotificationService } from '../../shared/notification.service'; 
import { Observable, BehaviorSubject } from 'rxjs';
import { first, map } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service"; 
import { tabelas } from 'src/app/model/tabelas.model';
import { tabelasService } from 'src/app/services/tabelas.service';

@Component({ 
  
  selector: 'app-listar-permissoes_tabelas', 
  templateUrl: './listar-permissoes_tabelas.component.html', 
}) 
 
export class Listarpermissoes_tabelasComponent implements OnInit { 
  arrpermissoes_tabelas: permissoes_tabelas[]; 
  
  displayedColumns: string[] = ['pte_codigo','gus_descricao','tab_titulo','pte_inserir','pte_alterar','pte_excluir','pte_visualizar','tipo']; 
  dataSource: any;  
  arrgrupos:Observable<grupo_usuarios[]>; 
  arrtabelas:Observable<tabelas[]>; 
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: permissoes_tabelasService  
            , private materialmodule: MaterialModules  
            , private dialogService: DialogService  
            , private authService: AuthService 
            , private apigrupos:grupo_usuariosService 
            , private apitabelas:tabelasService 
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.apiService.getpermissoes_tabelas() 
      .subscribe( data => {  
        this.arrpermissoes_tabelas = data;  
        console.log('lista',data); 
        this.dataSource = new MatTableDataSource<any>(this.arrpermissoes_tabelas); 
        if (this.apiService.grupo){
          this.dataSource.filter = this.apiService.grupo.trim();
        }

        this.dataSource.paginator = this.paginator; 
        this.dataSource.sort = this.sort; 
      }); 

      this.arrgrupos = this.apigrupos.getgrupo_usuarios().pipe( 
        map(dados => { 
        console.log(dados); 
        return dados; 
      }));  

      this.arrtabelas = this.apitabelas.gettabelas().pipe( 
        map(dados => { 
        console.log(dados); 
        return dados; 
      }));

      this.applyFilterGroup(this.apiService.grupo);
      this.applyFilter(this.apiService.grupo);

    }  



  applyFilter(filterValue: string) {
    if (filterValue) 
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }  

  applyFilterGroup(filterValue: string) { 
    //debugger
    if (filterValue){
      this.dataSource.filter = filterValue.trim();  
      this.apiService.grupo = filterValue;
    }
  }

  applyFilterTabela(filterValue: string) { 
    //debugger
    if (filterValue){
      this.dataSource.filter = filterValue.trim();  
      this.apiService.tabela = filterValue;
    }
  }

 
  deletepermissoes_tabelas(Regpermissoes_tabelas: permissoes_tabelas): void { //CHAMA SERVICE PARA EXCLUSÃO NO BACKEND
    let i = this.arrpermissoes_tabelas.findIndex(u => u === Regpermissoes_tabelas); //BUSCA INDICE PARA EXCLUSSÃO NO ARRAY 
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        this.apiService.deletepermissoes_tabelas(Regpermissoes_tabelas.pte_codigo) 
          .subscribe( data => { 
            this.arrpermissoes_tabelas.splice(i, 1); 
            this.dataSource = new MatTableDataSource<any>(this.arrpermissoes_tabelas); 
            this.dataSource.paginator = this.paginator; 
            this.dataSource.sort = this.sort; 
            this.notification.success('Excluído com sucesso!')  
          }) 
      } 
    }); 
  }; 
  
  editpermissoes_tabelas(Regpermissoes_tabelas: permissoes_tabelas): void {  //CHAMA ROTA PARA FORM INSERT
    this.router.navigate(['Formpermissoes_tabelas',Regpermissoes_tabelas.pte_codigo], {skipLocationChange: true, fragment: 'top'}); 
  }; 
  
  insertpermissoes_tabelas(): void { //CHAMA ROTA PARA FORM INSERT
    this.router.navigate(['Formpermissoes_tabelas'], {skipLocationChange: true, fragment: 'top'}); 
  }; 
 
  filtrorelpermissoes_tabelas(): void {  //CHAMA ROTA PARA FORM INSERT 
    this.apiService.getRelatoriopermissoes_tabelas() 
      .pipe(first()) 
      .subscribe( 
        dados => { 
          this.authService.setStatus_logado = false;  
          console.log('relatorio',dados);  
          this.apiService.arrpermissoes_tabelas = dados; 
          this.router.navigate(['Relatoriopermissoes_tabelas'], {skipLocationChange: true, fragment: 'top'}); 
        }, 
        error => { 
          console.log('erro:',error); 
      }); 
  }; 
 
} //FIM - CONSTRUTOR
