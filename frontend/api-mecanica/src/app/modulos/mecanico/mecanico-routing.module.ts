import {RouterModule, Routes} from '@angular/router';
import {RutaCrearEditarMecanicoComponent} from './rutas/ruta-crear-editar-mecanico/ruta-crear-editar-mecanico.component';
import {RutaListarMecanicoComponent} from './rutas/ruta-listar-mecanico/ruta-listar-mecanico.component';
import {NgModule} from '@angular/core';
import {RutaListarActividadPorMecanicoComponent} from './rutas/ruta-listar-actividad-por-mecanico/ruta-listar-actividad-por-mecanico.component';
import {RutaCrearEditarActividadPorMecanico} from './rutas/ruta-crear-editar-actividad-por-mecanico/ruta-crear-editar-actividad-por-mecanico';

export const rutasMecanico: Routes = [
  {
    path: 'crear',
    component: RutaCrearEditarMecanicoComponent
  },
  {
    path: 'editar/:idMecanico',
    component: RutaCrearEditarMecanicoComponent
  },
  {
    path: 'listar',
    component: RutaListarMecanicoComponent
  },
  {
    path: 'actividad-por-mecanico/:idMecanico',
    component: RutaListarActividadPorMecanicoComponent,
    data: {
      breadcrumb: 'Actividades por mecanico'
    }
  },
  {
    path: 'actividad-por-mecanico/crear/servicio',
    component: RutaCrearEditarActividadPorMecanico,
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(rutasMecanico)]
})
export class MecanicoRoutingModule {
}
