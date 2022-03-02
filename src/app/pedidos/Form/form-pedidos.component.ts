 
import {Component, OnInit} from '@angular/core'; 
import { fadeInUp} from 'ng-animate';  
import { trigger, transition, useAnimation } from '@angular/animations';  
import {Router,ActivatedRoute} from "@angular/router"; 
import { TranslateService }   from '../../shared/translate.service'; 
import {pedidos} from "../../model/pedidos.model"; 
import {NgForm} from "@angular/forms"; 
import {first, skipWhile} from "rxjs/operators"; 
import {pedidosService} from "../../services/pedidos.service"; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'; 
import { environment } from "../../../environments/environment"; 
import {pedidosHelpComponent} from '../../shared/loadhelp-pedidos.component'; 
import {itensComponent} from "../../itens/itens.component"; //componete tabela filha/detalhe
import 'rxjs/add/observable/of';
//importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
//FIM - importar OS MODES E SERVICES DAS CHAVES ESTRANGEIRAS 
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import {DialogService} from '../../shared/dialog.service'; 
import {Location} from '@angular/common'; 
import {NotificationService} from '../../shared/notification.service'; 
import { usuariosService } from 'src/app/services/usuarios.service';
import { usuarios } from 'src/app/model/usuarios.model';
import { vendedoresService } from 'src/app/services/vendedores.service';
import { vendedores } from 'src/app/model/vendedores.model';
import { AuthService } from 'src/app/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MatStepper } from '@angular/material/stepper';
import {LoadProduct} from '../../shared/loadproduct.component'; 
import {LoadCarrinho} from '../../shared/loadcarrinho.component'; 
import {LoadEndereco} from '../../shared/loadendereco.component'; 
import {Loadhistorico} from '../../shared/historico.component'; 
import {LoadSabores} from '../../shared/sabores.component'; 
import { cardapio } from 'src/app/model/cardapio.model';
import { int } from 'aws-sdk/clients/datapipeline';
import { HereService } from "../../services/here.service";
import { PaymentCompenent } from 'src/app/shared/payment.component';
import { ElementsComponent } from 'src/app/shared/elements.compent';

import Swal from 'sweetalert2';
import { GeocoderRequest} from '@agm/core';
@Component({ 
  selector: 'app-form-pedidos', 
  templateUrl: './form-pedidos.component.html', 
  styleUrls: ['./vendas.css'],
  animations: [trigger('bounce', [transition('* => *', useAnimation(fadeInUp,{params: {timing: 0.2,}}))])] 
}) 
export class FormpedidosComponent implements OnInit { bounce:any; 
  Device = environment.Device; 
  TipoGrupo = environment.TipoGrupo;
  files: Set<File>; 
  fileNames:any[]=[]; 
  arrusuarios:Observable<usuarios[]>;
  arrSellers:any[];
  private arrProducts:any[];
  arrProductsFiltred:any;
  arrCategories:any[];
  arrvendedores:Observable<vendedores[]>;
  dia_ini:number=0;
  dia_fin:number=0;
  hor_ini:number=0;
  hor_fin:number=0;
  min_ini:number=0;
  min_fin:number=0;
  nohorario:boolean=true;
  endereco:string;
  atual:string=environment.Endereco;
  temEndereco:boolean=false;
  isValid: boolean = true; 
  baseUrl = environment.URLBase;  
  categorie:string;
  comprador = environment.NomeUsuario;


  //DECLARACAO DO CONSTRUTOR E SUAS VARIAVEIS PRIVADAS E PASSAGEM DOS SERVICES 
  constructor( 
     private router: ActivatedRoute  
   , private authService: AuthService
   , private myrouter: Router 
   , private _translate: TranslateService   
   , public apiService: pedidosService 
   , private dialog: MatDialog 
   , private dialogService: DialogService 
   , private notification:NotificationService 
   , private apiusuarios:usuariosService 
   , private apivendedores:vendedoresService 
   ,private cookieservice:CookieService
   ,private here: HereService
  ) { } 
  //FUNCAO DE INICIALIZACAO AO CHAMAR A ROTA DA PAGINA FAZ LOAD DOS DADOS E ARRAY DE CHAVES ESTRANGEIRAS
  selCategories(value,stepper: MatStepper){
    //debugger
    this.categorie = value;
    this.arrProductsFiltred = this.arrProducts.filter(x=>x.cat_codigo === value);
    console.log('pro filter',this.arrProductsFiltred);
    stepper.next();
  }



  editarEndereco(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = true; 
    if (this.Device == 'M' || this.Device == 'T'){
      dialogConfig.width = "110%"; 
    }else{
      dialogConfig.width = "50%"; 
    }
    dialogConfig.data = [];
    this.dialog.open(LoadEndereco, dialogConfig).afterClosed().subscribe(res => {  });

  }

  public getAddressFromLatLng() {
    debugger
    this.apiService.getEndereco(this.apiService.lat,this.apiService.lng).subscribe(endereco=>{
      console.log('endereco',endereco);
      let numero   = endereco.results[0].address_components[0].long_name;
      let _endereco = endereco.results[0].address_components[1].long_name;
      let bairro   = endereco.results[0].address_components[2].long_name;
      let cidade   = endereco.results[0].address_components[3].long_name;
      let estado   = endereco.results[0].address_components[4].long_name;
      let cep      = endereco.results[0].address_components[6].long_name;
      let lat      = endereco.results[0].geometry.location.lat;
      let lng      = endereco.results[0].geometry.location.lng;
      this.endereco = _endereco+', '+numero+', '+bairro+', '+cidade+', '+estado+', CEP:'+cep;
      Swal.fire('Status!',this.endereco,"success");
      this.temEndereco = true;
      this.endereco='OUTRO';

      this.apiService.itemsEndereco = {
        end_bairro:bairro,
        end_cep:cep,
        end_cidade:cidade,
        end_complemento:null,
        end_endereco:_endereco,
        end_numero:numero,
        end_referencia:null,
        end_uf:estado,
        end_lat:lat,
        end_long:lng };
    })

        //this.loading = false;
        //this.ref.detectChanges();  
    //this.getPosition();
    /*
    if(this.position != "" && this.position != undefined) {
      this.here.getAddressFromLatLng(this.position).then(result => {
          this.locations = <Array<any>>result;
          Swal.fire('Status!',result[0].Address.Label,"success");
      }, error => {
          console.error(error);
      });
    }*/
  }

  categorias(stepper: MatStepper){
    this.apiService.tela = 0;

    stepper.previous();

  }

  onSeller(value,horario){

   
    //debugger
    if ((this.apiService.vendedor>0 && this.apiService.vendedor!=value) && this.apiService.Itemsitens.length>0){
      this.apiService.temVendedor = true;
      this.notification.success('Você já selecionou um vendedor para esse pedido, finalize o mesmo e inicie com outro vendedor!'); 
    }
    this.apiService.vendedor = value;
    this.apiService.formData.ven_codigo = value;
    this.arrProductsFiltred = this.arrProducts.filter(x=>x.ven_codigo === value);
    if (!this.onHorario(horario)){
      let strhorario = 'DE '+horario.substr(0,3)+' Á '+horario.substr(3,3)+' DAS '+horario.substr(6,2)+':'+horario.substr(8,2)+' ATÉ '+horario.substr(10,2)+':'+horario.substr(12,2);

      this.notification.success('Vendedor está fora do horário de atendimento "'+strhorario+'" ! ') 
      this.nohorario = false;
    }else{
      this.nohorario = true;
    }
    console.log('pro filter',this.arrProductsFiltred);
  }

  onHorario(horario){
   //////debuger
    let strdia_ini = horario.substr(0,3).toUpperCase();
    let strdia_fin = horario.substr(3,3).toUpperCase();
    switch(strdia_ini) { 
      case 'SEG': { 
         this.dia_ini = 2;
         break; 
      } 
      case 'TER': { 
        this.dia_ini = 3;
         break; 
      } 
      case 'QUA': { 
        this.dia_ini = 4;
         break; 
      } 
      case 'QUI': { 
        this.dia_ini = 5;
         break; 
      } 
      case 'SEX': { 
        this.dia_ini = 6;
         break; 
      } 
      case 'SAB': { 
        this.dia_ini = 7;
         break; 
      } 
      case 'DOM': { 
        this.dia_ini = 1;
         break; 
      } 
    } 

    switch(strdia_fin) { 
      case 'SEG': { 
        this.dia_fin = 2;
        break; 
      } 
      case 'TER': { 
        this.dia_fin = 3;
        break; 
      } 
      case 'QUA': { 
        this.dia_fin = 4;
        break; 
      } 
      case 'QUI': { 
        this.dia_fin = 5;
        break; 
      } 
      case 'SEX': { 
        this.dia_fin = 6;
        break; 
      } 
      case 'SAB': { 
        this.dia_fin = 7;
        break; 
      } 
      case 'DOM': { 
        this.dia_fin = 1;
        break; 
      } 
    } 

    this.hor_ini = parseInt(horario.substr(6,2));
    this.min_ini = parseInt(horario.substr(8,2));
    this.hor_fin = parseInt(horario.substr(10,2));
    this.min_fin = parseInt(horario.substr(12,2));
    if (this.min_fin==0){
      this.min_fin = 59;
    }
    let mydate = new Date; 
    let diasem:number = mydate.getDay()+1;  
    let hora:number = mydate.getHours();
    let min:number = mydate.getMinutes();

    let dias:boolean;
    if (diasem >= this.dia_ini && diasem <= this.dia_fin){
      dias = true;
    }else{
      dias = false;
    } 
    let horas:boolean;
    if (hora >= this.hor_ini && hora <= this.hor_fin){
      horas = true;
    }else{
      horas = false;
    } 

    let minutos:boolean;
    if (min >= this.min_ini && min <= this.min_fin){
      minutos = true;
    }else{
      minutos = false;
    } 

    return dias && horas && minutos;
  }

  pagamento(total:number){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true;  
    dialogConfig.disableClose = true; 
    if (this.Device == 'M' || this.Device == 'T'){
      dialogConfig.width = "110%"; 
    }else{
      dialogConfig.width = "50%"; 
    }
    dialogConfig.data = { total}; 
    this.dialog.open(ElementsComponent, dialogConfig).afterClosed().subscribe(res => { }
    );   
  }


  onPrincipal(stepper: MatStepper){
    if (this.apiService.tela>0){
      stepper.next();
    }
  }

  ngOnInit() {
   //debuger
   this.notification.success('Bem vindo '+this.comprador+'!'); 
   if (this.atual == '' || this.atual == null || this.atual == undefined){
    this.temEndereco = false;
    this.endereco = 'OUTRO';
   }else{
    this.temEndereco = true;
    this.endereco = 'ATUAL';
   }
    this.TipoGrupo = environment.TipoGrupo;

    this.TipoGrupo = environment.TipoGrupo;
   let endatual = this.atual.split(', ');
   let estado = this.atual.split('-'); 
   this.apiService.itemsEndereco = {  
    end_bairro:endatual[2], 
    end_cep:null, 
    end_cidade:endatual[3], 
    end_complemento:null, 
    end_endereco:endatual[0],  
    end_numero:endatual[1], 
    end_referencia:null, 
    end_uf:estado[0],
    end_lat:null,
    end_long:null };

    this.apiService.getSellers().subscribe( dados => {  
      console.log('sellers',dados); 
      this.arrSellers = dados; 
    });

    this.apiService.getCategories().subscribe( dados => {  
      console.log('categories',dados); 
      this.arrCategories = dados; 
    });



    this.apiService.gethistPedidos().subscribe( dados => { 
      
      console.log('orders',dados); 
      this.apiService.arrhistPedidos = dados; 
    });
    
    this.apiService.getProducts().subscribe( dados => { 

      console.log('products',dados); 
      this.arrProducts = dados; 
    }); 

    this.arrusuarios = this.apiusuarios.getusuarios().pipe( 
      map(dados => { 
      console.log(dados); 
      return dados; 
    })); 

    this.arrvendedores = this.apivendedores.getvendedores().pipe( 
      map(dados => { 
      console.log(dados); 
       return dados; 
    })); 
    //************************************************ 
    //INICIO - PERMISSOES 
    this.apiService.formDisabled = { 
        ped_codigo:false,   
        ped_datahora:false,   
        ped_datapronto:false,   
        ped_entregue:false,   
        ped_forma_pagto:false,   
        ped_retirado:false,   
        ped_status:false,   
        ped_tipo_pagto:false,   
        ped_total:false,   
        ped_usarbonificacao:false,   
    }; 
    this.apiService.formVisible = { 
        ped_codigo:true,   
        ped_datahora:true,   
        ped_datapronto:true,   
        ped_entregue:true,   
        ped_forma_pagto:true,   
        ped_retirado:true,   
        ped_status:true,   
        ped_tipo_pagto:true,   
        ped_total:true,   
        ped_usarbonificacao:true,   
    }; 
    this.apiService.formVisible_itens = { 
        car_codigo:true,   
        ite_codigo:true,   
        ite_preco:true,   
        ite_qtde:true,   
        ite_subtotal:true,   
    }; 
    //FIM - PERMISSOES 
    //************************************************ 
    //VERIFICA SE A ROTA TEM parametro E EDICAO (FAZ LOAD DOS DADOS DO REGISTRO SELECIONADO E ITENS), SENAO E INSERCAO 
    let id = this.router.snapshot.paramMap.get('id'); 
    if (id){ 
      this.apiService.getpedidosId(id).subscribe( data => { 
        data[0].status_reg = 'U'; 
        this.apiService.formData = data[0]; 
        this.apiService.formData.status_reg = 'U'; 
        
        this.apiService.Itemsitens = data[0].Itemsitens; 
        console.log('itens',data[0].Itemsitens); 
      });  
    }else{  
      this.resetForm(); 
    }  
    //LOAD DOS ARRAY CHAVE ESTRANGEIRA 
  }  
  applyFilter(value){

    this.arrProductsFiltred = this.arrProducts.filter(item => {
      if (item.car_nome.toString().toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        return true;
      }
    return false;
}
);
  }
  convertHtml(value){
    let doc = new DOMParser().parseFromString(value, 'text/html');        
    return doc.documentElement.textContent;
  }

  carrinho(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = true; 
    if (this.Device == 'M' || this.Device == 'T'){
      dialogConfig.width = "110%"; 
    }else{
      dialogConfig.width = "50%"; 
    }
    dialogConfig.data = [];
    if (Array.isArray(this.apiService.Itemsitens) && this.apiService.Itemsitens.length){ 
      for (let i=0;i<this.apiService.Itemsitens.length;i++){
        let registro = {'ite_codigo':  this.apiService.Itemsitens[i].ite_codigo
                      , 'ped_codigo':  this.apiService.Itemsitens[i].ped_codigo
                      , 'car_codigo':  this.apiService.Itemsitens[i].car_codigo
                      , 'car_nome':    this.apiService.Itemsitens[i].car_nome
                      , 'ite_preco':   this.apiService.Itemsitens[i].ite_preco
                      , 'ite_qtde':    this.apiService.Itemsitens[i].ite_qtde
                      , 'ite_subtotal':this.apiService.Itemsitens[i].ite_subtotal
                      , 'item_status': this.apiService.Itemsitens[i].item_status
                     };
                     
        dialogConfig.data.push(registro);
      }
      this.dialog.open(LoadCarrinho, dialogConfig).afterClosed().subscribe(res => {  });
    }else{
      this.notification.success('Não existem items no Carrinho!') 

    }  
  }

  sabores(car_codigo){
    this.apiService.getSabores(car_codigo).subscribe( dados => {  
      console.log('sabores',dados); 
      this.apiService.arrSabores = dados; 
    });
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = true; 
    if (this.Device == 'M' || this.Device == 'T'){
      dialogConfig.width = "110%"; 
    }else{
      dialogConfig.width = "50%"; 
    }
    dialogConfig.data = [];
    this.dialog.open(LoadSabores, dialogConfig).afterClosed().subscribe(res => {
      this.apiService.itemsSabores = this.apiService.arrSabores.filter(x=>x.sab_select===true);
      console.log('sabores',this.apiService.arrSabores);
      console.log('selecionados',this.apiService.itemsSabores)  
    });
  }

  perfil(){
    //debugger
    this.apiusuarios.Formato='C';
    environment.Formato = 'C';
    this.myrouter.navigate(['Formusuarios',environment.CodigoUsuario], {skipLocationChange: true, fragment: 'top'}); 
  }
  pedidos(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = true; 
    if (this.Device == 'M' || this.Device == 'T'){
      dialogConfig.width = "110%"; 
    }else{
      dialogConfig.width = "50%"; 
    }
    dialogConfig.data = [];
    //debugger
    if (Array.isArray(this.apiService.arrhistPedidos) && this.apiService.arrhistPedidos.length){ 

      this.dialog.open(Loadhistorico, dialogConfig).afterClosed().subscribe(res => {  });
    }else{
      this.notification.success('Não existem histórico de Compras!') 

    }  
  }

  inicio(stepper: MatStepper){
    this.arrProductsFiltred = [];
    this.resetForm();
    this.apiService.Itemsitens = [];
    stepper.previous();


  }

  Finalizar(stepper: MatStepper){ 
    this.getPosition();

    this.apiService.temVendedor = false;
    stepper.next();
    

  }

  Logout(){
    this.cookieservice.delete('login'); 
    this.cookieservice.delete('senha'); 
    this.authService.setStatus_logado = false; 
    this.myrouter.navigate(['login'], {skipLocationChange: true, fragment: 'top'}); 
  }

  onProducts(imagem,codigo,nome,descricao,valor,estoque,categoria,vendedor){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = true; 
    if (this.Device == 'M' || this.Device == 'T'){
      dialogConfig.width = "110%"; 
    }else{
      dialogConfig.width = "50%"; 
    }
    
    dialogConfig.data = {codigo,nome,descricao,valor,imagem,estoque,categoria,vendedor}; 
    this.dialog.open(LoadProduct, dialogConfig).afterClosed().subscribe(res => {  
    });  
  }

  item_carrinho(ItemIndex, ID ,imagem ,nome,descricao,valor,estoque,horario,vendedor){
    if ((this.apiService.vendedor>0 && this.apiService.vendedor!=vendedor) && this.apiService.Itemsitens.length>0){
      this.apiService.temVendedor = true;
    }
    this.apiService.vendedor = vendedor;
    this.apiService.formData.ven_codigo = vendedor;
    if (this.apiService.temVendedor){
      this.notification.success('Você já selecionou um vendedor para esse pedido, finalize o mesmo e inicie com outro vendedor!'); 
    }else{
      if (this.onHorario(horario)){
        const dialogConfig = new MatDialogConfig(); 
        dialogConfig.autoFocus = true;  
        dialogConfig.disableClose = true; 
        if (this.Device == 'M' || this.Device == 'T'){
          dialogConfig.width = "110%"; 
        }else{
          dialogConfig.width = "50%"; 
        }
        dialogConfig.data = { ItemIndex, ID ,imagem,nome,descricao,valor,estoque}; 
        this.dialog.open(itensComponent, dialogConfig).afterClosed().subscribe(res => { 
          if (this.TipoGrupo!='C'){
            if (ItemIndex){ 
              console.log(this.apiService.Itemsitens[ItemIndex].item_status)  
              if (this.apiService.Itemsitens[ItemIndex].item_status!='I'){ 
                this.apiService.Itemsitens[ItemIndex].item_status = 'U';  
              } 
            } 
            else{  
              if (ItemIndex==0){  
              this.apiService.Itemsitens[ItemIndex].item_status = 'U';  
              }else{  
                this.apiService.Itemsitens[this.apiService.Itemsitens.length-1].item_status = 'I'; 
              } 
            } 
          }
          this.apiService.atualizarTotalGeral(); 
        }); 
      }else{
        let strhorario = 'DE '+horario.substr(0,3)+' Á '+horario.substr(3,3)+' DAS '+horario.substr(6,2)+':'+horario.substr(8,2)+' ATÉ '+horario.substr(10,2)+':'+horario.substr(12,2);
        this.notification.success('Vendedor não está no horário de funcionamento "'+strhorario+'"!'); 
        
      }
    }
  }

  goHelp(tabela:string){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = true; 
    if (this.Device == 'M' || this.Device == 'T'){
      dialogConfig.width = "110%"; 
    }else{
      dialogConfig.width = "50%"; 
    }
    dialogConfig.data = { tabela }; 
    this.dialog.open(pedidosHelpComponent, dialogConfig).afterClosed().subscribe(res => { 
    });  
  }  

  onFileSelect(event) { 
    const selectedFiles = <FileList>event.srcElement.files; 
    const fileNames = []; 
    this.files = new Set(); 
    for (let i = 0; i < selectedFiles.length; i++) { 
       this.fileNames.push(selectedFiles[i].name); 
       this.files.add(selectedFiles[i]); 
     } 
  } 

  onDataHora0(){
    let strDate = new Date().toLocaleString(); 
    let vNewDate = new Date(); //this.ConverteData(strDate); 

    this.apiService.formData.ped_datapronto = vNewDate; 
  }

  onDataHora1(){
    let strDate = new Date().toLocaleString(); 
    let vNewDate = new Date(); //this.ConverteData(strDate); 

    this.apiService.formData.ped_retirado = vNewDate; 
  }

  onDataHora2(){
    let strDate = new Date().toLocaleString(); 
    let vNewDate = new Date(); //this.ConverteData(strDate); 

    this.apiService.formData.ped_entregue = vNewDate; 
  }

  resetForm(form?: NgForm) {//NOVO REGISTRO RESET DADOS E COLOCAR VALORES PADROES 
    if (form = null)  
      form.resetForm(); 
    let vNewDate = new Date();//this.ConverteData(strDate); 
    this.apiService.vendedor = 0;
    this.apiService.temVendedor = false;
    this.apiService.formData = { 
      ped_codigo: null, 
      ped_datahora: vNewDate, 
      strped_datahora: null, 
      ped_datapronto: null, 
      strped_datapronto: null, 
      ped_entregue: null, 
      strped_entregue: null, 
      ped_forma_pagto:'CARTAO',  
      ped_retirado: null, 
      strped_retirado: null, 
      ped_status:'PEDIDO',  
      ped_tipo_pagto:'OFFLINE',  
      ped_total:0,  
      ped_obs:null,
      ped_usarbonificacao:false,  
      DeletedItensitensIDs: '',  
      status_reg:'I',  
      usu_codigo:environment.CodigoUsuario,
      ven_codigo:this.apiService.vendedor,
    };  

    this.apiService.Itemsitens = []; 
  }  



  validateForm() { //FUNCAO QUE VALIDA DADOS DO FORM
    //debugger
    this.isValid = true; 
    if (this.apiService.formData==null) 
      this.isValid = false; 
    else if (this.apiService.Itemsitens.length==0) 
      this.isValid = false; 
    else if (this.apiService.formData.ped_datahora == null) 
      this.isValid = false; 
      else if (this.apiService.formData.usu_codigo == null) 
      this.isValid = false; 
      else if (this.apiService.formData.ven_codigo == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ped_forma_pagto == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ped_status == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ped_tipo_pagto == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ped_total == null) 
      this.isValid = false; 
    else if (this.apiService.formData.ped_usarbonificacao == null) 
      this.isValid = false; 
    return this.isValid; 
  } 
  //************************************ */  
  //verifica permissoes de campos   
  permissaoFieldDisabled(Tela:string){ 
    let array:any[]=[];   
    array = environment.Permissoes.filter(x=>x.tab_nome===Tela);    
    if (Array.isArray(array) && array.length){   
      for(let x=0;x<array[0].campos.length;x++){ 
        if (array[0].campos[x].pca_permissao === 'Visualiza'){ 
          //***********************/   
          switch(array[0].campos[x].cmp_nome) {
            case 'ped_codigo': {   
              this.apiService.formDisabled.ped_codigo = true; 
              break;  
            }    
            case 'ped_datahora': {   
              this.apiService.formDisabled.ped_datahora = true; 
              break;  
            }    
            case 'ped_datapronto': {   
              this.apiService.formDisabled.ped_datapronto = true; 
              break;  
            }    
            case 'ped_entregue': {   
              this.apiService.formDisabled.ped_entregue = true; 
              break;  
            }    
            case 'ped_forma_pagto': {   
              this.apiService.formDisabled.ped_forma_pagto = true; 
              break;  
            }    
            case 'ped_retirado': {   
              this.apiService.formDisabled.ped_retirado = true; 
              break;  
            }    
            case 'ped_status': {   
              this.apiService.formDisabled.ped_status = true; 
              break;  
            }    
            case 'ped_tipo_pagto': {   
              this.apiService.formDisabled.ped_tipo_pagto = true; 
              break;  
            }    
            case 'ped_total': {   
              this.apiService.formDisabled.ped_total = true; 
              break;  
            }    
            case 'ped_usarbonificacao': {   
              this.apiService.formDisabled.ped_usarbonificacao = true; 
              break;  
            }    
         }
        //**************/  
        } 
      } 
    }  
  }  

  permissaoFieldVisible(Tela:string){ 
    let array:any[]=[]; 
    array = environment.Permissoes.filter(x=>x.tab_nome===Tela);
    if (Array.isArray(array) && array.length){   
      for(let x=0;x<array[0].campos.length;x++){  
        if (array[0].campos[x].pca_permissao === 'Invisivel'){ 
          //***********************/  
          switch(array[0].campos[x].cmp_nome) {  
            case 'ped_codigo': {   
              this.apiService.formVisible.ped_codigo = false; 
              break;  
            }    
            case 'ped_datahora': {   
              this.apiService.formVisible.ped_datahora = false; 
              break;  
            }    
            case 'ped_datapronto': {   
              this.apiService.formVisible.ped_datapronto = false; 
              break;  
            }    
            case 'ped_entregue': {   
              this.apiService.formVisible.ped_entregue = false; 
              break;  
            }    
            case 'ped_forma_pagto': {   
              this.apiService.formVisible.ped_forma_pagto = false; 
              break;  
            }    
            case 'ped_retirado': {   
              this.apiService.formVisible.ped_retirado = false; 
              break;  
            }    
            case 'ped_status': {   
              this.apiService.formVisible.ped_status = false; 
              break;  
            }    
            case 'ped_tipo_pagto': {   
              this.apiService.formVisible.ped_tipo_pagto = false; 
              break;  
            }    
            case 'ped_total': {   
              this.apiService.formVisible.ped_total = false; 
              break;  
            }    
            case 'ped_usarbonificacao': {   
              this.apiService.formVisible.ped_usarbonificacao = false; 
              break;  
            }    
         } 
        //**************/ 
        }  
      } 
    } 
  } 
//fim permissoes de campos 
 //*********************************** */ 
  //FUNCOES DOS ITENS (FILHO/DETALHE) 
  FormItemitens(ItemIndex, ID) { //FUNCAOparaADD E EDITAR ITENS NO FORM NO COMPONENT MATDIALOGCONFIG
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.autoFocus = true;  
    dialogConfig.disableClose = true; 
    if (this.Device == 'M' || this.Device == 'T'){
      dialogConfig.width = "110%"; 
    }else{
      dialogConfig.width = "50%"; 
    }
    dialogConfig.data = { ItemIndex, ID }; 
    this.dialog.open(itensComponent, dialogConfig).afterClosed().subscribe(res => { 
      if (ItemIndex){ 
        console.log(this.apiService.Itemsitens[ItemIndex].item_status)  
        if (this.apiService.Itemsitens[ItemIndex].item_status!='I'){ 
          this.apiService.Itemsitens[ItemIndex].item_status = 'U';  
        } 
      } 
      else{  
        if (ItemIndex==0){  
         this.apiService.Itemsitens[ItemIndex].item_status = 'U';  
        }else{  
          this.apiService.Itemsitens[this.apiService.Itemsitens.length-1].item_status = 'I'; 
        } 
      } 
      this.apiService.atualizarTotalGeral(); 
    }); 
  } 
  onDeleteItensitens(ite_codigo: number, i: number) { //DELETAR ITEM NO FORM  
    this.dialogService.openConfirmDialog('Deseja excluir esse registro?') 
    .afterClosed().subscribe(res =>{ 
      if(res){ 
        if (ite_codigo != null) 
          this.apiService.formData.DeletedItensitensIDs += ite_codigo+","; 
        this.apiService.Itemsitens[i].item_status = 'D'; 
        this.apiService.Itemsitens.splice(i, 1); 
        this.apiService.atualizarTotalGeral(); 
      } 
    }); 
  } 

   
  //FIM - FUNCOES DOS ITENS (FILHO/DETALHE) 
  onSubmit(form: NgForm) { //ENVIANDO DADOS DO FORM para SERVICE CHAMAR A FUNCAO para GRAVAR NO BACKEND
    if (this.apiService.formData.ped_datahora){ 
      this.apiService.formData.strped_datahora = this.apiService.formData.ped_datahora.toLocaleString();  
    }  
    if (this.apiService.formData.ped_datapronto){ 
      this.apiService.formData.strped_datapronto = this.apiService.formData.ped_datapronto.toLocaleString();  
    }  
    if (this.apiService.formData.ped_entregue){ 
      this.apiService.formData.strped_entregue = this.apiService.formData.ped_entregue.toLocaleString();  
    }  
    if (this.apiService.formData.ped_retirado){ 
      this.apiService.formData.strped_retirado = this.apiService.formData.ped_retirado.toLocaleString();  
    }  
    if (this.validateForm()) { 
      if (this.temEndereco){
        this.apiService.formData.ven_codigo = this.apiService.vendedor;
        this.apiService.vendedor = 0;
        this.apiService.gravarpedidos(this.apiService.formData.status_reg) 
          .pipe(first()) 
          .subscribe( 
            data => {  
              console.log('ret-update',data);
              if (this.apiService.formData.status_reg == 'U'){ 
                if(data[0].chave > 0) { 
                    console.log('pedidos ATUALIZADO COM EXITO.',data); 
                }else { 
                  console.log('ERRO: AO ATUALIZAR pedidos'); 
                }  
              }else{  
                  console.log('ret-insert',data);
                  this.resetForm();
                } 
                this.apiService.ultpedido = data[0].chave;
                if (this.TipoGrupo=='C'){
                  this.myrouter.navigate(['Inicial'], {skipLocationChange: true, fragment: 'top'}); 
                }else{
                  this.myrouter.navigate(['Listarpedidos'], {skipLocationChange: true, fragment: 'top'}); 
                }
                
            }, 
            error => { 
              console.log('erro:',error); 
          });
        }else{
          this.notification.success('Favor especificar endereço de entrega!') ;
        }
      }else{  
        this.notification.success('Favor preencher os campos obrigatórios!') ;
      }   
    
  }  
  
  onCancelar() { 
    if (this.TipoGrupo=='C'){
      this.myrouter.navigate(['Inicial'], {skipLocationChange: true, fragment: 'top'}); 
    }else{
      this.myrouter.navigate(['Listarpedidos'], {skipLocationChange: true, fragment: 'top'}); 
    }
  } 

  getPosition()
  {  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.apiService.lat = position.coords.latitude;
        this.apiService.lng = position.coords.longitude;
        console.log("position", position);
      });
    }

  }


permissaoInsert(Tela:string){ 
    let result:boolean=false; 
    let array:any[]=environment.Permissoes;
      if (Array.isArray(array) && array.length){ 
      for(let x=0;x<array.length;x++){
        if (array[x].tab_nome === Tela && array[x].pte_inserir === '1'){ 
          result = true; 
        }  
      }  
    }else{  
      result = true; 
    }  
    return result;  
  } 

  permissaoDelete(Tela:string){ 
    let result:boolean=false; 
    let array:any[]=environment.Permissoes; 
    if (Array.isArray(array) && array.length){ 
      for(let x=0;x<array.length;x++){ 
        if (array[x].tab_nome === Tela && array[x].pte_excluir === '1'){
          result = true; 
        }   
      }  
    }else{  
      result = true; 
    }  
    return result;
  } 

  permissaoUpdate(Tela:string){ 
    let result:boolean=false; 
    let array:any[]=environment.Permissoes; 
    if (Array.isArray(array) && array.length){ 
      for(let x=0;x<array.length;x++){   
        if (array[x].tab_nome === Tela && array[x].pte_alterar === '1'){
          result = true;   
        }  
      }  
    }else{  
      result = true; 
    }  
    return result;   
  }  

  permissaoView(Tela:string){  
    let result:boolean=false;  
    let array:any[]=environment.Permissoes;   
    if (Array.isArray(array) && array.length){ 
      for(let x=0;x<array.length;x++){   
        if (array[x].tab_nome === Tela && array[x].pte_visualizar === '1'){  
          result = true;  
        }  
      }  
    }else{  
      result = true; 
    }  
    return result; 
  }  

  permissaoFieldVisible_itens(Tela:string){ 
    let array:any[]=[]; 
    array = environment.Permissoes.filter(x=>x.tab_nome===Tela);
    if (Array.isArray(array) && array.length){   
      for(let x=0;x<array[0].campos.length;x++){  
        if (array[0].campos[x].pca_permissao === 'Invisivel'){ 
          //***********************/  
          switch(array[0].campos[x].cmp_nome) {  
            case 'car_codigo': {   
              this.apiService.formVisible_itens.car_codigo = false; 
              break;  
            }    
            case 'ite_codigo': {   
              this.apiService.formVisible_itens.ite_codigo = false; 
              break;  
            }    
            case 'ite_preco': {   
              this.apiService.formVisible_itens.ite_preco = false; 
              break;  
            }    
            case 'ite_qtde': {   
              this.apiService.formVisible_itens.ite_qtde = false; 
              break;  
            }    
            case 'ite_subtotal': {   
              this.apiService.formVisible_itens.ite_subtotal = false; 
              break;  
            }    
         } 
        //**************/ 
        }  
      } 
    } 
  } 
//fim permissoes de campos 
 //*********************************** */ 
} //FIM - EXPORTS 
