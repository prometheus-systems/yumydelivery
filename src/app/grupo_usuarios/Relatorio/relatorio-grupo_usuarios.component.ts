import { Component, OnInit} from '@angular/core'; 
import {Router} from "@angular/router"; 
import {grupo_usuariosService} from "../../services/grupo_usuarios.service"; 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { AuthService } from "../../auth/auth.service"; 
 
@Component({ 
  selector: 'app-relatorio-grupo_usuarios', 
  templateUrl: './relatorio-grupo_usuarios.component.html', 
}) 
 
export class Relatoriogrupo_usuariosComponent implements OnInit { 
  arrGrupo:any[]=[]; 
 
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , public apiService: grupo_usuariosService  
            , private authService: AuthService 
            , private dialogService: DialogService  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.populaDadosChart(); 
  }  
 
  Voltar(){ 
    this.router.navigate(['Listargrupo_usuarios'], {skipLocationChange: true, fragment: 'top'}); 
    this.authService.setStatus_logado = true;  
  } 
 
  populaDadosChart(){ 
    let registro:any; 
    let vGrupo:string=''; 
    this.apiService.DataChart = []; 
    for (let i=0;i<this.apiService.arrgrupo_usuarios.length;i++){ 
      if ((vGrupo!=this.apiService.arrgrupo_usuarios[i].gus_descricao)&&(vGrupo)){ 
        registro={'grupo':vGrupo}; 
        this.arrGrupo.push(registro); 
        this.apiService.DataChart.push(registro); 
      }else{ 
      }  
      vGrupo=this.apiService.arrgrupo_usuarios[i].gus_descricao;  
    } 
    registro={'grupo':vGrupo};  
    this.apiService.DataChart.push(registro); 
    this.arrGrupo.push(registro); 
  } 
 
  GoogleChart(){ 
    this.router.navigate(['Graficogrupo_usuarios'], {skipLocationChange: true, fragment: 'top'});  
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
