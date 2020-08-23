import {NgModule} from '@angular/core';
import {ServicioClienteRoutingModule} from './servicio-cliente-routing.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {MatDialogModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {TextMaskModule} from 'angular2-text-mask';
import {PipesModule} from '../../pipes/modulo-pipes/pipes.module';
import {RutaCrearEditarServicioClienteComponent} from './rutas/ruta-crear-editar-servicio-cliente/ruta-crear-editar-servicio-cliente.component';
import {RutaListarServicioClienteComponent} from './rutas/ruta-listar-servicio-cliente/ruta-listar-servicio-cliente.component';
import {CrearEditarServicioClienteComponent} from './componentes/crear-editar-servicio-cliente/crear-editar-servicio-cliente.component';
import {ListarServicioClienteComponent} from './componentes/listar-servicio-cliente/listar-servicio-cliente.component';
import {ModalCrearEditarServicioClienteComponent} from './modal/moda-crear-editar-servicio-cliente/modal-crear-editar-servicio-cliente.component';

@NgModule({
  imports: [
    ServicioClienteRoutingModule,
    CommonModule,
    RouterModule,
    TableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToasterModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    TextMaskModule,
    PipesModule,
  ],
  declarations: [
    RutaCrearEditarServicioClienteComponent,
    RutaListarServicioClienteComponent,
    CrearEditarServicioClienteComponent,
    ListarServicioClienteComponent,
    ModalCrearEditarServicioClienteComponent
  ],
  entryComponents: [
    ModalCrearEditarServicioClienteComponent
  ],
  providers: []
})
export class ServicioClienteModule {}
