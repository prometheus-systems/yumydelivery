import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router} from "@angular/router"; 
import {tabelas} from "../../model/tabelas.model"; 
import {tabelasService} from "../../services/tabelas.service"; 
 
import {MatPaginator} from '@angular/material/paginator';  
import {MatTableDataSource} from '@angular/material/table'; 
import {MatSort} from '@angular/material/sort'; 
import {MaterialModules} from './../../materials-modules'; 
 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { first } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service"; 
 
@Component({ 
  selector: 'app-listar-tabelas', 
  templateUrl: './listar-tabelas.component.html', 
}) 
 

export class ListartabelasComponent implements OnInit { 
  arrtabelas: tabelas[]; 
  
  displayedColumns: string[] = ['tab_codigo','tab_nome','tab_titulo','buttons']; 
  dataSource: any;  
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: tabelasService  
            , private materialmodule: MaterialModules  
            , private dialogService: DialogService  
            , private authService: AuthService 
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.apiService.gettabelas() 
      .subscribe( data => {  
        this.arrtabelas = data;  
        console.log('lista',data); 
        this.dataSource = new MatTableDataSource<any>(this.arrtabelas); 
        this.dataSource.paginator = this.paginator; 
        this.dataSource.sort = this.sort; 
      }); 
    }  
    applyFilter(filterValue: string) { 
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }  
 
  deletetabelas(Regtabelas: tabelas): void { //CHAMA SERVICE PARA EXCLUSÃO NO BACKEND
    let i = this.arrtabelas.findIndex(u => u === Regtabelas); //BUSCA INDICE PARA EXCLUSSÃO NO ARRAY 
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        this.apiService.deletetabelas(Regtabelas.tab_codigo) 
          .subscribe( data => { 
            this.arrtabelas.splice(i, 1); 
            this.dataSource = new MatTableDataSource<any>(this.arrtabelas); 
            this.dataSource.paginator = this.paginator; 
            this.dataSource.sort = this.sort; 
            this.notification.success('Excluído com sucesso!')  
          }) 
      } 
    }); 
  }; 
  
  edittabelas(Regtabelas: tabelas): void {  //CHAMA ROTA PARA FORM INSERT
    this.router.navigate(['Formtabelas',Regtabelas.tab_codigo], {skipLocationChange: true, fragment: 'top'}); 
  }; 
  
  inserttabelas(): void { //CHAMA ROTA PARA FORM INSERT
    this.router.navigate(['Formtabelas'], {skipLocationChange: true, fragment: 'top'}); 
  }; 
 
  filtroreltabelas(): void {  //CHAMA ROTA PARA FORM INSERT 
    this.apiService.getRelatoriotabelas() 
      .pipe(first()) 
      .subscribe( 
        dados => { 
          this.authService.setStatus_logado = false;  
          console.log('relatorio',dados);  
          this.apiService.arrtabelas = dados; 
          this.router.navigate(['Relatoriotabelas'], {skipLocationChange: true, fragment: 'top'}); 
        }, 
        error => { 
          console.log('erro:',error); 
      }); 
  }; 
 
} //FIM - CONSTRUTOR
