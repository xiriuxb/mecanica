import {RouterModule, Routes} from '@angular/router';
import {RutaCrearEditarMecanicaComponent} from './rutas/ruta-crear-editar-mecanica/ruta-crear-editar-mecanica.component';
import {RutaListarMecanicaComponent} from './rutas/ruta-listar-mecanica/ruta-listar-mecanica.component';
import {NgModule} from '@angular/core';
// tslint:disable-next-line:max-line-length
import {RutaListarMecanicoPorMecanicaComponent} from '../mecanico-por-mecanica/Rutas/ruta-listar-mecanico-por-mecanica/ruta-listar-mecanico-por-mecanica.component';
// tslint:disable-next-line:max-line-length
import {RutaListarServicioMecanicaComponent} from '../servicio-mecanica/rutas/ruta-listar-servicio-mecanica/ruta-listar-servicio-mecanica.component';
// tslint:disable-next-line:max-line-length
import {RutaListarActividadPorMecanicaComponent} from '../actividad-por-mecanica/rutas/ruta-listar-actividad-por-mecanica/ruta-listar-actividad-por-mecanica.component';

export const rutasMecanica: Routes = [
  {
    path: 'editar/:idMecanica',
    component: RutaCrearEditarMecanicaComponent,
  },
  {
    path: 'listar',
    component: RutaListarMecanicaComponent
  },
  {
    path: 'mecanico-por-mecanica/listar/:idMecanica',
    component: RutaListarMecanicoPorMecanicaComponent,
    data: {
      breadcrumb: 'Mecanicos por mecanica'
    }
  },
  {
    path: 'servicio-mecanica/listar/:idMecanica',
    component: RutaListarServicioMecanicaComponent,
    data: {
      breadcrumb: 'Servicio por mecanica'
    }
  },
  {
    path: 'actividad-por-mecanica/listar/:idMecanica',
    component: RutaListarActividadPorMecanicaComponent,
    data: {
      breadcrumb: 'Actividades por mecanica'
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(rutasMecanica)]
})
export class MecanicaRoutingModule {}
