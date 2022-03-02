import {Component, OnInit, Inject} from "@angular/core"; 
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import {NgForm } from "@angular/forms"; 
import {map} from "rxjs/operators"; 
import { environment } from "../../environments/environment"; 
import {DialogService} from '../shared/dialog.service'; 
import { pedidosService } from '../services/pedidos.service';
@Component({ 
  selector: 'app-loadendereco', 
  templateUrl: './loadendereco.component.html', 
}) 
 
export class LoadEndereco implements OnInit { 
  baseUrl = environment.URLBase;   
  fullimage:string; 
  Device = environment.Device;
constructor(  
  @Inject(MAT_DIALOG_DATA) 
    public data   
    , private dialogService: DialogService 
    , public apiService: pedidosService 
   ,public dialogRef: MatDialogRef<LoadEndereco>) { }  

  
  ngOnInit() {  

    console.log('data',this.data);
  }

  onDeleteItensitens(ite_codigo: number, i: number) { //DELETAR ITEM NO FORM  
    
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        if (ite_codigo != null) 
          this.apiService.formData.DeletedItensitensIDs += ite_codigo+","; 
        this.apiService.Itemsitens[i].item_status = 'D';
        //debugger 
        this.apiService.Itemsitens.splice(i, 1); 
        this.apiService.atualizarTotalGeral();
      } 
    }); 
  }
  


}
 //FIM - CONSTRUTOR
