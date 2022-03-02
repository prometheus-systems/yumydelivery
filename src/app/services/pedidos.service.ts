 
import {Injectable} from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  
import {pedidos} from "../model/pedidos.model"; 
import {itens} from "../model/itens.model"; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
@Injectable() 
export class pedidosService  { 
    lat:number;
    lng:number;
    temVendedor:boolean = false;
    formData: pedidos;  
    arrSabores:any[];
    itemsSabores:any[];
    itemsEndereco:endereco_entrega;
    arrhistPedidos:any[];
    formDisabled:permissoes_disabled; 
    formVisible:permissoes_visible; 
    formVisible_itens: permissoes_visible_itens ; 
    formParRel:any; 
    strParametros:string=''; 
    arrpedidos:any[]=[]; 
    DataChart:any[]=[]; 
    typeChart:string;
    vendedor:number=0;
    tela:number=0;
    carrinhos:number=0;
    temItem:boolean=false;
    httpOptions = {  
      headers: new HttpHeaders({  
        'Content-Type':'application/json', 
        'Authorization':'Bearer '+localStorage.getItem('token')
      })  
    }   
  Itemsitens: itens[]; 
  constructor(private http: HttpClient) { }  
  baseUrl = environment.URLBase;  
  ultpedido:number;

  atualizarTotalGeral() { //TOTALIZADOR GERAL 
    //debugger
    let total:number=0.0;  
    this.formData.ped_total = 0.0;
    if (Array.isArray(this.Itemsitens) && this.Itemsitens.length){ 
      this.temItem = true;
      for (let i=0;i<this.Itemsitens.length;i++){
        total += parseFloat((this.Itemsitens[i].ite_subtotal*1.0).toFixed(2));
      }    
      this.formData.ped_total = total;

      let qtde:number=0; 
      this.carrinhos = 0; 
      for (let i=0;i<this.Itemsitens.length;i++){
        qtde += this.Itemsitens[i].ite_qtde;
      }; 
      this.carrinhos = qtde;
    }else{
      this.temItem = false;
    }
  
    console.log('carrinhos',this.carrinhos);
    console.log('total',this.formData.ped_total)
  }
  postRelatoriopedidos(): Observable<any> { 
      var body = { 
        ...this.formParRel 
      }; 
      console.log(body); 
      if (environment.TipoGrupo=='V'){
        return this.http.post<any>(this.baseUrl+'/pedidos.php?operacao=REL&vendedor='+environment.CodigoUsuario,body, this.httpOptions); 
      }else{
        return this.http.post<any>(this.baseUrl+'/pedidos.php?operacao=REL',body, this.httpOptions); 

      }
    } 

    getStatus():Observable<any>{  
      return this.http.get<any>(this.baseUrl+'/pedidos.php?operacao=STA&pedido='+this.ultpedido); 
    }

    getEndereco(lat,lng):Observable<any>{
      
      return this.http.get<any>('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyC-dO8XwYDNtqOktv8QWJtG3o35PiOED2M'); 
      
    }

    getPedidosCozinha(opcao): Observable<any>{  
      var body = { 
        ...this.formParRel 
      };
      return this.http.post<any>(this.baseUrl+'/pedidos.php?operacao=B&opcao='+opcao+'&vendedor='+environment.CodigoUsuario,body); 
    }
  
    pedidoPronto(id,produto): Observable<any>{  
      let date = new Date();
      let strdata = date.toLocaleString(); 
      console.log(this.baseUrl+'/pedidos.php?operacao=S&pedido='+id+'&produto='+produto+'&vendedor='+environment.CodigoUsuario+'&data='+strdata, this.httpOptions);
      return this.http.get<any>(this.baseUrl+'/pedidos.php?operacao=S&pedido='+id+'&produto='+produto+'&vendedor='+environment.CodigoUsuario+'&data='+strdata, this.httpOptions); 
    }

    getPedidosAPIGrava(id:string,status:string): Observable<any> { 
      let date = new Date();
      let strdata = date.toLocaleString(); 

      console.log(this.baseUrl+'/pedidos.php?operacao=X&pedido='+id+'&status='+status+'&vendedor='+environment.CodigoUsuario+'&data='+strdata);
      return this.http.get<any>(this.baseUrl+'/pedidos.php?operacao=X&pedido='+id+'&status='+status+'&vendedor='+environment.CodigoUsuario+'&data='+strdata); 
    }
 
 
  getRelatoriopedidos(): Observable<any> { 
      return this.http.get<any>(this.baseUrl+'/pedidos.php?operacao=REL', this.httpOptions); 
  } 

  gethistPedidos():Observable<any> { 
    console.log(this.baseUrl+'/pedidos.php?operacao=HIS&comprador='+environment.CodigoUsuario);
    return this.http.get<any>(this.baseUrl+'/pedidos.php?operacao=HIS&comprador='+environment.CodigoUsuario, this.httpOptions); 
  }

  getSellers(): Observable<any> { 
    //debugger
    console.log(this.baseUrl+'/pedidos.php?operacao=SEL');
    return this.http.get<any>(this.baseUrl+'/pedidos.php?operacao=SEL', this.httpOptions); 
  } 

  getSabores(produto): Observable<any> { 
    //debugger
    console.log(this.baseUrl+'/sabores.php?operacao=C');
    return this.http.get<any>(this.baseUrl+'/sabores.php?operacao=C&produto='+produto, this.httpOptions); 
  } 

  getProducts(): Observable<any> { 
    //debugger
    console.log(this.baseUrl+'/pedidos.php?operacao=PRO');
    return this.http.get<any>(this.baseUrl+'/pedidos.php?operacao=PRO', this.httpOptions); 
  } 

  getCategories(): Observable<any> { 
    //debugger
    console.log(this.baseUrl+'/pedidos.php?operacao=CAT');
    return this.http.get<any>(this.baseUrl+'/pedidos.php?operacao=CAT', this.httpOptions); 
  }
 
 
  getpedidos() : Observable<any>{  
    if (environment.TipoGrupo=='V'){
      return this.http.get<pedidos>(this.baseUrl+'/pedidos.php?operacao=C&vendedor='+environment.CodigoUsuario, this.httpOptions);
    }else{
      return this.http.get<pedidos>(this.baseUrl+'/pedidos.php?operacao=C', this.httpOptions);
    }
     
  } 
  //PARA CASOS DE CHAVE ESTRANGEIRA DE ITENS 
  getItenspedidos() {  
    if (environment.TipoGrupo=='V'){
      return this.http.get(this.baseUrl+'/pedidos.php?operacao=C&vendedor='+environment.CodigoUsuario, this.httpOptions).toPromise(); 

    }else{
      return this.http.get(this.baseUrl+'/pedidos.php?operacao=C', this.httpOptions).toPromise(); 

    }
  } 
  getpedidosId(id: string): Observable<pedidos> {  
    return this.http.get<pedidos>(this.baseUrl+'/pedidos.php?operacao=R&id='+id, this.httpOptions); 
  }  

  uploadimage(formData): Observable<any>{  
    return this.http.post<any>(this.baseUrl+'/uploadpedidos.php',formData, this.httpOptions); 
  }  

  SetUser(){ 
    for (let x=0;x<this.Itemsitens.length;x++){ 
      this.Itemsitens[x].usu_codigo = environment.CodigoUsuario; 
    } 
  } 

  gravarpedidos(operacao:string) : Observable<pedidos> { 
    if (environment.TipoGrupo=='V'){
      this.formData.ven_codigo = environment.CodigoUsuario; 
    } 
  
    var body = {  
     ...this.formData 
      , itemsitens: this.Itemsitens
      , itemssabores: this.itemsSabores
      , itemsendereco: this.itemsEndereco
   };  
   console.log(body); 
    return this.http.post<any>(this.baseUrl+'/pedidos.php?operacao='+operacao,body, this.httpOptions); 
  } 
  deletepedidos(id:number): Observable<pedidos> {  
    return this.http.get<any>(this.baseUrl+'/pedidos.php?operacao=D&id='+id, this.httpOptions); 
  }  
}   
  export class permissoes_visible_itens {  
    car_codigo: boolean; 
    ite_codigo: boolean; 
    ite_preco: boolean; 
    ite_qtde: boolean; 
    ite_subtotal: boolean; 
} 
  export class permissoes_visible {  
    ped_codigo: boolean; 
    ped_datahora: boolean; 
    ped_datapronto: boolean; 
    ped_entregue: boolean; 
    ped_forma_pagto: boolean; 
    ped_retirado: boolean; 
    ped_status: boolean; 
    ped_tipo_pagto: boolean; 
    ped_total: boolean; 
    ped_usarbonificacao: boolean; 
} 
export class permissoes_disabled { 
    ped_codigo: boolean; 
    ped_datahora: boolean; 
    ped_datapronto: boolean; 
    ped_entregue: boolean; 
    ped_forma_pagto: boolean; 
    ped_retirado: boolean; 
    ped_status: boolean; 
    ped_tipo_pagto: boolean; 
    ped_total: boolean; 
    ped_usarbonificacao: boolean; 
} 

 
export class endereco_entrega {  
  end_bairro:string; 
  end_cep:string; 
  end_cidade:string; 
  end_complemento:string; 
  end_endereco:string; 
  end_numero:string; 
  end_referencia:string; 
  end_uf:string; 
  end_lat:number;
  end_long:number;
} 
