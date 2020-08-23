import {RouterModule, Routes} from '@angular/router';
// tslint:disable-next-line:max-line-length
import {RutaCrearEditarServicioClienteComponent} from './rutas/ruta-crear-editar-servicio-cliente/ruta-crear-editar-servicio-cliente.component';
import {RutaListarServicioClienteComponent} from './rutas/ruta-listar-servicio-cliente/ruta-listar-servicio-cliente.component';
import {NgModule} from '@angular/core';

export const rutasServicioCliente: Routes = [
  {
    path: 'editar/:idServicio',
    component: RutaCrearEditarServicioClienteComponent
  },
  {
    path: 'listar',
    component: RutaListarServicioClienteComponent
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(rutasServicioCliente)]
})
export class ServicioClienteRoutingModule {}
