import { Component, OnInit} from '@angular/core'; 
import {Router} from "@angular/router"; 
//import { TranslateService }   from '../../shared/translate.service'; 
import {lista_pedidosService} from "../../services/lista_pedidos.service"; 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { AuthService } from "../../auth/auth.service"; 
import { environment } from "../../../environments/environment"; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
 
@Component({ 
  selector: 'app-relatorio-lista_pedidos', 
  templateUrl: './relatorio-lista_pedidos.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class relatoriolista_pedidosComponent implements OnInit { bounce:any;
  Device = environment.Device; 
  tem_total:boolean=true; 
  totalgeralite_qtde:number=0;  
  totalgeralite_subtotal:number=0;  
  arrGrupo:any[]=[]; 
 
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: lista_pedidosService  
            , private authService: AuthService 
             
            , private dialogService: DialogService  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.totalgeralite_qtde = this.TotalGeralite_qtde();
    this.totalgeralite_subtotal = this.TotalGeralite_subtotal();
    this.populaDadosChart(); 
  }  
 
  Voltar(){ 
    this.router.navigate(['Inicial']/*, {skipLocationChange: true, fragment: 'top'}*/); 
    this.authService.setStatus_logado = true;  
  } 
 
  TotalGeralite_qtde(){  
      let result:number=0;  
      for (let i=0;i<this.apiService.arrlista_pedidos.length;i++){  
        result += parseFloat(this.apiService.arrlista_pedidos[i].ite_qtde);  
      }   
      return result;   
  }
 
  TotalGeralite_subtotal(){  
      let result:number=0;  
      for (let i=0;i<this.apiService.arrlista_pedidos.length;i++){  
        result += parseFloat(this.apiService.arrlista_pedidos[i].ite_subtotal);  
      }   
      return result;   
  }
 
  populaDadosChart(){ 
    let registro:any; 
    let vGrupo:string=''; 
    let vite_qtde:number=0; 
    let vite_subtotal:number=0; 
    this.apiService.DataChart = []; 
    for (let i=0;i<this.apiService.arrlista_pedidos.length;i++){ 
      if ((vGrupo!=this.apiService.arrlista_pedidos[i].ped_datahora)&&(vGrupo)){ 
        registro={'grupo':vGrupo,'ite_qtde':vite_qtde,'ite_subtotal':vite_subtotal}; 
        this.arrGrupo.push(registro); 
        this.apiService.DataChart.push(registro); 
        vite_qtde = parseFloat(this.apiService.arrlista_pedidos[i].ite_qtde); 
        vite_subtotal = parseFloat(this.apiService.arrlista_pedidos[i].ite_subtotal); 
      }else{ 
        vite_qtde += parseFloat(this.apiService.arrlista_pedidos[i].ite_qtde); 
        vite_subtotal += parseFloat(this.apiService.arrlista_pedidos[i].ite_subtotal); 
      }  
      vGrupo=this.apiService.arrlista_pedidos[i].ped_datahora;  
    } 
    registro={'grupo':vGrupo,'ite_qtde':vite_qtde,'ite_subtotal':vite_subtotal};  
    this.apiService.DataChart.push(registro); 
    this.arrGrupo.push(registro); 
  } 
 
  GoogleChart(){ 
    this.router.navigate(['Graficolista_pedidos']/*, {skipLocationChange: true, fragment: 'top'}*/);  
  } 
 
  Imprimir() { 
    document.getElementById("btnchart").hidden = true; 
    document.getElementById("btnprint").hidden = true; 
    document.getElementById("btnback").hidden = true; 
    document.getElementById("btnback1").hidden = true; 
    window.print(); 
    document.getElementById("btnback").hidden = false; 
    document.getElementById("btnprint").hidden = false; 
    document.getElementById("btnchart").hidden = false; 
    document.getElementById("btnback1").hidden = false; 
  } 

} //FIM - CONSTRUTOR
