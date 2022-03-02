import {NgModule} from '@angular/core';   
import {RouterModule, Routes} from '@angular/router'; 
import {PrincipalComponent} from "./principal/principal.component"; 
import {LoginComponent} from "./login/login.component"; 
import {BrancoComponent} from "./branco/branco.component"; 
//INICIO -- grupo_usuarios    

import {Listargrupo_usuariosComponent}  from "./grupo_usuarios/Listar/listar-grupo_usuarios.component";  
import {Formgrupo_usuariosComponent}  from "./grupo_usuarios/Form/form-grupo_usuarios.component";  
import {Relatoriogrupo_usuariosComponent}  from "./grupo_usuarios/Relatorio/relatorio-grupo_usuarios.component";  
import {Filtrorelgrupo_usuariosComponent}  from "./grupo_usuarios/Relatorio/filtrorel-grupo_usuarios.component";  
import {Graficogrupo_usuariosComponent}  from "./grupo_usuarios/Relatorio/grafico-grupo_usuarios.component";  
//FIM -- grupo_usuarios   
//INICIO -- permissoes_tabelas  
import {Listarpermissoes_tabelasComponent}  from "./permissoes_tabelas/Listar/listar-permissoes_tabelas.component";  
import {Formpermissoes_tabelasComponent}  from "./permissoes_tabelas/Form/form-permissoes_tabelas.component";  
import {Relatoriopermissoes_tabelasComponent}  from "./permissoes_tabelas/Relatorio/relatorio-permissoes_tabelas.component";   
import {Filtrorelpermissoes_tabelasComponent}  from "./permissoes_tabelas/Relatorio/filtrorel-permissoes_tabelas.component";  
import {Graficopermissoes_tabelasComponent}  from "./permissoes_tabelas/Relatorio/grafico-permissoes_tabelas.component";   
//FIM -- permissoes_tabelas  
//INICIO -- tabelas   
import {ListartabelasComponent}  from "./tabelas/Listar/listar-tabelas.component";   
import {FormtabelasComponent}  from "./tabelas/Form/form-tabelas.component";   
import {RelatoriotabelasComponent}  from "./tabelas/Relatorio/relatorio-tabelas.component";   
import {FiltroreltabelasComponent}  from "./tabelas/Relatorio/filtrorel-tabelas.component";   
import {GraficotabelasComponent}  from "./tabelas/Relatorio/grafico-tabelas.component";  
//FIM -- tabelas  
//INICIO -- usuarios  
import {ListarusuariosComponent}  from "./usuarios/Listar/listar-usuarios.component";  
import {FormusuariosComponent}  from "./usuarios/Form/form-usuarios.component"; 
import {RelatoriousuariosComponent}  from "./usuarios/Relatorio/relatorio-usuarios.component";  
import {FiltrorelusuariosComponent}  from "./usuarios/Relatorio/filtrorel-usuarios.component"; 
import {GraficousuariosComponent}  from "./usuarios/Relatorio/grafico-usuarios.component"; 
//FIM -- usuarios  
//INICIO -- bonificacao
import {ListarbonificacaoComponent}  from "./bonificacao/Listar/listar-bonificacao.component"; 
import {FormbonificacaoComponent}  from "./bonificacao/Form/form-bonificacao.component"; 
import {relatoriobonificacaoComponent}  from "./bonificacao/Relatorio/relatorio-bonificacao.component"; 
import {FiltrorelbonificacaoComponent}  from "./bonificacao/Relatorio/filtrorel-bonificacao.component"; 
import {GraficobonificacaoComponent}  from "./bonificacao/Relatorio/grafico-bonificacao.component"; 
//FIM -- bonificacao
//INICIO -- cardapio
import {ListarcardapioComponent}  from "./cardapio/Listar/listar-cardapio.component"; 
import {FormcardapioComponent}  from "./cardapio/Form/form-cardapio.component"; 
import {relatoriocardapioComponent}  from "./cardapio/Relatorio/relatorio-cardapio.component"; 
import {FiltrorelcardapioComponent}  from "./cardapio/Relatorio/filtrorel-cardapio.component"; 
import {GraficocardapioComponent}  from "./cardapio/Relatorio/grafico-cardapio.component"; 
//FIM -- cardapio
//INICIO -- categorias
import {ListarcategoriasComponent}  from "./categorias/Listar/listar-categorias.component"; 
import {FormcategoriasComponent}  from "./categorias/Form/form-categorias.component"; 
import {relatoriocategoriasComponent}  from "./categorias/Relatorio/relatorio-categorias.component"; 
import {FiltrorelcategoriasComponent}  from "./categorias/Relatorio/filtrorel-categorias.component"; 
import {GraficocategoriasComponent}  from "./categorias/Relatorio/grafico-categorias.component"; 
//FIM -- categorias
//INICIO -- endereco
import {ListarenderecoComponent}  from "./endereco/Listar/listar-endereco.component"; 
import {FormenderecoComponent}  from "./endereco/Form/form-endereco.component"; 
import {relatorioenderecoComponent}  from "./endereco/Relatorio/relatorio-endereco.component"; 
import {FiltrorelenderecoComponent}  from "./endereco/Relatorio/filtrorel-endereco.component"; 
import {GraficoenderecoComponent}  from "./endereco/Relatorio/grafico-endereco.component"; 
//FIM -- endereco
//INICIO -- pedidos
import {PedidosCozinhaComponent}  from "./pedidos/Listar2/pedidos-cozinha.component"; 
import {PedidosGeralComponent}  from "./pedidos/Listar3/pedidos-geral.component"; 
import {ListarpedidosComponent}  from "./pedidos/Listar/listar-pedidos.component"; 
import {FormpedidosComponent}  from "./pedidos/Form/form-pedidos.component"; 
import {relatoriopedidosComponent}  from "./pedidos/Relatorio/relatorio-pedidos.component"; 
import {FiltrorelpedidosComponent}  from "./pedidos/Relatorio/filtrorel-pedidos.component"; 
import {GraficopedidosComponent}  from "./pedidos/Relatorio/grafico-pedidos.component"; 
//FIM -- pedidos
//INICIO -- sabores
import {ListarsaboresComponent}  from "./sabores/Listar/listar-sabores.component"; 
import {FormsaboresComponent}  from "./sabores/Form/form-sabores.component"; 
import {relatoriosaboresComponent}  from "./sabores/Relatorio/relatorio-sabores.component"; 
import {FiltrorelsaboresComponent}  from "./sabores/Relatorio/filtrorel-sabores.component"; 
import {GraficosaboresComponent}  from "./sabores/Relatorio/grafico-sabores.component"; 
//FIM -- sabores
//INICIO -- vendedores
import {ListarvendedoresComponent}  from "./vendedores/Listar/listar-vendedores.component"; 
import {FormvendedoresComponent}  from "./vendedores/Form/form-vendedores.component"; 
import {relatoriovendedoresComponent}  from "./vendedores/Relatorio/relatorio-vendedores.component"; 
import {FiltrorelvendedoresComponent}  from "./vendedores/Relatorio/filtrorel-vendedores.component"; 
import {GraficovendedoresComponent}  from "./vendedores/Relatorio/grafico-vendedores.component"; 
//FIM -- vendedores
// INICIO -- COMPONENTES DOS relatorios 
// INICIO -- REL. lista_pedidos 
import {Filtrorellista_pedidosComponent} from './relatorios/lista_pedidos/filtrorel-lista_pedidos.component';  
import {relatoriolista_pedidosComponent} from './relatorios/lista_pedidos/relatorio-lista_pedidos.component';  
import {Graficolista_pedidosComponent}  from "./relatorios/lista_pedidos/grafico-lista_pedidos.component"; 
// FIM -- REL. lista_pedidos 
// INICIO -- REL. sintetico_por_data 
import {Filtrorelsintetico_por_dataComponent} from './relatorios/sintetico_por_data/filtrorel-sintetico_por_data.component';  
import {relatoriosintetico_por_dataComponent} from './relatorios/sintetico_por_data/relatorio-sintetico_por_data.component';  
import {Graficosintetico_por_dataComponent}  from "./relatorios/sintetico_por_data/grafico-sintetico_por_data.component"; 
// FIM -- REL. sintetico_por_data 
// INICIO -- REL. sintetico_por_cardapio 
import {Filtrorelsintetico_por_cardapioComponent} from './relatorios/sintetico_por_cardapio/filtrorel-sintetico_por_cardapio.component';  
import {relatoriosintetico_por_cardapioComponent} from './relatorios/sintetico_por_cardapio/relatorio-sintetico_por_cardapio.component';  
import {Graficosintetico_por_cardapioComponent}  from "./relatorios/sintetico_por_cardapio/grafico-sintetico_por_cardapio.component"; 
// FIM -- REL. sintetico_por_cardapio 
// FIM -- COMPONENTES DOS relatorios 
// INICIO -- COMPONENTES DOS apontamentos 
// INICIO -- REL. checklist_pedidos 
import {Filtroaptochecklist_pedidosComponent} from './apontamentos/checklist_pedidos/filtroapto-checklist_pedidos.component';  
import {Apontamentochecklist_pedidosComponent} from './apontamentos/checklist_pedidos/apontamento-checklist_pedidos.component';  
import {AptoTimechecklist_pedidosComponent}  from "./apontamentos/checklist_pedidos/aptotime-checklist_pedidos.component"; 
import {Aptochildchecklist_pedidosComponent}  from "./apontamentos/checklist_pedidos/aptochild-checklist_pedidos.component"; 
import {checklist_pedidosService} from "./services/checklist_pedidos.service";  
// FIM -- REL. checklist_pedidos 
// FIM -- COMPONENTES DOS apontamentos 
import {MenuComponent}  from "./menu/menu.component"; 
import {AuthGuard} from './auth/auth.guard'; 
const routes: Routes = [ 
  {path : 'Branco',      component:  BrancoComponent, data: {animation: 'Branco'}}, 
  {path: 'login',   component: LoginComponent }, 
  //INICIO -- grupo_usuarios  
  {path: 'Listargrupo_usuarios',  component: Listargrupo_usuariosComponent },
  {path: 'Formgrupo_usuarios/:id',  component: Formgrupo_usuariosComponent}, 
  {path: 'Formgrupo_usuarios',  component: Formgrupo_usuariosComponent},  
  {path: 'Filtrorelgrupo_usuarios',  component: Filtrorelgrupo_usuariosComponent},  
  {path: 'Relatoriogrupo_usuarios',  component: Relatoriogrupo_usuariosComponent},  
  {path: 'Graficogrupo_usuarios',  component: Graficogrupo_usuariosComponent}, 
  //FIM -- grupo_usuarios 
   //INICIO -- permissoes_tabelas  
  {path: 'Listarpermissoes_tabelas',  component: Listarpermissoes_tabelasComponent }, 
  {path: 'Formpermissoes_tabelas/:id',  component: Formpermissoes_tabelasComponent}, 
  {path: 'Formpermissoes_tabelas',  component: Formpermissoes_tabelasComponent},  
  {path: 'Filtrorelpermissoes_tabelas',  component: Filtrorelpermissoes_tabelasComponent},  
  {path: 'Relatoriopermissoes_tabelas',  component: Relatoriopermissoes_tabelasComponent}, 
  {path: 'Graficopermissoes_tabelas',  component: Graficopermissoes_tabelasComponent}, 
  //FIM -- permissoes_tabelas   
  //INICIO -- tabelas  
  {path: 'Listartabelas',  component: ListartabelasComponent },  
  {path: 'Formtabelas/:id',  component: FormtabelasComponent}, 
  {path: 'Formtabelas',  component: FormtabelasComponent},
  {path: 'Filtroreltabelas',  component: FiltroreltabelasComponent}, 
  {path: 'Relatoriotabelas',  component: RelatoriotabelasComponent},
  {path: 'Graficotabelas',  component: GraficotabelasComponent},
  //FIM -- tabelas   
  //INICIO -- usuarios 
  {path: 'Listarusuarios',  component: ListarusuariosComponent }, 
  {path: 'Formusuarios/:id',  component: FormusuariosComponent}, 
  {path: 'Formusuarios',  component: FormusuariosComponent}, 
  {path: 'Filtrorelusuarios',  component: FiltrorelusuariosComponent},  
  {path: 'Relatoriousuarios',  component: RelatoriousuariosComponent}, 
  {path: 'Graficousuarios',  component: GraficousuariosComponent}, 
 //FIM -- usuarios 
  //INICIO -- bonificacao
  {path: 'Listarbonificacao',  component: ListarbonificacaoComponent }, 
  {path: 'Formbonificacao/:id',  component: FormbonificacaoComponent}, 
  {path: 'Formbonificacao',  component: FormbonificacaoComponent}, 
  {path: 'Filtrorelbonificacao',  component: FiltrorelbonificacaoComponent}, 
  {path: 'relatoriobonificacao',  component: relatoriobonificacaoComponent}, 
  {path: 'Graficobonificacao',  component: GraficobonificacaoComponent}, 
  //FIM -- bonificacao
  //INICIO -- cardapio
  {path: 'Listarcardapio',  component: ListarcardapioComponent }, 
  {path: 'Formcardapio/:id',  component: FormcardapioComponent}, 
  {path: 'Formcardapio',  component: FormcardapioComponent}, 
  {path: 'Filtrorelcardapio',  component: FiltrorelcardapioComponent}, 
  {path: 'relatoriocardapio',  component: relatoriocardapioComponent}, 
  {path: 'Graficocardapio',  component: GraficocardapioComponent}, 
  //FIM -- cardapio
  //INICIO -- categorias
  {path: 'Listarcategorias',  component: ListarcategoriasComponent }, 
  {path: 'Formcategorias/:id',  component: FormcategoriasComponent}, 
  {path: 'Formcategorias',  component: FormcategoriasComponent}, 
  {path: 'Filtrorelcategorias',  component: FiltrorelcategoriasComponent}, 
  {path: 'relatoriocategorias',  component: relatoriocategoriasComponent}, 
  {path: 'Graficocategorias',  component: GraficocategoriasComponent}, 
  //FIM -- categorias
  //INICIO -- endereco
  {path: 'Listarendereco',  component: ListarenderecoComponent }, 
  {path: 'Formendereco/:id',  component: FormenderecoComponent}, 
  {path: 'Formendereco',  component: FormenderecoComponent}, 
  {path: 'Filtrorelendereco',  component: FiltrorelenderecoComponent}, 
  {path: 'relatorioendereco',  component: relatorioenderecoComponent}, 
  {path: 'Graficoendereco',  component: GraficoenderecoComponent}, 
  //FIM -- endereco
  //INICIO -- pedidos
  {path: 'Listarpedidos',  component: ListarpedidosComponent }, 
  {path: 'PedidosCozinha',  component: PedidosCozinhaComponent}, 
  {path: 'PedidosGeral',  component: PedidosGeralComponent}, 
  {path: 'Formpedidos/:id',  component: FormpedidosComponent}, 
  {path: 'Formpedidos',  component: FormpedidosComponent}, 
  {path: 'Filtrorelpedidos',  component: FiltrorelpedidosComponent}, 
  {path: 'relatoriopedidos',  component: relatoriopedidosComponent}, 
  {path: 'Graficopedidos',  component: GraficopedidosComponent}, 
  //FIM -- pedidos
  //INICIO -- sabores
  {path: 'Listarsabores',  component: ListarsaboresComponent }, 
  {path: 'Formsabores/:id',  component: FormsaboresComponent}, 
  {path: 'Formsabores',  component: FormsaboresComponent}, 
  {path: 'Filtrorelsabores',  component: FiltrorelsaboresComponent}, 
  {path: 'relatoriosabores',  component: relatoriosaboresComponent}, 
  {path: 'Graficosabores',  component: GraficosaboresComponent}, 
  //FIM -- sabores
  //INICIO -- vendedores
  {path: 'Listarvendedores',  component: ListarvendedoresComponent }, 
  {path: 'Formvendedores/:id',  component: FormvendedoresComponent}, 
  {path: 'Formvendedores',  component: FormvendedoresComponent}, 
  {path: 'Filtrorelvendedores',  component: FiltrorelvendedoresComponent}, 
  {path: 'relatoriovendedores',  component: relatoriovendedoresComponent}, 
  {path: 'Graficovendedores',  component: GraficovendedoresComponent}, 
  //FIM -- vendedores
// INICIO -- COMPONENTES DOS relatorios 
// INICIO -- REL. lista_pedidos 
  {path: 'Filtrorellista_pedidos',  component: Filtrorellista_pedidosComponent}, 
  {path: 'relatoriolista_pedidos',  component: relatoriolista_pedidosComponent}, 
  {path: 'Graficolista_pedidos',  component: Graficolista_pedidosComponent}, 
// FIM -- REL. lista_pedidos 
// INICIO -- REL. sintetico_por_data 
  {path: 'Filtrorelsintetico_por_data',  component: Filtrorelsintetico_por_dataComponent}, 
  {path: 'relatoriosintetico_por_data',  component: relatoriosintetico_por_dataComponent}, 
  {path: 'Graficosintetico_por_data',  component: Graficosintetico_por_dataComponent}, 
// FIM -- REL. sintetico_por_data 
// INICIO -- REL. sintetico_por_cardapio 
  {path: 'Filtrorelsintetico_por_cardapio',  component: Filtrorelsintetico_por_cardapioComponent}, 
  {path: 'relatoriosintetico_por_cardapio',  component: relatoriosintetico_por_cardapioComponent}, 
  {path: 'Graficosintetico_por_cardapio',  component: Graficosintetico_por_cardapioComponent}, 
// FIM -- REL. sintetico_por_cardapio 
// FIM -- COMPONENTES DOS relatorios 
// INICIO -- COMPONENTES DOS apontamentos 
// INICIO -- REL. checklist_pedidos 
  {path: 'Filtroaptochecklist_pedidos',  component: Filtroaptochecklist_pedidosComponent}, 
  {path: 'Apontamentochecklist_pedidos',  component: Apontamentochecklist_pedidosComponent}, 
  {path: 'AptoTimechecklist_pedidos',  component: AptoTimechecklist_pedidosComponent}, 
  {path: 'AptoChildchecklist_pedidos',  component: Aptochildchecklist_pedidosComponent}, 
// FIM -- REL. checklist_pedidos 
// FIM -- COMPONENTES DOS apontamentos 
  {path: 'Menu',    component: MenuComponent }, 
  {path: 'Inicial', component: PrincipalComponent, canActivate: [AuthGuard] }, 
  {path : '',       component: LoginComponent   } 
]; 
//, canActivate: [AuthGuard] 
@NgModule({ 
  imports: [ 
 
    RouterModule.forRoot( 
      routes, 
      { enableTracing: false } // <-- debugging purposes only  
    ) 
  ],
  exports: [  
    RouterModule 
  ]  
}) 
export class AppRoutingModule {} 
