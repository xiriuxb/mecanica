import {NgModule} from '@angular/core';
import {ClienteRoutingModule} from './cliente-routing.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {MatDialogModule} from '@angular/material/dialog';
import {RutaCrearEditarClienteComponent} from './rutas/ruta-crear-editar-cliente/ruta-crear-editar-cliente.component';
import {RutaListarClienteComponent} from './rutas/ruta-listar-cliente/ruta-listar-cliente.component';
import {CrearEditarClienteComponent} from './componentes/crear-editar-cliente/crear-editar-cliente.component';
import {ListarClienteComponent} from './componentes/listar-cliente/listar-cliente.component';
import {MatSelectModule} from '@angular/material/select';
import {TextMaskModule} from 'angular2-text-mask';
import {ModalCrearEditarClienteComponent} from './modal/moda-crear-editar-cliente/modal-crear-editar-cliente.component';
import {PipesModule} from '../../pipes/modulo-pipes/pipes.module';
import {RutaListarVehiculoComponent} from '../vehiculo/rutas/ruta-listar-vehiculo/ruta-listar-vehiculo.component';
import {ListarVehiculoComponent} from '../vehiculo/componente/listar-vehiculo/listar-vehiculo.component';
import {ModalCrearVehiculoComponent} from '../vehiculo/modal/modal-crear-vehiculo/modal-crear-vehiculo.component';
import {RutaCrearVehiculoComponent} from '../vehiculo/rutas/ruta-crear-vehiculo/ruta-crear-vehiculo.component';
import {CrearVehiculoComponent} from '../vehiculo/componente/crear-vehiculo/crear-vehiculo.component';

@NgModule({
  imports: [
    ClienteRoutingModule,
    CommonModule,
    RouterModule,
    TableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToasterModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    TextMaskModule,
    PipesModule
  ],
  declarations: [
    RutaCrearEditarClienteComponent,
    RutaListarClienteComponent,
    CrearEditarClienteComponent,
    ListarClienteComponent,
    ModalCrearEditarClienteComponent,
    RutaListarVehiculoComponent,
    RutaCrearVehiculoComponent,
    ListarVehiculoComponent,
    CrearVehiculoComponent,
    ModalCrearVehiculoComponent,

  ],
  entryComponents: [
    ModalCrearEditarClienteComponent,
    ModalCrearVehiculoComponent],
  providers: []
})
export class ClienteModule {}
