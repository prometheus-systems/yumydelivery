import { Component, OnInit , ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MaterialModules} from '../materials-modules';
import { environment } from '../../environments/environment'; 

import { DialogService } from '../shared/dialog.service';
import { NotificationService } from '../shared/notification.service';
import { TranslateService }   from './../shared/translate.service';
import { MaskApplierService } from 'ngx-mask';
import { pedidosService } from '../services/pedidos.service';
import Swal from 'sweetalert2';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html'
})

export class PrincipalComponent implements OnInit {
  NomeSistema = environment.Sistema;
  TipoGrupo = environment.TipoGrupo;
  pedido:any[];


  constructor(private authService: SocialAuthService, private apipedidos:pedidosService,private router: Router , private _translate: TranslateService, private materialmodule: MaterialModules,private dialogService: DialogService, private notification:NotificationService) { }

  ngOnInit() {   
  }

  pedidos(){
    this.router.navigate(['Formpedidos'], {skipLocationChange: true, fragment: 'top'});
  }

  status(){
     this.apipedidos.getStatus().subscribe(dados=>{
      console.log('pedido',dados); 
      this.pedido = dados; 
      if ((Array.isArray(this.pedido))&&(this.pedido.length)) {
        Swal.fire('Status!','Produto: '+this.pedido[0].produto+' Status: '+this.pedido[0].status,"success");
      }
      
    }) ;

    
  }

  cozinha(){
    this.router.navigate(['PedidosCozinha'], {skipLocationChange: true, fragment: 'top'}); 
    
  }

  geral(){
    this.router.navigate(['PedidosGeral'], {skipLocationChange: true, fragment: 'top'}); 
    
  }

}