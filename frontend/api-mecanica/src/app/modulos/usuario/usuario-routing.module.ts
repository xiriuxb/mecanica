import {RouterModule, Routes} from '@angular/router';
import {RutaCrearEditarUsuarioComponent} from './rutas/ruta-crear-editar-usuario/ruta-crear-editar-usuario.component';
import {RutaListarUsuarioComponent} from './rutas/ruta-listar-usuario/ruta-listar-usuario.component';
import {NgModule} from '@angular/core';

export const rutasUsuario: Routes = [
  {
    path: 'crear',
    component: RutaCrearEditarUsuarioComponent
  },
  {
    path: 'editar/:idUsuario',
    component: RutaCrearEditarUsuarioComponent
  },
  {
    path: 'listar',
    component: RutaListarUsuarioComponent
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(rutasUsuario)]
})
export class UsuarioRoutingModule {}
