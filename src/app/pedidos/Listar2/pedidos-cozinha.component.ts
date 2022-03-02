import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router,ActivatedRoute} from "@angular/router"; 
//import { TranslateService }   from '../../shared/translate.service'; 
import {pedidos} from "../../model/pedidos.model"; 
import {pedidosService} from "../../services/pedidos.service"; 
import {MatTableDataSource} from '@angular/material/table'; 
import {MaterialModules} from '../../materials-modules'; 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { first } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service"; 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import { environment } from "../../../environments/environment";  
import { fadeInUp} from 'ng-animate'; 
import {LoadSabores} from '../../shared/sabores.component'; 
import { trigger, transition, useAnimation } from '@angular/animations'; 
 
@Component({ 
  selector: 'app-cozinha-pedidos', 
  templateUrl: './pedidos-cozinha.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class PedidosCozinhaComponent implements OnInit {bounce:any; 
  Device = environment.Device; 
  TipoGrupo = environment.TipoGrupo;
  arrpedidos: any[]=[]; 
  baseUrl = environment.URLBase;  
  id_seller:string;

 
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , private myrouter: ActivatedRoute
            , public apiService: pedidosService  
            , private materialmodule: MaterialModules  
             
            , private dialogService: DialogService  
            , private authService: AuthService 
            , private dialog : MatDialog  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 

    this.apiService.getPedidosCozinha('C') 
    .subscribe( data => { this.arrpedidos = data;  
      console.log('cozinha',data);
    });

  }
  
  sabores(sabores:any[]){
    this.apiService.arrSabores = sabores; 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = true; 
    if (this.Device == 'M' || this.Device == 'T'){
      dialogConfig.width = "110%"; 
    }else{
      dialogConfig.width = "50%"; 
    }
    dialogConfig.data = [];
    this.dialog.open(LoadSabores, dialogConfig).afterClosed().subscribe(res => {

    });
  }

  onPronto(Regpedidos: any): void { //CHAMA SERVICEparaEXCLUSÃO NO BACKEND
    //debugger
    let i = this.arrpedidos.findIndex(u => u === Regpedidos);  
    this.apiService.pedidoPronto(Regpedidos.codigo,Regpedidos.car_codigo) 
    .subscribe( data => { 
      console.log('data',data);
      if (data[0].retorno=='OK'){
        this.arrpedidos.splice(i, 1); 
        this.apiService.getPedidosCozinha('C') 
        .subscribe( data => { this.arrpedidos = data; 
          console.log('cozinha2',data); 
     
        });
      }            
    }) 


  }
   
  
} //FIM - CONSTRUTOR
