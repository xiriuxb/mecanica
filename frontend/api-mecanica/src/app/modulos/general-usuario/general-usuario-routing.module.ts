import {RouterModule, Routes} from '@angular/router';
import {RutaCrearUsuarioGeneralComponent} from './rutas/ruta-crear-usuario/ruta-crear-usuario-general.component';
import {NgModule} from '@angular/core';

export const rutaGeneralUsuario: Routes = [
  {
    path: 'crear',
    component: RutaCrearUsuarioGeneralComponent
  },
  {
    path: '',
    redirectTo: 'crear',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(rutaGeneralUsuario)]
})
export class GeneralUsuarioRoutingModule {}
