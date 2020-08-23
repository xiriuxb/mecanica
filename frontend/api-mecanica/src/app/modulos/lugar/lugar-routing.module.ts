import {RouterModule, Routes} from '@angular/router';
import {RutaCrearEditarLugarComponent} from './rutas/ruta-crear-editar-lugar/ruta-crear-editar-lugar.component';
import {RutaListarLugarComponent} from './rutas/ruta-listar-lugar/ruta-listar-lugar.component';
import {NgModule} from '@angular/core';

export const rutasLugar: Routes = [
  {
    path: 'crear',
    component: RutaCrearEditarLugarComponent
  },
  {
    path: 'editar/:idLugar',
    component: RutaCrearEditarLugarComponent
  },
  {
    path: 'listar',
    component: RutaListarLugarComponent
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(rutasLugar)]
})
export class LugarRoutingModule {}
