 
import {BrowserModule} from '@angular/platform-browser'; 
import {NgModule, LOCALE_ID} from '@angular/core';  
import {PedidosCozinhaComponent}  from "./pedidos/Listar2/pedidos-cozinha.component"; 
import {PedidosGeralComponent}  from "./pedidos/Listar3/pedidos-geral.component"; 
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule} from 'agm-direction'; 
import { GoogleMapsModule } from '@angular/google-maps'
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider,GoogleLoginProvider } from 'angularx-social-login';
//import { FlexLayoutModule } from '@angular/flex-layout'; 
//import { DateTimePickerModule} from 'ngx-datetime-picker'; 
import {BrancoComponent} from './branco/branco.component';  
import { DeviceDetectorModule } from 'ngx-device-detector';  
/*import { ServiceWorkerModule } from '@angular/service-worker';  
import { AmplifyAngularModule, AmplifyService, AmplifyModules  } from 'aws-amplify-angular';   
import Auth from '@aws-amplify/auth';  
import Interactions from '@aws-amplify/interactions';  
import Storage from '@aws-amplify/storage';  */
import { environment } from '../environments/environment'
import { StripeModule } from "stripe-angular";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TranslateService }   from './shared/translate.service'; 
import { TRANSLATION_PROVIDERS}   from './shared/translate';
import { TranslatePipe }   from './shared/translate.pipe'; 
import { UnescapePipe }   from './shared/unescape.pipe'; 
import { ElementsComponent }   from './shared/elements.compent'; 
import {AuthService} from './auth/auth.service';
import {AuthServicefb} from './auth/auth.service-fb';  
import { PaymentCompenent }   from './shared/payment.component'; 
import {AuthGuard} from './auth/auth.guard'; 
import {AppComponent} from './app.component';  
import {LoginComponent} from './login/login.component'; 
import {PrincipalComponent} from './principal/principal.component'; 
import { EditableComponent } from './shared/editable.component'; 
import { ViewModeDirective } from './shared/view-mode.directive'; 
import { EditModeDirective } from './shared/edit-mode.directive'; 
import { FocusableDirective } from './shared/focusable.directive'; 
import { EditableOnEnterDirective } from './shared/edit-on-enter.directive'; 
import {LoadImage} from './shared/loadimage.component'; 
import {LoadProduct} from './shared/loadproduct.component'; 
import {LoadCarrinho} from './shared/loadcarrinho.component'; 
import {LoadEndereco} from './shared/loadendereco.component'; 
import {Loadhistorico} from './shared/historico.component'; 
import {LoadSabores} from './shared/sabores.component'; 
import { LoaderService } from './shared/loader.service'; 
import { Interceptor } from './interceptors/interceptor'; 
import {LoaderComponent } from './shared/loader.component'; 
import { MaterialFileInputModule } from 'ngx-material-file-input';  
import { DateTimePickerModule} from 'ngx-datetime-picker'; 
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
// INICIO -- COMPONENTES DO CRUD 
// INICIO -- bonificacao 
import {FormbonificacaoComponent} from './bonificacao/Form/form-bonificacao.component';  
import {ListarbonificacaoComponent} from './bonificacao/Listar/listar-bonificacao.component';  
import {FiltrorelbonificacaoComponent} from './bonificacao/Relatorio/filtrorel-bonificacao.component';  
import {relatoriobonificacaoComponent} from './bonificacao/Relatorio/relatorio-bonificacao.component';  
import {GraficobonificacaoComponent}  from "./bonificacao/Relatorio/grafico-bonificacao.component"; 
import {bonificacaoService} from "./services/bonificacao.service";  
import { bonificacaoFilterPipe } from './shared/bonificacao-filter.pipe'; 
import { bonificacaoHelpComponent } from './shared/loadhelp-bonificacao.component'; 
// FIM -- bonificacao 
// INICIO -- cardapio 
import {FormcardapioComponent} from './cardapio/Form/form-cardapio.component';  
import {ListarcardapioComponent} from './cardapio/Listar/listar-cardapio.component';  
import {FiltrorelcardapioComponent} from './cardapio/Relatorio/filtrorel-cardapio.component';  
import {relatoriocardapioComponent} from './cardapio/Relatorio/relatorio-cardapio.component';  
import {GraficocardapioComponent}  from "./cardapio/Relatorio/grafico-cardapio.component"; 
import {cardapioService} from "./services/cardapio.service";  
import { cardapioFilterPipe } from './shared/cardapio-filter.pipe'; 
import { cardapioHelpComponent } from './shared/loadhelp-cardapio.component'; 
// FIM -- cardapio 
// INICIO -- categorias 
import {FormcategoriasComponent} from './categorias/Form/form-categorias.component';  
import {ListarcategoriasComponent} from './categorias/Listar/listar-categorias.component';  
import {FiltrorelcategoriasComponent} from './categorias/Relatorio/filtrorel-categorias.component';  
import {relatoriocategoriasComponent} from './categorias/Relatorio/relatorio-categorias.component';  
import {GraficocategoriasComponent}  from "./categorias/Relatorio/grafico-categorias.component"; 
import {categoriasService} from "./services/categorias.service";  
import { categoriasFilterPipe } from './shared/categorias-filter.pipe'; 
import { categoriasHelpComponent } from './shared/loadhelp-categorias.component'; 
// FIM -- categorias 
// INICIO -- endereco 
import {FormenderecoComponent} from './endereco/Form/form-endereco.component';  
import {ListarenderecoComponent} from './endereco/Listar/listar-endereco.component';  
import {FiltrorelenderecoComponent} from './endereco/Relatorio/filtrorel-endereco.component';  
import {relatorioenderecoComponent} from './endereco/Relatorio/relatorio-endereco.component';  
import {GraficoenderecoComponent}  from "./endereco/Relatorio/grafico-endereco.component"; 
import {enderecoService} from "./services/endereco.service";  
import { enderecoFilterPipe } from './shared/endereco-filter.pipe'; 
import { enderecoHelpComponent } from './shared/loadhelp-endereco.component'; 
// FIM -- endereco 
// INICIO -- pedidos 
import {FormpedidosComponent} from './pedidos/Form/form-pedidos.component';  
import {ListarpedidosComponent} from './pedidos/Listar/listar-pedidos.component';  
import {FiltrorelpedidosComponent} from './pedidos/Relatorio/filtrorel-pedidos.component';  
import {relatoriopedidosComponent} from './pedidos/Relatorio/relatorio-pedidos.component';  
import {GraficopedidosComponent}  from "./pedidos/Relatorio/grafico-pedidos.component"; 
import {pedidosService} from "./services/pedidos.service";  
import { pedidosFilterPipe } from './shared/pedidos-filter.pipe'; 
import { pedidosHelpComponent } from './shared/loadhelp-pedidos.component'; 
// FIM -- pedidos 
// INICIO -- sabores 
import {FormsaboresComponent} from './sabores/Form/form-sabores.component';  
import {ListarsaboresComponent} from './sabores/Listar/listar-sabores.component';  
import {FiltrorelsaboresComponent} from './sabores/Relatorio/filtrorel-sabores.component';  
import {relatoriosaboresComponent} from './sabores/Relatorio/relatorio-sabores.component';  
import {GraficosaboresComponent}  from "./sabores/Relatorio/grafico-sabores.component"; 
import {saboresService} from "./services/sabores.service";  
import { saboresFilterPipe } from './shared/sabores-filter.pipe'; 
import { saboresHelpComponent } from './shared/loadhelp-sabores.component'; 
// FIM -- sabores 
// INICIO -- vendedores 
import {FormvendedoresComponent} from './vendedores/Form/form-vendedores.component';  
import {ListarvendedoresComponent} from './vendedores/Listar/listar-vendedores.component';  
import {FiltrorelvendedoresComponent} from './vendedores/Relatorio/filtrorel-vendedores.component';  
import {relatoriovendedoresComponent} from './vendedores/Relatorio/relatorio-vendedores.component';  
import {GraficovendedoresComponent}  from "./vendedores/Relatorio/grafico-vendedores.component"; 
import {vendedoresService} from "./services/vendedores.service";  
import { vendedoresFilterPipe } from './shared/vendedores-filter.pipe'; 
import { vendedoresHelpComponent } from './shared/loadhelp-vendedores.component'; 
// FIM -- vendedores 
// FIM -- COMPONENTES DO CRUD 
// COMPONENTES DE ITEMS (MESTRE-DETALHE) 
import {itensService} from "./services/itens.service";  
import {itensComponent} from './itens/itens.component';  
//FIM - COMPONENTES DE ITEMS (MESTRE-DETALHE) 
// INICIO -- COMPONENTES DOS relatorios 
// INICIO -- REL. lista_pedidos 
import {Filtrorellista_pedidosComponent} from './relatorios/lista_pedidos/filtrorel-lista_pedidos.component';  
import {relatoriolista_pedidosComponent} from './relatorios/lista_pedidos/relatorio-lista_pedidos.component';  
import {Graficolista_pedidosComponent}  from "./relatorios/lista_pedidos/grafico-lista_pedidos.component"; 
import {lista_pedidosService} from "./services/lista_pedidos.service";  
// FIM -- REL. lista_pedidos 
// INICIO -- REL. sintetico_por_data 
import {Filtrorelsintetico_por_dataComponent} from './relatorios/sintetico_por_data/filtrorel-sintetico_por_data.component';  
import {relatoriosintetico_por_dataComponent} from './relatorios/sintetico_por_data/relatorio-sintetico_por_data.component';  
import {Graficosintetico_por_dataComponent}  from "./relatorios/sintetico_por_data/grafico-sintetico_por_data.component"; 
import {sintetico_por_dataService} from "./services/sintetico_por_data.service";  
// FIM -- REL. sintetico_por_data 
// INICIO -- REL. sintetico_por_cardapio 
import {Filtrorelsintetico_por_cardapioComponent} from './relatorios/sintetico_por_cardapio/filtrorel-sintetico_por_cardapio.component';  
import {relatoriosintetico_por_cardapioComponent} from './relatorios/sintetico_por_cardapio/relatorio-sintetico_por_cardapio.component';  
import {Graficosintetico_por_cardapioComponent}  from "./relatorios/sintetico_por_cardapio/grafico-sintetico_por_cardapio.component"; 
import {sintetico_por_cardapioService} from "./services/sintetico_por_cardapio.service";  
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"; 
import {ReactiveFormsModule,FormsModule} from "@angular/forms";  
import {AppRoutingModule} from "./app.routing";
import {APP_BASE_HREF} from '@angular/common'; 
import {MenuComponent} from './menu/menu.component'; 
import {FooterComponent} from './footer/footer.component';  
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator';  
import {MatButtonModule} from '@angular/material/button'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatNativeDateModule} from '@angular/material/core'; 
import {MatInputModule} from '@angular/material/input'; 
import {MaterialModules} from './materials-modules'; 
import {MatConfirmDialogComponent } from './shared/dialog.component'; 
import {GoogleChartComponent } from './shared/google.chart.component';
import { GoogleChartsModule } from 'angular-google-charts'; 
import {NgxMaskModule} from 'ngx-mask'; 
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core'; 
import {MatDialogModule} from "@angular/material/dialog"; 
import {permissoes_camposComponent} from './permissoes_campos/permissoes_campos.component'; 
import {camposComponent} from './campos/campos.component'; 
import { grupo_usuariosFilterPipe } from './shared/grupo_usuarios-filter.pipe';  
import { permissoes_tabelasFilterPipe } from './shared/permissoes_tabelas-filter.pipe';  
import { tabelasFilterPipe } from './shared/tabelas-filter.pipe';  
import { usuariosFilterPipe } from './shared/usuarios-filter.pipe'; 
import {grupo_usuariosService} from "./services/grupo_usuarios.service"; 
import {permissoes_tabelasService} from "./services/permissoes_tabelas.service"; 
import {tabelasService} from "./services/tabelas.service";  
import {usuariosService} from "./services/usuarios.service";;
import { UnscapeDirective } from './shared/unscape.directive'  

const config = {apiKey: "x8bqn_XJeWpMQ5ztrlfpqrnd",
authDomain: "",
databaseURL: "",
projectId: "465265577078-4rect81oj540cprnts9o5hd1brro94ou.apps.googleusercontent.com",
storageBucket: "",
messagingSenderId: ""}

@NgModule({ 
  declarations: [ 
    BrancoComponent,
    TranslatePipe,  
    PaymentCompenent,
    UnescapePipe,
    LoadImage, 
    LoadProduct,
    ElementsComponent,
    LoadCarrinho,
    LoadEndereco,
    Loadhistorico,
    LoadSabores,
    LoaderComponent,  
    AppComponent, 
    LoginComponent, 
    PrincipalComponent,  
    EditableComponent,  
    ViewModeDirective,  
    EditModeDirective,  
    FocusableDirective,  
    EditableOnEnterDirective,  
    Listargrupo_usuariosComponent,  
    Formgrupo_usuariosComponent,  
    Filtrorelgrupo_usuariosComponent,  
    Relatoriogrupo_usuariosComponent,  
    Graficogrupo_usuariosComponent,  
    ListartabelasComponent,   
    PedidosCozinhaComponent,
    PedidosGeralComponent,
    FormtabelasComponent,   
    FiltroreltabelasComponent, 
    RelatoriotabelasComponent,  
    GraficotabelasComponent,  
    ListarusuariosComponent,  
    FormusuariosComponent,   
    FiltrorelusuariosComponent,   
    RelatoriousuariosComponent,  
    GraficousuariosComponent,  
    Listarpermissoes_tabelasComponent,  
    Formpermissoes_tabelasComponent,  
    Filtrorelpermissoes_tabelasComponent,  
    Relatoriopermissoes_tabelasComponent,  
    Graficopermissoes_tabelasComponent,  
    camposComponent,  
    permissoes_camposComponent, 
    grupo_usuariosFilterPipe, 
    permissoes_tabelasFilterPipe,  
    tabelasFilterPipe,  
    usuariosFilterPipe,  
    ListarbonificacaoComponent, 
    FormbonificacaoComponent, 
    FiltrorelbonificacaoComponent, 
    relatoriobonificacaoComponent, 
    GraficobonificacaoComponent, 
    bonificacaoHelpComponent, 
    ListarcardapioComponent, 
    FormcardapioComponent, 
    FiltrorelcardapioComponent, 
    relatoriocardapioComponent, 
    GraficocardapioComponent, 
    cardapioHelpComponent, 
    ListarcategoriasComponent, 
    FormcategoriasComponent, 
    FiltrorelcategoriasComponent, 
    relatoriocategoriasComponent, 
    GraficocategoriasComponent, 
    categoriasHelpComponent, 
    ListarenderecoComponent, 
    FormenderecoComponent, 
    FiltrorelenderecoComponent, 
    relatorioenderecoComponent, 
    GraficoenderecoComponent, 
    enderecoHelpComponent, 
    ListarpedidosComponent, 
    FormpedidosComponent, 
    FiltrorelpedidosComponent, 
    relatoriopedidosComponent, 
    GraficopedidosComponent, 
    pedidosHelpComponent, 
    ListarsaboresComponent, 
    FormsaboresComponent, 
    FiltrorelsaboresComponent, 
    relatoriosaboresComponent, 
    GraficosaboresComponent, 
    saboresHelpComponent, 
    ListarvendedoresComponent, 
    FormvendedoresComponent, 
    FiltrorelvendedoresComponent, 
    relatoriovendedoresComponent, 
    GraficovendedoresComponent, 
    vendedoresHelpComponent, 
// INICIO -- REL. lista_pedidos 
    Filtrorellista_pedidosComponent, 
    relatoriolista_pedidosComponent, 
    Graficolista_pedidosComponent, 
// FIM -- REL. vendedores 
// INICIO -- REL. sintetico_por_data 
    Filtrorelsintetico_por_dataComponent, 
    relatoriosintetico_por_dataComponent, 
    Graficosintetico_por_dataComponent, 
// FIM -- REL. vendedores 
// INICIO -- REL. sintetico_por_cardapio 
    Filtrorelsintetico_por_cardapioComponent, 
    relatoriosintetico_por_cardapioComponent, 
    Graficosintetico_por_cardapioComponent, 
// FIM -- REL. vendedores 
// INICIO -- APONTAMENTO. checklist_pedidos 
    Filtroaptochecklist_pedidosComponent, 
    Apontamentochecklist_pedidosComponent, 
    AptoTimechecklist_pedidosComponent, 
    Aptochildchecklist_pedidosComponent, 
// FIM -- REL. vendedores 
// COMPONENTES DE ITEMS (MESTRE-DETALHE) 
    itensComponent, 
//FIM - COMPONENTES DE ITEMS (MESTRE-DETALHE) 
    MenuComponent,  
    FooterComponent, 
    MatConfirmDialogComponent,  
    bonificacaoFilterPipe, 
    cardapioFilterPipe, 
    categoriasFilterPipe, 
    enderecoFilterPipe, 
    pedidosFilterPipe, 
    saboresFilterPipe, 
    vendedoresFilterPipe, 
    GoogleChartComponent , UnscapeDirective
  ],     

  imports: [  
    //AmplifyAngularModule, 
    BackButtonDisableModule.forRoot(/*{
      preserveScrollPosition: true
    }*/),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StripeModule.forRoot("pk_test_51H5ZHFBftWZwyVin46VVubK8vak7PAa4bOA5mC4NnEGcnIvZEUupinbcPm5EO1U4eNPMcg4rVAnQHPO7Ts29OvJQ00FyP1KTFY"),
    BrowserModule,
    SocialLoginModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyC-dO8XwYDNtqOktv8QWJtG3o35PiOED2M', libraries: ['places','geometry']}),
    AgmDirectionModule,
    DeviceDetectorModule.forRoot(), 
    //.register('ngsw-worker.js', { enabled: environment.production && environment.platform === 'pwa' }),  
    DateTimePickerModule, 
    MaterialFileInputModule,
    GoogleChartsModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatDialogModule, 
    NgxMaskModule.forRoot(), 
    BrowserAnimationsModule, 
    MaterialModules, 
    BrowserModule,  
    AppRoutingModule,  
    HttpClientModule, 
    BrowserAnimationsModule, 
    MatTableModule,   
    MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatNativeDateModule, MatInputModule 
  ], 
  exports: [MatButtonModule, MatCheckboxModule],  
  providers: [ {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {

          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('277132186906569'),
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '465265577078-4rect81oj540cprnts9o5hd1brro94ou.apps.googleusercontent.com'
          ),
        },
      ],
      } as SocialAuthServiceConfig,
      },
      //{provide: AmplifyService, useFactory:  () => { return AmplifyModules({ Auth, Storage, Interactions }); }},   
      //AmplifyService, 
      GoogleMapsAPIWrapper,
      TRANSLATION_PROVIDERS, TranslateService, 
      LoaderService, 
      grupo_usuariosService,
      permissoes_tabelasService, 
      tabelasService,  
      usuariosService,
// INICIO DECLARACAO SERVICES NO PROVIDERS -- bonificacao 
   bonificacaoService,  
   cardapioService,  
   categoriasService,  
   enderecoService,  
   itensService,  
   pedidosService,  
   saboresService,  
   vendedoresService,  
// INICIO -- SERVICE relatorios
   lista_pedidosService,  
   sintetico_por_dataService,  
   sintetico_por_cardapioService,  
// FIM -- SERVICE relatorios 
    AuthService,  
    AuthServicefb,
    AuthGuard, 
     {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},  
{provide: APP_BASE_HREF, useValue: '/'}, 
      {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi : true}, //desabilidado pois usavaparamandar o token no headers   
   //{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => MyControlComponent),
  ], 
    bootstrap: [AppComponent], 
    entryComponents:[MatConfirmDialogComponent
    ,ElementsComponent
    ,PaymentCompenent
    ,LoadImage  
    ,LoadProduct
    ,LoadCarrinho
    ,LoadEndereco
    ,Loadhistorico
    ,LoadSabores
    ,camposComponent 
    ,permissoes_camposComponent 
    ,Relatoriogrupo_usuariosComponent 
    ,Relatoriopermissoes_tabelasComponent  
    ,RelatoriotabelasComponent  
    ,RelatoriousuariosComponent 
    ,itensComponent 
    ,relatoriobonificacaoComponent 
    ,bonificacaoHelpComponent 
    ,relatoriocardapioComponent 
    ,cardapioHelpComponent 
    ,relatoriocategoriasComponent 
    ,categoriasHelpComponent 
    ,relatorioenderecoComponent 
    ,enderecoHelpComponent 
    ,relatoriopedidosComponent 
    ,pedidosHelpComponent 
    ,relatoriosaboresComponent 
    ,saboresHelpComponent 
    ,relatoriovendedoresComponent 
    ,vendedoresHelpComponent 
]}) 



export class AppModule { } 
