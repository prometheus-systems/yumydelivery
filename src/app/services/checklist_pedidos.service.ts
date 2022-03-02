 
import {Injectable} from '@angular/core'; 
import {HttpClient, HttpHeaders} from '@angular/common/http'; 
import {Observable} from "rxjs/index"; 
import { environment } from '../../environments/environment';  
import { BehaviorSubject } from 'rxjs' 
import {MatTableDataSource} from '@angular/material/table'; 
import {SelectionModel} from '@angular/cdk/collections'; 
@Injectable({ 
  providedIn: 'root' 
})
 
export class checklist_pedidosService  {  
    dataSource = new MatTableDataSource<any>(); 
    dataSourceChild = new MatTableDataSource<any>(); 
    arrchecklist_pedidos:any[]=[]; 
    arrItenschecklist_pedidos:any[]=[]; 
    arrTempochecklist_pedidos:any[]=[];
    arrFilteredTempochecklist_pedidos:any[]=[]; 
    formParApto:any; 
    ped_codigo:number; 
    SemChave:boolean; 
    formData:any; 
    strParametros:string='';
    arrchecklist_pedidos$: BehaviorSubject<any[]> = new BehaviorSubject(this.arrchecklist_pedidos);
    arrItenschecklist_pedidos$: BehaviorSubject<any[]> = new BehaviorSubject(this.arrItenschecklist_pedidos);
    httpOptions = {  
      headers: new HttpHeaders({  
        'Content-Type':'application/json', 
        'Authorization':'Bearer '+localStorage.getItem('token') 
      })  
    }   
    totalTime:number; 
    selection = new SelectionModel<any>(true, []); 
    selectionChild = new SelectionModel<any>(true, []); 
 
  constructor(private http: HttpClient) { }  
  baseUrl = environment.URLBase; 
 
  TotalTime(key:number){ 
    let result:number=0;  
    let array:any[] = this.arrTempochecklist_pedidos.filter(x=>x.ped_codigo===key); 
  } 
 
  TotalItens(key:number){ 
    let result:number=0; 
    let array:any[] = this.arrItenschecklist_pedidos.filter(x=>x.ped_codigo===key);  
    let vCount:number=0; 
  }  
 
  TotalGeral(){ 
    let result:number=0; 
    let array:any[] = this.getarrchecklist_pedidos.value; 
    let vCount:number=0; 
} 
 
  get getarrchecklist_pedidos() {
    return this.arrchecklist_pedidos$; 
  }  
 
  set setarrchecklist_pedidos(param:any) {  
    this.arrchecklist_pedidos$.next(param); 
  }  
 
  get getarrItenschecklist_pedidos() {  
    return this.arrItenschecklist_pedidos$;  
  } 
 
  set setarrItenschecklist_pedidos(param:any) { 
    this.arrItenschecklist_pedidos$.next(param); 
  }  
 
  update(index, field, value) {  
    this.arrchecklist_pedidos = this.arrchecklist_pedidos.map((e, i) => { 
      if (index === i) {
        return { 
          ...e, 
          [field]: value  
        }  
      } 
      return e;  
    });  
    this.arrchecklist_pedidos$.next(this.arrchecklist_pedidos);  
    this.dataSource.data = this.arrchecklist_pedidos;  
    console.log(this.arrchecklist_pedidos);  
    console.log(this.dataSource);  
    console.log(this.selection); 
    this.TotalGeral(); 
  } 
 
  updateChild(index, field, value) {  
    this.arrItenschecklist_pedidos = this.arrItenschecklist_pedidos.map((e, i) => { 
      if (index === i) {  
        return { 
          ...e, 
          [field]: value    
        }  
      }   
      return e;  
    }); 
    this.arrItenschecklist_pedidos$.next(this.arrItenschecklist_pedidos); 
    this.dataSourceChild.data = this.arrItenschecklist_pedidos;  
    if (!this.SemChave){   
      let array:any[] =  this.arrchecklist_pedidos.filter(x=>x.ped_codigo===this.ped_codigo); 
      array[0].itemsChild = this.dataSourceChild.data; 
      for (let i=0;i<this.arrchecklist_pedidos.length;i++){ 
        if(this.arrchecklist_pedidos[i].ped_codigo === this.ped_codigo){  
          this.arrchecklist_pedidos[i].itemsChild = array[0].itemsChild; 
        } 
      } 
    }else{ 
      let array:any[] =  this.arrchecklist_pedidos.filter(x=>x.ped_codigo===this.ped_codigo); 
      array[0].itemsChild = this.dataSourceChild.data; 
      for (let i=0;i<this.arrchecklist_pedidos.length;i++){  
        if(this.arrchecklist_pedidos[i].ped_codigo === this.ped_codigo){   
          this.arrchecklist_pedidos[i].itemsChild = array[0].itemsChild; 
        }  
      } 
    }  
    console.log(this.dataSourceChild);  
    console.log(this.selectionChild); 
    this.TotalItens(this.ped_codigo); 
  } 
 
  getControl(index, fieldName) { 
  }  
 
  postApontamentochecklist_pedidos():Observable<any> { 
      this.formParApto.usu_codigo = environment.CodigoUsuario; 
      var body = { 
        ...this.formParApto  
      };  
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/checklist_pedidos.php?operacao=P',body, this.httpOptions);  
  }  
 
  SetSelected(){ 
    for (let i=0;i<this.selection.selected.length;i++){  
      for(let x=0;x<this.arrchecklist_pedidos.length;x++){  
        if ((this.selection.selected[i] == this.arrchecklist_pedidos[x])&&(this.arrchecklist_pedidos[x]!='undefined')){  
          this.arrchecklist_pedidos[x].ped_pronto = 'S'; 
        }  
      } 
    } 
  }  
 
  GetSelected(){ 
    this.selection.hasValue(); 
    this.selection.clear();
    this.dataSource.data.forEach(row => {if ((row.ped_pronto=='1')||(row.ped_pronto=='S')){this.selection.select(row)}}); 
    console.log(this.selection); 
  } 
 
  SetUser(){ 
    for (let i=0;i<this.arrchecklist_pedidos.length;i++){  
      this.arrchecklist_pedidos[i].usu_codigo = environment.CodigoUsuario; 
      this.arrchecklist_pedidos[i].usu_nome = environment.NomeUsuario; 
    } 
    for (let x=0;x<this.arrTempochecklist_pedidos.length;x++){ 
      this.arrTempochecklist_pedidos[x].usu_codigo = environment.CodigoUsuario; 
      this.arrTempochecklist_pedidos[x].usu_nome = environment.NomeUsuario;  
    } 
    for (let x=0;x<this.arrItenschecklist_pedidos.length;x++){  
      this.arrItenschecklist_pedidos[x].usu_codigo = environment.CodigoUsuario; 
      this.arrItenschecklist_pedidos[x].usu_nome = environment.NomeUsuario;
    } 
  } 
 
  Gravarchecklist_pedidos():Observable<any> {  
      this.SetSelected(); 
      for (let i=0;i<this.arrchecklist_pedidos.length;i++){ 
        if (this.arrchecklist_pedidos[i].itemsChild){ 
          this.arrItenschecklist_pedidos = this.arrchecklist_pedidos[i].itemsChild; 
        }   
      } 
      let array:any[]=[]; 
      for (let i=0;i<this.arrchecklist_pedidos.length;i++){  
        if (Array.isArray(this.arrchecklist_pedidos[i].itemsChild) && this.arrchecklist_pedidos[i].itemsChild.length){ 
          for (let x=0;x<this.arrchecklist_pedidos[i].itemsChild.length;x++){ 
            array.push(this.arrchecklist_pedidos[i].itemsChild[x]); 
          }  
        }  
      }   
      this.SetUser(); 
      var body = { 
        ...this.formData 
        ,AptoPai: this.arrchecklist_pedidos  
        ,AptoFilho: array//this.arrItenschecklist_pedidos  
        ,AptoTempo: this.arrTempochecklist_pedidos  
      };  
      console.log(body); 
      return this.http.post<any>(this.baseUrl+'/checklist_pedidos.php?operacao=G',body, this.httpOptions);  
  }  
 
  getApontamentochecklist_pedidos():Observable<any> { 
      return this.http.get<any>(this.baseUrl+'/checklist_pedidos.php?operacao=P', this.httpOptions); 
  } 
}  
