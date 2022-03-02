import {Component } from '@angular/core'; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router} from "@angular/router"; 
//import { TranslateService }   from './../../shared/translate.service'; 
import {sintetico_por_dataService} from "../../services/sintetico_por_data.service"; 
import { environment } from "../../../environments/environment"; 
@Component({ 
  selector: 'app-grafico-sintetico_por_data', 
  templateUrl: 'grafico-sintetico_por_data.component.html',  
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 

export class Graficosintetico_por_dataComponent  { bounce:any; 
   Device = environment.Device; 
   constructor(public apiService: sintetico_por_dataService
     
     ,private router: Router)  { } 
     title = 'GRÁFICO SINTÉTICO POR CATEGORIA '; 
     type = 'PieChart'; 
     data = this.getData(); 
     columnNames = ['Categoria', 'Subtotal','Quantidade']; 
     options = { 
     };  
     width = 700; 
     height = 700; 
   getData(){ 
      let result:any[]=[]; 
      for (let i=0;i<this.apiService.DataChart.length;i++){ 
         result.push([this.apiService.DataChart[i].grupo,this.apiService.DataChart[i].ite_subtotal,this.apiService.DataChart[i].ped_qtde]); 
      }  
      console.log(result); 
      return result; 
   } 

   getChart(){ 
      this.type = this.apiService.typeChart; 
      this.data = this.getData(); 
      this.columnNames = ['Categoria', 'Subtotal','Quantidade']; 
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
         this.router.navigate(['relatoriosintetico_por_data']/*, {skipLocationChange: true, fragment: 'top'}*/); 
         this.getChart(); 
       } 
} 
