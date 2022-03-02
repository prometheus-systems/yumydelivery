
import { Component, OnInit, ElementRef} from '@angular/core'; 
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; 
import {Router} from "@angular/router"; 
import { TranslateService }   from './../../shared/translate.service'; 
import {checklist_pedidosService} from "../../services/checklist_pedidos.service"; 
import { DialogService } from '../../shared/dialog.service';
import { NotificationService } from '../../shared/notification.service';
import { AuthService } from "../../auth/auth.service";
import { environment } from 'src/environments/environment';

@Component({  
  selector: 'app-aptochild-checklist_pedidos',
  templateUrl: './aptochild-checklist_pedidos.component.html',  
})  

export class Aptochildchecklist_pedidosComponent implements OnInit { bounce:any; 
  Device = environment.Device; 
  isValid=true;  
  tem_total:boolean=true; 
  arrGrupo:any[]=[];  
  displayedColumns: string[] = ['select',]; 
  controls: FormArray; 
  status_color:string; 

  highlight(element: ElementRef) {  
    element.nativeElement.style.backgroundColor.highlighted = !element.nativeElement.style.backgroundColor.highlighted; 
  }  

  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router  
            , public apiService: checklist_pedidosService   
            , private authService: AuthService 
            , private _translate: TranslateService 
            , private dialogService: DialogService  
            , private notification:NotificationService)  {}  

  isAllSelected() { 
    const numSelected = this.apiService.selectionChild.selected.length; 
    const numRows = this.apiService.dataSourceChild.data.length; 
    return numSelected === numRows; 
  }  

  masterToggle() { 
    this.isAllSelected() ? 
        this.apiService.selectionChild.clear() :  
        this.apiService.dataSourceChild.data.forEach(row => this.apiService.selectionChild.select(row)); 
  } 

  checkboxLabel(row?: any): string {   
    if (!row) {   
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.apiService.selectionChild.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`; 
  }  

  ngOnInit() { //INICIAR PAGINA DE LISTA  
    const toGroups =this.apiService.getarrItenschecklist_pedidos.value.map(entity => { 
      return new FormGroup({    
      },{updateOn: "blur"}); 
    }); 

    console.log('grupo',toGroups); 
    this.controls = new FormArray(toGroups); 
  } 

  updateField(index, field) { 
    const control = this.getControl(index, field); 
    if (control.valid) { 
      this.apiService.updateChild(index,field,control.value);
    } 
   }

  getControl(index, fieldName) {  
    const a  = this.controls.at(index).get(fieldName) as FormControl; 
    return this.controls.at(index).get(fieldName) as FormControl; 
  } 

  onGravar(){ 
    this.router.navigate(['Apontamentochecklist_pedidos'], {skipLocationChange: true, fragment: 'top'}); 
  }  

  onCancelar(){ 
    this.router.navigate(['Apontamentochecklist_pedidos'], {skipLocationChange: true, fragment: 'top'});  
  }  

  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM  
    this.isValid = true;  
    for(let x=0;x<this.apiService.arrItenschecklist_pedidos.length;x++){ 
    }  
    return this.isValid; 
  }   
  //FIM - FUNCOES DOS ITENS (FILHO/DETALHE) 

  ngOnDestroy() {
  }  
} //FIM - CONSTRUTOR 
