
import {Component, OnInit, ElementRef} from '@angular/core';  
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';  
import { TranslateService }   from './../../shared/translate.service'; 
import {Router} from "@angular/router"; 
import {checklist_pedidosService} from "../../services/checklist_pedidos.service";  
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { AuthService } from "../../auth/auth.service";  
import { first } from 'rxjs/operators';  
import { environment } from 'src/environments/environment';

@Component({  
  selector: 'app-apontamento-checklist_pedidos', 
  templateUrl: './apontamento-checklist_pedidos.component.html',  
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 

export class Apontamentochecklist_pedidosComponent implements OnInit { bounce:any; 
  Device = environment.Device; 
  isValid=true; 
  tem_total:boolean=true;  
  arrGrupo:any[]=[]; 
  displayedColumns: string[] = [
 'select', 
'ped_datahora','ped_datapronto'
];    
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
    const numSelected = this.apiService.selection.selected.length;   
    const numRows = this.apiService.dataSource.data.length;  
    return numSelected === numRows; 
  }   

  masterToggle() { 
    this.isAllSelected() ?  
        this.apiService.selection.clear() :  
        this.apiService.dataSource.data.forEach(row => this.apiService.selection.select(row));  
  } 

  checkboxLabel(row?: any): string {  
    if (!row) {  
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;   
    }  
    return `${this.apiService.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;  
  }   

  ngOnInit() { //INICIAR PAGINA DE LISTA  
    const toGroups =this.apiService.getarrchecklist_pedidos.value.map(entity => { 
      return new FormGroup({ 
      },{updateOn: "blur"});  
    });
    this.controls = new FormArray(toGroups);   
    this.apiService.TotalGeral();  
    this.apiService.GetSelected(); 
  }  

  updateField(index, field) {    
    const control = this.getControl(index, field);   
    if (control.valid) { 
      this.apiService.update(index,field,control.value);   
    }   
  }  

  getControl(index, fieldName) {
    const a  = this.controls.at(index).get(fieldName) as FormControl; 
    return this.controls.at(index).get(fieldName) as FormControl; 
  }   

  Voltar(){   
    this.router.navigate(['Filtroaptochecklist_pedidos'], {skipLocationChange: true, fragment: 'top'}); 
  } 

  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM 
    this.isValid = true; 
    for(let x=0;x<this.apiService.arrchecklist_pedidos.length;x++){ 
    }  
    return this.isValid;   
  }  

  onGravar() { //ENVIANDO DADOS DO FORMparaSERVICE CHAMAR A FUNCAOparaGRAVAR NO BACKEND  
    if (this.validateForm()) {   
      this.apiService.Gravarchecklist_pedidos()  
        .pipe(first())  
        .subscribe(  
           data => {  
             console.log('response-update',data); 
             this.router.navigate(['Inicial'], {skipLocationChange: true, fragment: 'top'});
           }, 
           error => {  
             console.log('erro:',error);   
        }); 
    }else{ 
      this.notification.success('Favor preencher os campos obrigatórios!') 
    }  
  } 

  getTime(vDtIni:Date,vDtNow:Date){  
    let day1 = vDtNow.getDate(); 
    let month1 = vDtNow.getMonth(); 
    let year1 = vDtNow.getFullYear(); 
    let hour1 = vDtNow.getHours(); 
    let minute1 = vDtNow.getMinutes(); 
    let day2 = vDtIni.getDate(); 
    let month2 = vDtIni.getMonth();  
    let year2 = vDtIni.getFullYear();  
    let hour2 = vDtIni.getHours(); 
    let minute2 = vDtIni.getMinutes(); 
    let time = (((hour1-hour2)*60)+(minute1-minute2)) + (((day1-day2)*1440)+((month1-month2)*43200)+((year1-year2)*518400)); 
    return time;   
  }   

  ConverteData(data:string){ 
   let dia:string='';  
   let mes:string='';  
   let ano:string='';  
   let hora:string = '';  
   let min:string = ''; 
   let seg:string = '';  
   if (data.indexOf('-')>0){  
     dia = data.substr(8,2);  
     mes = data.substr(5,2); 
     ano = data.substr(0,4);  
     hora = data.substr(11,2); 
     min = data.substr(14,2); 
     seg = data.substr(17,2); 
   }else{ 
     dia = data.substr(0,2);  
     mes = data.substr(3,2); 
     ano = data.substr(6,4); 
     hora = data.substr(12,2); 
     min = data.substr(15,2); 
     seg = data.substr(18,2); 
   }   
   let mydate:Date; 
   mydate = new Date; 
   mydate.setDate(+dia); 
   mydate.setMonth(+mes-1); 
   mydate.setFullYear(+ano); 
   mydate.setHours(+hora); 
   mydate.setMinutes(+min); 
   mydate.setSeconds(+seg); 
   return mydate; 
 }  


  onCancelar() { 
    this.router.navigate(['Filtroaptochecklist_pedidos'], {skipLocationChange: true, fragment: 'top'}); 
  } 

  ngOnDestroy() { 
  }  
} //FIM - CONSTRUTOR 
