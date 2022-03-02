import { Component, OnInit} from '@angular/core'; 
import {Router} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {enderecoService} from "../../services/endereco.service"; 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { AuthService } from "../../auth/auth.service"; 
import { environment } from "../../../environments/environment"; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
 
@Component({ 
  selector: 'app-relatorio-endereco', 
  templateUrl: './relatorio-endereco.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class relatorioenderecoComponent implements OnInit { bounce:any;
  Device = environment.Device; 
  tem_total:boolean=false; 
  arrGrupo:any[]=[]; 
 
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: enderecoService  
            , private authService: AuthService 
            , private _translate: TranslateService 
            , private dialogService: DialogService  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.populaDadosChart(); 
  }  
 
  Voltar(){ 
    this.router.navigate(['Listarendereco'], {skipLocationChange: true, fragment: 'top'}); 
    this.authService.setStatus_logado = true;  
  } 
 
  populaDadosChart(){ 
    let registro:any; 
    let vGrupo:string=''; 
    this.apiService.DataChart = []; 
    for (let i=0;i<this.apiService.arrendereco.length;i++){ 
      if ((vGrupo!=this.apiService.arrendereco[i].end_endereco)&&(vGrupo)){ 
        registro={'grupo':vGrupo}; 
        this.arrGrupo.push(registro); 
        this.apiService.DataChart.push(registro); 
      }else{ 
      }  
      vGrupo=this.apiService.arrendereco[i].end_endereco;  
    } 
    registro={'grupo':vGrupo};  
    this.apiService.DataChart.push(registro); 
    this.arrGrupo.push(registro); 
  } 
 
  GoogleChart(){ 
    this.router.navigate(['Graficoendereco'], {skipLocationChange: true, fragment: 'top'});  
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
