import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router} from "@angular/router"; 
import {grupo_usuarios} from "../../model/grupo_usuarios.model"; 
import {grupo_usuariosService} from "../../services/grupo_usuarios.service"; 
 
import {MatPaginator} from '@angular/material/paginator';  
import {MatTableDataSource} from '@angular/material/table'; 
import {MatSort} from '@angular/material/sort'; 
import {MaterialModules} from './../../materials-modules'; 
 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { first } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service"; 
 
@Component({ 
  selector: 'app-listar-grupo_usuarios', 
  templateUrl: './listar-grupo_usuarios.component.html', 
}) 
 
export class Listargrupo_usuariosComponent implements OnInit { 
  arrgrupo_usuarios: grupo_usuarios[]; 
  
  displayedColumns: string[] = ['gus_codigo','gus_descricao','buttons']; 
  dataSource: any;  
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: grupo_usuariosService  
            , private materialmodule: MaterialModules  
            , private dialogService: DialogService  
            , private authService: AuthService 
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.apiService.getgrupo_usuarios() 
      .subscribe( data => {  
        this.arrgrupo_usuarios = data;  
        console.log('lista',data); 
        this.dataSource = new MatTableDataSource<any>(this.arrgrupo_usuarios); 
        this.dataSource.paginator = this.paginator; 
        this.dataSource.sort = this.sort; 
      }); 
    }  
    applyFilter(filterValue: string) { 
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }  
 
  deletegrupo_usuarios(Reggrupo_usuarios: grupo_usuarios): void { //CHAMA SERVICE PARA EXCLUSÃO NO BACKEND
    let i = this.arrgrupo_usuarios.findIndex(u => u === Reggrupo_usuarios); //BUSCA INDICE PARA EXCLUSSÃO NO ARRAY 
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        this.apiService.deletegrupo_usuarios(Reggrupo_usuarios.gus_codigo) 
          .subscribe( data => { 
            this.arrgrupo_usuarios.splice(i, 1); 
            this.dataSource = new MatTableDataSource<any>(this.arrgrupo_usuarios); 
            this.dataSource.paginator = this.paginator; 
            this.dataSource.sort = this.sort; 
            this.notification.success('Excluído com sucesso!')  
          }) 
      } 
    }); 
  }; 
  
  editgrupo_usuarios(Reggrupo_usuarios: grupo_usuarios): void {  //CHAMA ROTA PARA FORM INSERT
    this.router.navigate(['Formgrupo_usuarios',Reggrupo_usuarios.gus_codigo], {skipLocationChange: true, fragment: 'top'}); 
  }; 
  
  insertgrupo_usuarios(): void { //CHAMA ROTA PARA FORM INSERT
    this.router.navigate(['Formgrupo_usuarios'], {skipLocationChange: true, fragment: 'top'}); 
  }; 
 
  filtrorelgrupo_usuarios(): void {  //CHAMA ROTA PARA FORM INSERT 
    this.apiService.getRelatoriogrupo_usuarios() 
      .pipe(first()) 
      .subscribe( 
        dados => { 
          this.authService.setStatus_logado = false;  
          console.log('relatorio',dados);  
          this.apiService.arrgrupo_usuarios = dados; 
          this.router.navigate(['Relatoriogrupo_usuarios'], {skipLocationChange: true, fragment: 'top'}); 
        }, 
        error => { 
          console.log('erro:',error); 
      }); 
  }; 
 
} //FIM - CONSTRUTOR
