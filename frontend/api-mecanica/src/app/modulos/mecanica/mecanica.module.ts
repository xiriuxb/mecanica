import {NgModule} from '@angular/core';
import {MecanicaRoutingModule} from './mecanica-routing.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {MatDialogModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {TextMaskModule} from 'angular2-text-mask';
import {PipesModule} from '../../pipes/modulo-pipes/pipes.module';
import {RutaCrearEditarMecanicaComponent} from './rutas/ruta-crear-editar-mecanica/ruta-crear-editar-mecanica.component';
import {RutaListarMecanicaComponent} from './rutas/ruta-listar-mecanica/ruta-listar-mecanica.component';
import {CrearEditarMecanicaComponent} from './componentes/crear-editar-mecanica/crear-editar-mecanica.component';
import {ListarMecanicaComponent} from './componentes/listar-mecanica/listar-mecanica.component';
import {ModalCrearEditarMecanicaComponent} from './modal/modal-crear-editar-mecanica/modal-crear-editar-mecanica.component';
import {RutaListarMecanicoPorMecanicaComponent} from '../mecanico-por-mecanica/Rutas/ruta-listar-mecanico-por-mecanica/ruta-listar-mecanico-por-mecanica.component';
import {LitarMecanicoPorMecanicaComponent} from '../mecanico-por-mecanica/componentes/listar-mecanico-por-mecanica/litar-mecanico-por-mecanica.component';
import {RutaCrearMecanicoPorMecanicaComponent} from '../mecanico-por-mecanica/Rutas/ruta-crear-mecanico-por-mecanica/ruta-crear-mecanico-por-mecanica.component';
import {CrearMecanicoPorMecanicaComponent} from '../mecanico-por-mecanica/componentes/crear-mecanico-por-mecanica/crear-mecanico-por-mecanica.component';
import {ModalCrearMecanicoPorMecanicaComponent} from '../mecanico-por-mecanica/modal/modal-crear-mecanico-por-mecanica/modal-crear-mecanico-por-mecanica.component';
import {RutaCrearServicioMecanicaComponent} from '../servicio-mecanica/rutas/ruta-crear-servicio-mecanica/ruta-crear-servicio-mecanica.component';
import {RutaListarServicioMecanicaComponent} from '../servicio-mecanica/rutas/ruta-listar-servicio-mecanica/ruta-listar-servicio-mecanica.component';
import {CrearServicioMecanicaComponent} from '../servicio-mecanica/componentes/crear-servicio-mecanica/crear-servicio-mecanica.component';
import {ListarServicioMecanicaComponent} from '../servicio-mecanica/componentes/listar-servicio-mecanica/listar-servicio-mecanica.component';
import {ModalCrearServicioMecanicaComponent} from '../servicio-mecanica/modal/modal-crear-servicio-mecanica/modal-crear-servicio-mecanica.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {RutaCrearActividadPorMecanicaComponent} from '../actividad-por-mecanica/rutas/ruta-editar-actividad-por-mecanica/ruta-crear-actividad-por-mecanica.component';
import {RutaListarActividadPorMecanicaComponent} from '../actividad-por-mecanica/rutas/ruta-listar-actividad-por-mecanica/ruta-listar-actividad-por-mecanica.component';
import {CrearActividadPorMecanicaComponent} from '../actividad-por-mecanica/componentes/crear-actividad-por-mecanica/crear-actividad-por-mecanica.component';
import {ListarActividadPorMecanicaComponent} from '../actividad-por-mecanica/componentes/listar-actividad-por-mecanica/listar-actividad-por-mecanica.component';
import {ModalCrearActividadPorMecanicaComponent} from '../actividad-por-mecanica/modal/modal-crear-actividad-por-mecanica/modal-crear-actividad-por-mecanica.component';
import {MecanicoModule} from '../mecanico/mecanico.module';

@NgModule({
  imports: [
    MecanicaRoutingModule,
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
    PipesModule,
    CurrencyMaskModule,
    MecanicoModule
  ],
  declarations: [
    RutaCrearEditarMecanicaComponent,
    RutaListarMecanicaComponent,
    CrearEditarMecanicaComponent,
    ListarMecanicaComponent,
    ModalCrearEditarMecanicaComponent,
    RutaCrearMecanicoPorMecanicaComponent,
    RutaListarMecanicoPorMecanicaComponent,
    CrearMecanicoPorMecanicaComponent,
    LitarMecanicoPorMecanicaComponent,
    ModalCrearMecanicoPorMecanicaComponent,
    RutaCrearServicioMecanicaComponent,
    RutaListarServicioMecanicaComponent,
    CrearServicioMecanicaComponent,
    ListarServicioMecanicaComponent,
    ModalCrearServicioMecanicaComponent,
    RutaCrearActividadPorMecanicaComponent,
    RutaListarActividadPorMecanicaComponent,
    CrearActividadPorMecanicaComponent,
    ListarActividadPorMecanicaComponent,
    ModalCrearActividadPorMecanicaComponent
  ],
  entryComponents: [
    ModalCrearServicioMecanicaComponent,
    ModalCrearEditarMecanicaComponent,
    ModalCrearMecanicoPorMecanicaComponent,
    ModalCrearActividadPorMecanicaComponent
  ],
  providers: []
})
export class MecanicaModule {}
