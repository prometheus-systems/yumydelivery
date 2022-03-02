import { Component, OnInit} from '@angular/core'; 
import {Router} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {pedidosService} from "../../services/pedidos.service"; 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { AuthService } from "../../auth/auth.service"; 
import { environment } from "../../../environments/environment"; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
 
@Component({ 
  selector: 'app-relatorio-pedidos', 
  templateUrl: './relatorio-pedidos.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class relatoriopedidosComponent implements OnInit { bounce:any;
  Device = environment.Device; 
  tem_total:boolean=true; 
 
  totalgeralped_total:number=0;  
  totalgeraltotal:number=0;  
  arrGrupo:any[]=[]; 
 
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: pedidosService  
            , private authService: AuthService 
            , private _translate: TranslateService 
            , private dialogService: DialogService  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.totalgeralped_total = this.TotalGeralped_total();
    this.totalgeraltotal = this.TotalGeraltotal();
    this.populaDadosChart(); 
  }  
 
  Voltar(){ 
    this.router.navigate(['Listarpedidos'], {skipLocationChange: true, fragment: 'top'}); 
    this.authService.setStatus_logado = true;  
  } 
 

 
  TotalGeralped_total(){  
      let result:number=0;  
      for (let i=0;i<this.apiService.arrpedidos.length;i++){  
        result += parseFloat(this.apiService.arrpedidos[i].ped_total);  
      }   
      return result;   
  }

  TotalGeraltotal(){  
    let result:number=0;  
    for (let i=0;i<this.apiService.arrpedidos.length;i++){  
      result += parseFloat(this.apiService.arrpedidos[i].total);  
    }   
    return result;   
}
 
  populaDadosChart(){ 
    let registro:any; 
    let vGrupo:string=''; 
    let vped_total:number=0;
    //debugger
    this.apiService.DataChart = []; 
    for (let i=0;i<this.apiService.arrpedidos.length;i++){ 
      if ((vGrupo!=this.apiService.arrpedidos[i].ped_datahora.toString().substr(0,10))&&(vGrupo)){ 
        registro={'grupo':vGrupo,'ped_total':vped_total}; 
        this.arrGrupo.push(registro); 
        this.apiService.DataChart.push(registro); 
        vped_total = parseFloat(this.apiService.arrpedidos[i].ped_total); 
      }else{ 
        vped_total += parseFloat(this.apiService.arrpedidos[i].ped_total); 
      }  
      vGrupo=this.apiService.arrpedidos[i].ped_datahora.toString().substr(0,10);  
    } 
    registro={'grupo':vGrupo,'ped_total':vped_total};  
    this.apiService.DataChart.push(registro); 
    this.arrGrupo.push(registro); 
  } 
 
  GoogleChart(){ 
    this.router.navigate(['Graficopedidos'], {skipLocationChange: true, fragment: 'top'});  
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
