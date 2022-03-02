import {Component } from '@angular/core'; 
import {Router} from "@angular/router"; 
import {grupo_usuariosService} from "../../services/grupo_usuarios.service"; 
@Component({ 
  selector: 'app-grafico-grupo_usuarios', 
  templateUrl: 'grafico-grupo_usuarios.component.html',  
}) 

export class Graficogrupo_usuariosComponent  {  
   constructor(public apiService: grupo_usuariosService,private router: Router)  { } 
     title = 'GRÁFICO DE GRUPO DE USUÁRIOS'; 
     type = 'PieChart'; 
     data = this.getData(); 
     columnNames = ['Descrição', 'total']; 
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
      this.columnNames = ['Descrição', 'total']; 
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
         this.router.navigate(['Relatoriogrupo_usuarios'], {skipLocationChange: true, fragment: 'top'}); 
         this.getChart(); 
       } 
} 
