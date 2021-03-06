import {Directive,ElementRef,Input,OnInit} from '@angular/core';
declare var google:any;
declare var googleLoaded:any;
@Directive({
  selector: '[GoogleChart]'
})
export class GoogleChartComponent implements OnInit {
  public _element:any;
  @Input('chartType') public chartType:string;
  @Input('chartOptions') public chartOptions: Object;
  @Input('chartData') public chartData: Object;
  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }
  ngOnInit() {
    google.load("visualization", "1", {packages:["corechart"]});
    //google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.drawGraph);
  }

  drawGraph = () => {    
    function drawChart() {
      var wrapper;
     // var data = google.visualization.arrayToDataTable([
      wrapper = new google.visualization.ChartWrapper({
        chartType: this.chartType,
        dataTable:this.chartData ,
        options: this.chartOptions || {},
        containerId: this._element.id
      });
      wrapper.draw();
    }
  }
}