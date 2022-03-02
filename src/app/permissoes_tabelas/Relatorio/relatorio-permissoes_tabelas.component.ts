﻿import { Component, OnInit} from '@angular/core'; 
import {Router} from "@angular/router"; 
import {permissoes_tabelasService} from "../../services/permissoes_tabelas.service"; 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { AuthService } from "../../auth/auth.service"; 
 
@Component({ 
  selector: 'app-relatorio-permissoes_tabelas', 
  templateUrl: './relatorio-permissoes_tabelas.component.html', 
}) 
 
export class Relatoriopermissoes_tabelasComponent implements OnInit { 
  arrGrupo:any[]=[]; 
 
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: permissoes_tabelasService  
            , private authService: AuthService 
            , private dialogService: DialogService  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.populaDadosChart(); 
  }  
 
  Voltar(){ 
    this.router.navigate(['Listarpermissoes_tabelas'], {skipLocationChange: true, fragment: 'top'}); 
    this.authService.setStatus_logado = true;  
  } 
 
  populaDadosChart(){ 
    let registro:any; 
    let vGrupo:string=''; 
    this.apiService.DataChart = []; 
    for (let i=0;i<this.apiService.arrpermissoes_tabelas.length;i++){ 
      if ((vGrupo!=this.apiService.arrpermissoes_tabelas[i].tab_codigo)&&(vGrupo)){ 
        registro={'grupo':vGrupo}; 
        this.arrGrupo.push(registro); 
        this.apiService.DataChart.push(registro); 
      }else{ 
      }  
      vGrupo=this.apiService.arrpermissoes_tabelas[i].tab_codigo;  
    } 
    registro={'grupo':vGrupo};  
    this.apiService.DataChart.push(registro); 
    this.arrGrupo.push(registro); 
  } 
 
  GoogleChart(){ 
    this.router.navigate(['Graficopermissoes_tabelas'], {skipLocationChange: true, fragment: 'top'});  
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
