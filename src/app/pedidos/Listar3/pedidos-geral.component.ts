import { Component, OnInit , ViewChild} from '@angular/core'; 
import {Router,ActivatedRoute} from "@angular/router"; 
//import { TranslateService }   from '../../shared/translate.service'; 
import {pedidos} from "../../model/pedidos.model"; 
import {pedidosService} from "../../services/pedidos.service"; 
import {MatTableDataSource} from '@angular/material/table'; 
import {MaterialModules} from '../../materials-modules'; 
import { DialogService } from '../../shared/dialog.service'; 
import { NotificationService } from '../../shared/notification.service'; 
import { first } from "rxjs/operators"; 
import { AuthService } from "../../auth/auth.service"; 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import { environment } from "../../../environments/environment";  
import { fadeInUp} from 'ng-animate'; 
import { trigger, transition, useAnimation } from '@angular/animations'; 
import { NgForm } from '@angular/forms'; 
@Component({ 
  selector: 'app-geral-pedidos', 
  templateUrl: './pedidos-geral.component.html', 
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
 
export class PedidosGeralComponent implements OnInit {bounce:any; 
  Device = environment.Device; 

  arrpedidosbalcao: any[]=[];
  baseUrl = environment.URLBase;  
  id_seller:string;
  temPedidos:boolean=false;
  temPedidosYumy:boolean=false;
  temPedidosBalcao:boolean=false;
  temResultado:boolean=false;
  
  interval;
 
 
  // CONSTRUTOR E VARIAVES PRIVADAS 
  constructor(private router: Router   
            , private myrouter: ActivatedRoute
            , public apiService: pedidosService  
            , private materialmodule: MaterialModules  
             
            , private dialogService: DialogService  
            , private authService: AuthService 
            , private dialog : MatDialog  
            , private notification:NotificationService) { } 
  
  ngOnInit() { //INICIAR PAGINA DE LISTA 
    this.resetForm();


    this.interval = setInterval(() => {this.onVerificar()},300000);
    
  }  

  

  play() { 
    var audio = new Audio( 
      'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3'); 
      audio.play(); 
  }

  
  resetForm(form?: NgForm) {//NOVO REGISTRO RESET DADOS E COLOCAR VALORES PADROES 
    if (form = null) 
      form.resetForm(); 
      this.apiService.formParRel = { 
        data1: new Date(),
        data2: new Date(),
      }; 
  }

  onVerificar(){
    this.onPronto();

  }

  btn_saiu(id,registro){
    
    this.apiService.getPedidosAPIGrava(id,'RETIRADO') 
          .subscribe( data => {             
            console.log(data);
            if (data[0].retorno=='OK'){
              //debugger
              registro.status = 'RETIRADO';
            }           

          }) 
  }

  btn_entregue(id,registro){
    //debugger
    let i = this.arrpedidosbalcao.findIndex(u => u === registro);  
    this.apiService.getPedidosAPIGrava(id,'ENTREGUE') 
          .subscribe( data => { 
            console.log(data);
            if (data[0].retorno == 'OK'){
              registro.status = 'ENTREGUE';
              this.arrpedidosbalcao.splice(i, 1); 
            }
    }) 
  }
 
  
  onPronto(): void { //CHAMA SERVICEparaEXCLUSÃO NO BACKEND

    this.apiService.getPedidosCozinha('P') 
      .subscribe( data => {
        if ((Array.isArray(data) && data.length)&&(Array.isArray(this.arrpedidosbalcao) && this.arrpedidosbalcao.length)){ 
          if (data.length>this.arrpedidosbalcao.length){
              this.play();
              this.notification.success('Entrou novo Pedido!');             
          }
          this.temResultado=true;
        }else{
          this.temResultado=false;
          this.notification.success('Nenhum pedido encontrado!')
        }
        this.arrpedidosbalcao = data; 
        console.log('geral',data);
        
    });

  }
  
} //FIM - CONSTRUTOR

export class pedidosGeral {  
  cod_produto:string;
  codigo: string;
  datahora: Date;
  descricao: string;
  endereco: string;
  imagem: string;
  nome: string;
  observacoes: string;
  pagamento: string;
  pago: boolean;
  produto: string;
  pronto: Date;
  qtde: number;
  retirou: Date;
  status: string;
  total: number;
}