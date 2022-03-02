import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {categorias} from "../../model/categorias.model"; 
import {categoriasService} from "../../services/categorias.service"; 
 
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
  selector: 'app-listar-categorias', 
  templateUrl: './listar-categorias.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class ListarcategoriasComponent implements OnInit {bounce:any; 
  Device = environment.Device; 
  arrcategorias: categorias[]; 
  
    ColumnsWeb: string[] = ['cat_codigo','cat_nome','cat_imagem','buttons']; 
    ColumnsApp: string[] = ['cat_nome','buttons']; 
  displayedColumns: string[] = []; 
  dataSource: any;  
  baseUrl = environment.URLBase;  
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: categoriasService  
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
        cat_codigo:true,   
        cat_imagem:true,   
        cat_nome:true,   
    }; 
    this.permissaoFieldVisible('categorias'); 
    //FIM - PERMISSOES 
    //************************************************ 
    this.apiService.getcategorias() 
      .subscribe( data => {  
        if (Array.isArray(data) && data.length){ 
          this.arrcategorias = data;  
          for(let x=0;x<this.arrcategorias.length;x++){ 
            if (this.arrcategorias[x].cat_imagem){ 
              this.arrcategorias[x].cat_imagem= this.arrcategorias[x].cat_imagem; 
            }else{ 
              this.arrcategorias[x].cat_imagem = this.baseUrl+'/alternative.png';  
            } 
          }  
        console.log('lista',data); 
          this.dataSource = new MatTableDataSource<any>(this.arrcategorias); 
          this.dataSource.paginator = this.paginator; 
          this.dataSource.sort = this.sort; 
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
 
  deletecategorias(Regcategorias: categorias): void { //CHAMA SERVICEparaEXCLUSÃO NO BACKEND
    let i = this.arrcategorias.findIndex(u => u === Regcategorias); //BUSCA INDICEparaEXCLUSSÃO NO ARRAY 
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        this.apiService.deletecategorias(Regcategorias.cat_codigo) 
          .subscribe( data => { 
            this.arrcategorias.splice(i, 1); 
            this.dataSource = new MatTableDataSource<any>(this.arrcategorias); 
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
            case 'cat_codigo': {   
              this.apiService.formVisible.cat_codigo = false; 
              break;  
            }    
            case 'cat_imagem': {   
              this.apiService.formVisible.cat_imagem = false; 
              break;  
            }    
            case 'cat_nome': {   
              this.apiService.formVisible.cat_nome = false; 
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
  editcategorias(Regcategorias: categorias): void {  //CHAMA ROTAparaFORM INSERT
    if (this.permissaoUpdate('categorias')){  
      this.router.navigate(['Formcategorias',Regcategorias.cat_codigo], {skipLocationChange: true, fragment: 'top'}); 
    }
  }; 
  
  insertcategorias(): void { //CHAMA ROTAparaFORM INSERT
    this.router.navigate(['Formcategorias'], {skipLocationChange: true, fragment: 'top'}); 
  }; 
 
  filtrorelcategorias(): void {  //CHAMA ROTAparaFORM INSERT 
    this.apiService.getRelatoriocategorias() 
      .pipe(first()) 
      .subscribe( 
        dados => { 
          console.log('relatorio',dados);  
          this.apiService.arrcategorias = dados; 
          if (Array.isArray(this.apiService.arrcategorias) && this.apiService.arrcategorias.length){ 
            for(let x=0;x<this.apiService.arrcategorias.length;x++){ 
              if (this.apiService.arrcategorias[x].cat_imagem){ 
                this.apiService.arrcategorias[x].cat_imagem= this.baseUrl+'/'+this.apiService.arrcategorias[x].cat_imagem; 
              }else{  
                this.apiService.arrcategorias[x].cat_imagem = this.baseUrl+'/alternative.png';  
              }  
            }   
            this.authService.setStatus_logado = false;  
            this.router.navigate(['relatoriocategorias'], {skipLocationChange: true, fragment: 'top'}); 
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
