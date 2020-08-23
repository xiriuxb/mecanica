import {RouterModule, Routes} from '@angular/router';
import {RutaCrearEditarClienteComponent} from './rutas/ruta-crear-editar-cliente/ruta-crear-editar-cliente.component';
import {RutaListarClienteComponent} from './rutas/ruta-listar-cliente/ruta-listar-cliente.component';
import {NgModule} from '@angular/core';
import {RutaListarVehiculoComponent} from '../vehiculo/rutas/ruta-listar-vehiculo/ruta-listar-vehiculo.component';

export const rutasCliente: Routes = [
  {
    path: 'crear',
    component: RutaCrearEditarClienteComponent
  },
  {
    path: 'editar/:idCliente',
    component: RutaCrearEditarClienteComponent
  },
  {
    path: 'listar',
    component: RutaListarClienteComponent
  },
  {
    path: 'vehiculo/listar/:idUsuario',
    component: RutaListarVehiculoComponent,
    data: {
      breadcrumb: 'Vehiculo de cliente'
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(rutasCliente)]
})
export class ClienteRoutingModule {}
