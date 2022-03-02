
import {Component, OnInit, Inject} from "@angular/core";  
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"; 
import { environment } from "../../environments/environment"; 
import { TranslateService }   from './../shared/translate.service'; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
@Component({ 
  selector: 'app-loadhelp-pedidos', 
  templateUrl: './loadhelp-pedidos.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class pedidosHelpComponent implements OnInit { bounce:any;
  baseUrl = environment.URLBase; 
  Device = environment.Device; 
  tabela:string; 
  texto_help:string; 
constructor(  
  @Inject(MAT_DIALOG_DATA) 
    public data 
   , private _translate: TranslateService 
    ,public dialogRef: MatDialogRef<pedidosHelpComponent>) { }  
  
  ngOnInit() { 
    this.tabela = this.data.tabela; 
  } 
 
  idioma(){
    console.log(this._translate.currentLang) 
   return  this._translate.currentLang; 
  }  
}  
