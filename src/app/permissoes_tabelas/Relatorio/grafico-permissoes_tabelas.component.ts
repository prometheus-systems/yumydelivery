import {Component } from '@angular/core'; 
import {Router} from "@angular/router"; 
import {permissoes_tabelasService} from "../../services/permissoes_tabelas.service"; 
@Component({ 
  selector: 'app-grafico-permissoes_tabelas', 
  templateUrl: 'grafico-permissoes_tabelas.component.html',  
}) 

export class Graficopermissoes_tabelasComponent  {  
   constructor(public apiService: permissoes_tabelasService,private router: Router)  { } 
     title = 'GRÁFICO DE PERMISSÕES TABELAS'; 
     type = 'PieChart'; 
     data = this.getData(); 
     columnNames = ['Tabela', 'total']; 
     options = { 
     };  
     width = 700; 
     height = 700; 
   getData(){ 
      let result:any[]=[]; 
      for (let i=0;i<this.apiService.DataChart.length;i++){ 
      }  
      console.log(result); 
      return result; 
   } 

   getChart(){ 
      this.type = this.apiService.typeChart; 
      this.data = this.getData(); 
      this.columnNames = ['Tabela', 'total']; 
      this.options = {  
      };  
      this.width = 700; 
      this.height = 700; 
   } 

   Imprimir() { 
        document.getElementById("btngauge").hidden = true; 
        document.getElementById("btnpie").hidden = true; 
        document.getElementById("btnline").hidden = true; 
        document.getElementById("btnbar").hidden = true; 
        document.getElementById("btnprint").hidden = true; 
        document.getElementById("btnback").hidden = true; 
        window.print(); 
        document.getElementById("btnback").hidden = false; 
        document.getElementById("btnprint").hidden = false; 
        document.getElementById("btnpie").hidden = false;  
        document.getElementById("btnline").hidden = false; 
        document.getElementById("btnbar").hidden = false;  
        document.getElementById("btngauge").hidden = false;  
      } 

      ChartPie(){ 
         this.apiService.typeChart = 'PieChart'; 
         this.getChart(); 
      } 

      ChartLine(){ 
         this.apiService.typeChart = 'LineChart'; 
         this.getChart(); 
      } 

      ChartBar(){
         this.apiService.typeChart = 'BarChart'; 
         this.getChart();
      } 

      Chartgauge(){
         this.apiService.typeChart = 'Gauge'; 
         this.getChart(); 
      } 

      Voltar(){  
         this.router.navigate(['Relatoriopermissoes_tabelas'], {skipLocationChange: true, fragment: 'top'}); 
         this.getChart(); 
       } 
} 
