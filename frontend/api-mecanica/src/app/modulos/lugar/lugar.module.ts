import {NgModule} from '@angular/core';
import {LugarRoutingModule} from './lugar-routing.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {RutaCrearEditarLugarComponent} from './rutas/ruta-crear-editar-lugar/ruta-crear-editar-lugar.component';
import {RutaListarLugarComponent} from './rutas/ruta-listar-lugar/ruta-listar-lugar.component';
import {CrearEditarLugarComponent} from './componentes/crear-editar-lugar/crear-editar-lugar.component';
import {ListarLugarComponent} from './componentes/listar-lugar/listar-lugar.component';
import {TableModule} from 'primeng/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalCrearEditarLugarComponent} from './modal/modal-crear-editar-lugar.component';

@NgModule({
  imports: [
    LugarRoutingModule,
    CommonModule,
    RouterModule,
    TableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToasterModule,
    MatDialogModule,
    FormsModule,
  ],
  declarations: [
    RutaCrearEditarLugarComponent,
    RutaListarLugarComponent,
    CrearEditarLugarComponent,
    ListarLugarComponent,
    ModalCrearEditarLugarComponent
  ],
  entryComponents: [ModalCrearEditarLugarComponent],
  providers: []
})
export class LugarModule {}
