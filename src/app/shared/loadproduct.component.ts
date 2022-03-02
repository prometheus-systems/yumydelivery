import {Component, OnInit, Inject} from "@angular/core"; 
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import {NgForm } from "@angular/forms"; 
import {map} from "rxjs/operators"; 
import { environment } from "../../environments/environment"; 
@Component({ 
  selector: 'app-loadproduct', 
  templateUrl: './loadproduct.component.html', 
}) 
 
export class LoadProduct implements OnInit { 
  baseUrl = environment.URLBase;   
  fullimage:string; 
constructor(  
  @Inject(MAT_DIALOG_DATA) 
    public data   
   ,public dialogRef: MatDialogRef<LoadProduct>) { }  

  
  ngOnInit() {  

    console.log('data',this.data);
  }
  


}
 //FIM - CONSTRUTOR
