import {Component, OnInit, Inject} from "@angular/core"; 
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import {NgForm } from "@angular/forms"; 
import {map} from "rxjs/operators"; 
import { environment } from "../../environments/environment"; 
import {DialogService} from '../shared/dialog.service'; 
import { pedidosService } from '../services/pedidos.service';
@Component({ 
  selector: 'app-loadhistorico', 
  templateUrl: './historico.component.html', 
}) 
 
export class Loadhistorico implements OnInit { 
  baseUrl = environment.URLBase;   
  fullimage:string; 
  Device = environment.Device;
constructor(  
  @Inject(MAT_DIALOG_DATA) 
    public data   
    , private dialogService: DialogService 
    , public apiService: pedidosService 
   ,public dialogRef: MatDialogRef<Loadhistorico>) { }  

  
  ngOnInit() {  

    console.log('data',this.data);
  }

  
  
  


}
 //FIM - CONSTRUTOR
