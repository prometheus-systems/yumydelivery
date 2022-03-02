import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {cardapio} from "../../model/cardapio.model"; 
import {cardapioService} from "../../services/cardapio.service"; 
 
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
  selector: 'app-listar-cardapio', 
  templateUrl: './listar-cardapio.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class ListarcardapioComponent implements OnInit {bounce:any; 
  Device = environment.Device; 
  arrcardapio: cardapio[]; 
  
    ColumnsWeb: string[] = ['car_codigo','car_nome','ven_nome','car_valor','car_descricao','car_imagen','car_ativo','car_estoque','buttons']; 
    ColumnsApp: string[] = ['car_nome','car_valor','buttons']; 
  displayedColumns: string[] = []; 
  dataSource: any;  
  baseUrl = environment.URLBase;  
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;   
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: cardapioService  
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
        car_ativo:true,   
        car_codigo:true,   
        car_descricao:true,   
        car_estoque:true,   
        car_imagen:true,   
        car_nome:true,   
        car_valor:true,   
        cat_codigo:true,   
        ven_codigo:true,   
    }; 
    this.permissaoFieldVisible('cardapio'); 
    //FIM - PERMISSOES 
    //************************************************ 
    this.apiService.getcardapio() 
      .subscribe( data => {  
        if (Array.isArray(data) && data.length){ 
          this.arrcardapio = data;  
          for(let x=0;x<this.arrcardapio.length;x++){ 
            if (this.arrcardapio[x].car_imagen){ 
              this.arrcardapio[x].car_imagen= this.arrcardapio[x].car_imagen; 
            }else{ 
              this.arrcardapio[x].car_imagen = this.baseUrl+'/alternative.png';  
            } 
          }  
        console.log('lista',data); 
          this.dataSource = new MatTableDataSource<any>(this.arrcardapio); 
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
 
  deletecardapio(Regcardapio: cardapio): void { //CHAMA SERVICEparaEXCLUSÃO NO BACKEND
    let i = this.arrcardapio.findIndex(u => u === Regcardapio); //BUSCA INDICEparaEXCLUSSÃO NO ARRAY 
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        this.apiService.deletecardapio(Regcardapio.car_codigo) 
          .subscribe( data => { 
            this.arrcardapio.splice(i, 1); 
            this.dataSource = new MatTableDataSource<any>(this.arrcardapio); 
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
            case 'car_ativo': {   
              this.apiService.formVisible.car_ativo = false; 
              break;  
            }    
            case 'car_codigo': {   
              this.apiService.formVisible.car_codigo = false; 
              break;  
            }    
            case 'car_descricao': {   
              this.apiService.formVisible.car_descricao = false; 
              break;  
            }    
            case 'car_estoque': {   
              this.apiService.formVisible.car_estoque = false; 
              break;  
            }    
            case 'car_imagen': {   
              this.apiService.formVisible.car_imagen = false; 
              break;  
            }    
            case 'car_nome': {   
              this.apiService.formVisible.car_nome = false; 
              break;  
            }    
            case 'car_valor': {   
              this.apiService.formVisible.car_valor = false; 
              break;  
            }    
            case 'cat_codigo': {   
              this.apiService.formVisible.cat_codigo = false; 
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
  editcardapio(Regcardapio: cardapio): void {  //CHAMA ROTAparaFORM INSERT
    if (this.permissaoUpdate('cardapio')){  
      this.router.navigate(['Formcardapio',Regcardapio.car_codigo], {skipLocationChange: true, fragment: 'top'}); 
    }
  }; 
  
  insertcardapio(): void { //CHAMA ROTAparaFORM INSERT
    this.router.navigate(['Formcardapio'], {skipLocationChange: true, fragment: 'top'}); 
  }; 

  importarCardapio(){
    this.apiService.importarCardapio()
    .subscribe( data => {  
      console.log('importou',data); 
      this.ngOnInit();
    });  
  }
 
  filtrorelcardapio(): void {  //CHAMA ROTAparaFORM INSERT 
    this.apiService.getRelatoriocardapio() 
      .pipe(first()) 
      .subscribe( 
        dados => { 
          console.log('relatorio',dados);  
          this.apiService.arrcardapio = dados; 
          if (Array.isArray(this.apiService.arrcardapio) && this.apiService.arrcardapio.length){ 
            for(let x=0;x<this.apiService.arrcardapio.length;x++){ 
              if (this.apiService.arrcardapio[x].car_imagen){ 
                this.apiService.arrcardapio[x].car_imagen= this.apiService.arrcardapio[x].car_imagen; 
              }else{  
                this.apiService.arrcardapio[x].car_imagen = this.baseUrl+'/alternative.png';  
              }  
            }   
            this.authService.setStatus_logado = false;  
            this.router.navigate(['relatoriocardapio'], {skipLocationChange: true, fragment: 'top'}); 
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
