import { Component, OnInit} from '@angular/core'; 
import {Router} from "@angular/router"; 
//import { TranslateService }   from '../../shared/translate.service'; 
import {sintetico_por_cardapioService} from "../../services/sintetico_por_cardapio.service"; 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { AuthService } from "../../auth/auth.service"; 
import { environment } from "../../../environments/environment"; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
 
@Component({ 
  selector: 'app-relatorio-sintetico_por_cardapio', 
  templateUrl: './relatorio-sintetico_por_cardapio.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class relatoriosintetico_por_cardapioComponent implements OnInit { bounce:any;
  Device = environment.Device; 
  tem_total:boolean=true; 
  totalgeralite_subtotal:number=0;  
  totalgeralped_qtde:number=0;  
  arrGrupo:any[]=[]; 
 
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: sintetico_por_cardapioService  
            , private authService: AuthService 
             
            , private dialogService: DialogService  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.totalgeralite_subtotal = this.TotalGeralite_subtotal();
    this.totalgeralped_qtde = this.TotalGeralped_qtde();
    this.populaDadosChart(); 
  }  
 
  Voltar(){ 
    this.router.navigate(['Inicial']/*, {skipLocationChange: true, fragment: 'top'}*/); 
    this.authService.setStatus_logado = true;  
  } 
 
  TotalGeralite_subtotal(){  
      let result:number=0;  
      for (let i=0;i<this.apiService.arrsintetico_por_cardapio.length;i++){  
        result += parseFloat(this.apiService.arrsintetico_por_cardapio[i].ite_subtotal);  
      }   
      return result;   
  }
 
  TotalGeralped_qtde(){  
      let result:number=0;  
      for (let i=0;i<this.apiService.arrsintetico_por_cardapio.length;i++){  
        result += parseFloat(this.apiService.arrsintetico_por_cardapio[i].ped_qtde);  
      }   
      return result;   
  }
 
  populaDadosChart(){ 
    let registro:any; 
    let vGrupo:string=''; 
    let vite_subtotal:number=0; 
    let vped_qtde:number=0; 
    this.apiService.DataChart = []; 
    for (let i=0;i<this.apiService.arrsintetico_por_cardapio.length;i++){ 
      if ((vGrupo!=this.apiService.arrsintetico_por_cardapio[i].car_nome)&&(vGrupo)){ 
        registro={'grupo':vGrupo,'ite_subtotal':vite_subtotal,'ped_qtde':vped_qtde}; 
        this.arrGrupo.push(registro); 
        this.apiService.DataChart.push(registro); 
        vite_subtotal = parseFloat(this.apiService.arrsintetico_por_cardapio[i].ite_subtotal); 
        vped_qtde = parseFloat(this.apiService.arrsintetico_por_cardapio[i].ped_qtde); 
      }else{ 
        vite_subtotal += parseFloat(this.apiService.arrsintetico_por_cardapio[i].ite_subtotal); 
        vped_qtde += parseFloat(this.apiService.arrsintetico_por_cardapio[i].ped_qtde); 
      }  
      vGrupo=this.apiService.arrsintetico_por_cardapio[i].car_nome;  
    } 
    registro={'grupo':vGrupo,'ite_subtotal':vite_subtotal,'ped_qtde':vped_qtde};  
    this.apiService.DataChart.push(registro); 
    this.arrGrupo.push(registro); 
  } 
 
  GoogleChart(){ 
    this.router.navigate(['Graficosintetico_por_cardapio']/*, {skipLocationChange: true, fragment: 'top'}*/);  
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
