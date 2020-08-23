import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InicioComponent} from './rutas/inicio/inicio.component';
import {NoEncontradoComponent} from './rutas/no-encontrado/no-encontrado.component';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {LugarService} from './servicios/lugar-service/lugar.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {TableModule} from 'primeng/table';
import {MecanicoService} from './servicios/mecanico-service/mecanico.service';
import {ActividadService} from './servicios/actividad/actividad.service';
import {ActividadPorMecanicoService} from './servicios/actividad-por-mecanico/actividad-por-mecanico.service';
import {UsuarioService} from './servicios/usuario-service/usuario.service';
import {RolPorUsuarioService} from './servicios/rol-por-usuario-service/rol-por-usuario.service';
import {VehiculoService} from './servicios/vehiculo/vehiculo.service';
import {CreditoService} from './servicios/credito-service/credito.service';
import {HistoriaCreditoService} from './servicios/credito-service/historia-credito.service';
import {MecanicaService} from './servicios/mecanica/mecanica.service';
import {ActividadPorMecanicaService} from './servicios/actividad-por-mecanica/actividad-por-mecanica.service';
import {MecanicoPorMecanicaService} from './servicios/mecanico-por-mecanica/mecanico-por-mecanica.service';
import {ServicioService} from './servicios/servicio/servicio.service';
import {WebsocketService} from './servicios/websocket/websocket.service';
import {MecanicoPorServicioService} from './servicios/mecanico-por-servicio/mecanico-por-servicio.service';
import {CookieModule} from 'ngx-cookie';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {BreadcrumbsModule} from 'ng6-breadcrumbs';
import {NavbarComponent} from './componentes/navbar/navbar.component';
import {FooterComponent} from './componentes/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NoEncontradoComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    ToasterModule.forRoot(),
    TableModule,
    CookieModule.forRoot(),
    BreadcrumbModule,
    BreadcrumbsModule

  ],
  providers: [
    LugarService,
    MecanicoService,
    ActividadService,
    ActividadPorMecanicoService,
    UsuarioService,
    RolPorUsuarioService,
    VehiculoService,
    CreditoService,
    HistoriaCreditoService,
    MecanicaService,
    ActividadPorMecanicaService,
    MecanicoPorMecanicaService,
    ServicioService,
    WebsocketService,
    MecanicoPorServicioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
