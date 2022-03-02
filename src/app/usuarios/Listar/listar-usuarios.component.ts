import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router} from "@angular/router"; 
import {usuarios} from "../../model/usuarios.model"; 
import {usuariosService} from "../../services/usuarios.service"; 
 
import {MatPaginator} from '@angular/material/paginator';  
import {MatTableDataSource} from '@angular/material/table'; 
import {MatSort} from '@angular/material/sort'; 
import {MaterialModules} from './../../materials-modules'; 
 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { first } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service"; 
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import {LoadImage} from '../../shared/loadimage.component';  
import { environment } from 'src/environments/environment';
 
@Component({ 
  selector: 'app-listar-usuarios', 
  templateUrl: './listar-usuarios.component.html', 
})  
export class ListarusuariosComponent implements OnInit { 
  arrusuarios: usuarios[]; 
  
  displayedColumns: string[] = ['usu_codigo','usu_nome','usu_fone','usu_email','gus_descricao','usu_foto','buttons']; 
  dataSource: any;  
  baseUrl = environment.URLBase;
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: usuariosService  
            , private materialmodule: MaterialModules  
            , private dialogService: DialogService  
            , private authService: AuthService 
            , private dialog : MatDialog  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.apiService.getusuarios() 
      .subscribe( data => {  
        this.arrusuarios = data;  
        console.log('lista',data); 
        this.dataSource = new MatTableDataSource<any>(this.arrusuarios); 
        this.dataSource.paginator = this.paginator; 
        this.dataSource.sort = this.sort;
        
        
        for(let x=0;x<this.arrusuarios.length;x++){ 
          if (this.arrusuarios[x].usu_foto.substr(0,24) =='https://yumiimarketplace'){
            this.arrusuarios[x].usu_foto= this.arrusuarios[x].usu_foto; 
          }
          else 
          if (this.arrusuarios[x].usu_foto.substr(0,11) =='https://jsa'){
            this.arrusuarios[x].usu_foto= this.arrusuarios[x].usu_foto; 
          }else{ 
            this.arrusuarios[x].usu_foto = this.baseUrl+'/alternative.png';  
          } 
        }  
      }); 
    }  
    applyFilter(filterValue: string) { 
    this.dataSource.filter = filterValue.trim().toLowerCase();  
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
 
 
  deleteusuarios(Regusuarios: usuarios): void { //CHAMA SERVICE PARA EXCLUSÃO NO BACKEND
    let i = this.arrusuarios.findIndex(u => u === Regusuarios); //BUSCA INDICE PARA EXCLUSSÃO NO ARRAY 
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        this.apiService.deleteusuarios(Regusuarios.usu_codigo) 
          .subscribe( data => { 
            this.arrusuarios.splice(i, 1); 
            this.dataSource = new MatTableDataSource<any>(this.arrusuarios); 
            this.dataSource.paginator = this.paginator; 
            this.dataSource.sort = this.sort; 
            this.notification.success('Excluído com sucesso!')  
          }) 
      } 
    }); 
  }; 
  
  editusuarios(Regusuarios: usuarios): void {  //CHAMA ROTA PARA FORM INSERT
    this.router.navigate(['Formusuarios',Regusuarios.usu_codigo], {skipLocationChange: true, fragment: 'top'}); 
  }; 
  
  insertusuarios(): void { //CHAMA ROTA PARA FORM INSERT
    this.router.navigate(['Formusuarios'], {skipLocationChange: true, fragment: 'top'}); 
  }; 

  importarCompradores(){

      this.apiService.importarComprador()
      .subscribe( data => {  
        console.log('importou',data); 
        this.ngOnInit();
      });  
  }
 
  filtrorelusuarios(): void {  //CHAMA ROTA PARA FORM INSERT 
    this.apiService.getRelatoriousuarios() 
      .pipe(first()) 
      .subscribe( 
        dados => { 
          this.authService.setStatus_logado = false;  
          console.log('relatorio',dados);  
          this.apiService.arrusuarios = dados; 
          this.router.navigate(['Relatoriousuarios'], {skipLocationChange: true, fragment: 'top'}); 
        }, 
        error => { 
          console.log('erro:',error); 
      }); 
  }; 
 
} //FIM - CONSTRUTOR
