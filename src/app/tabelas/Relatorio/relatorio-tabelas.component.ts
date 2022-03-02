import { Component, OnInit} from '@angular/core'; 
import {Router} from "@angular/router"; 
import {tabelasService} from "../../services/tabelas.service"; 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { AuthService } from "../../auth/auth.service"; 
 
@Component({ 
  selector: 'app-relatorio-tabelas', 
  templateUrl: './relatorio-tabelas.component.html', 
}) 
 
export class RelatoriotabelasComponent implements OnInit { 
  arrGrupo:any[]=[]; 
 
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: tabelasService  
            , private authService: AuthService 
            , private dialogService: DialogService  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.populaDadosChart(); 
  }  
 
  Voltar(){ 
    this.router.navigate(['Listartabelas'], {skipLocationChange: true, fragment: 'top'}); 
    this.authService.setStatus_logado = true;  
  } 
 
  populaDadosChart(){ 
    let registro:any; 
    let vGrupo:string=''; 
    this.apiService.DataChart = []; 
    for (let i=0;i<this.apiService.arrtabelas.length;i++){ 
      if ((vGrupo!=this.apiService.arrtabelas[i].tab_nome)&&(vGrupo)){ 
        registro={'grupo':vGrupo}; 
        this.arrGrupo.push(registro); 
        this.apiService.DataChart.push(registro); 
      }else{ 
      }  
      vGrupo=this.apiService.arrtabelas[i].tab_nome;  
    } 
    registro={'grupo':vGrupo};  
    this.apiService.DataChart.push(registro); 
    this.arrGrupo.push(registro); 
  } 
 
  GoogleChart(){ 
    this.router.navigate(['Graficotabelas'], {skipLocationChange: true, fragment: 'top'});  
  } 
 
  Imprimir() { 
    document.getElementById("btnchart").hidden = true; 
    document.getElementById("btnprint").hidden = true; 
    document.getElementById("btnback").hidden = true; 
    window.print(); 
    document.getElementById("btnback").hidden = false; 
    document.getElementById("btnprint").hidden = false; 
    document.getElementById("btnchart").hidden = false; 
  } 
} //FIM - CONSTRUTOR
