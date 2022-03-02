
import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { TranslateService }   from './../../shared/translate.service'; 
import {checklist_pedidosService} from "../../services/checklist_pedidos.service"; 
import { environment } from 'src/environments/environment';

@Component({ 
  selector: 'app-aptotime-checklist_pedidos', 
  templateUrl: './aptotime-checklist_pedidos.component.html',
}) 

export class AptoTimechecklist_pedidosComponent implements OnInit {
  Device = environment.Device; 
  arrGrupo:any[]=[];

  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router 
            , private _translate: TranslateService 
            , public apiService: checklist_pedidosService  ) { } 

    ngOnInit() { //INICIAR PAGINA DE LISTA  
  }  

  Voltar(){ 
    this.router.navigate(['Apontamentochecklist_pedidos'], {skipLocationChange: true, fragment: 'top'});  
  } 
} //FIM - CONSTRUT 
