import {NgModule} from '@angular/core';
import {MecanicoRoutingModule} from './mecanico-routing.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {MatDialogModule} from '@angular/material/dialog';
import {RutaCrearEditarMecanicoComponent} from './rutas/ruta-crear-editar-mecanico/ruta-crear-editar-mecanico.component';
import {RutaListarMecanicoComponent} from './rutas/ruta-listar-mecanico/ruta-listar-mecanico.component';
import {CrearEditarMecanicoComponent} from './componentes/crear-editar-mecanico/crear-editar-mecanico.component';
import {ListarMecanicoComponent} from './componentes/listar-mecanico/listar-mecanico.component';
import {ModalCrearEditarMecanicoComponent} from './modal/modal-crear-editar-mecanico.component';
import {MatSelectModule} from '@angular/material/select';
import {TextMaskModule} from 'angular2-text-mask';
// tslint:disable-next-line:max-line-length
import {RutaCrearEditarActividadPorMecanico} from './rutas/ruta-crear-editar-actividad-por-mecanico/ruta-crear-editar-actividad-por-mecanico';
import {ListarActividadPorMecanicoComponent} from './componentes/listar-actividad-por-mecanico/listar-actividad-por-mecanico.component';
// tslint:disable-next-line:max-line-length
import {RutaListarActividadPorMecanicoComponent} from './rutas/ruta-listar-actividad-por-mecanico/ruta-listar-actividad-por-mecanico.component';
// tslint:disable-next-line:max-line-length
import {CrearEditarActividadPorMecanicoComponent} from './componentes/crear-editar-actividad-por-mecanico/crear-editar-actividad-por-mecanico.component';
// tslint:disable-next-line:max-line-length
import {ModalCrearActividadPorMecanicoComponent} from './modal/modal-crear-actividad-por-mecanico/modal-crear-actividad-por-mecanico.component';
import {PipesModule} from '../../pipes/modulo-pipes/pipes.module';

@NgModule({
  imports: [
    MecanicoRoutingModule,
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
    PipesModule
  ],
  declarations: [
    RutaCrearEditarMecanicoComponent,
    RutaListarMecanicoComponent,
    CrearEditarMecanicoComponent,
    ListarMecanicoComponent,
    RutaCrearEditarActividadPorMecanico,
    RutaListarActividadPorMecanicoComponent,
    ListarActividadPorMecanicoComponent,
    CrearEditarActividadPorMecanicoComponent,
    ModalCrearEditarMecanicoComponent,
    ModalCrearActividadPorMecanicoComponent
  ],
  entryComponents: [ModalCrearEditarMecanicoComponent, ModalCrearActividadPorMecanicoComponent],
  providers: [],
  exports: [
    RutaCrearEditarMecanicoComponent,
    RutaListarMecanicoComponent,
    CrearEditarMecanicoComponent,
    ListarMecanicoComponent,
    RutaCrearEditarActividadPorMecanico,
    RutaListarActividadPorMecanicoComponent,
    ListarActividadPorMecanicoComponent,
    CrearEditarActividadPorMecanicoComponent,
    ModalCrearEditarMecanicoComponent,
    ModalCrearActividadPorMecanicoComponent
  ]
})
export class MecanicoModule {}
