import {RouterModule, Routes} from '@angular/router';
import {RutaIngresarLoginComponent} from './rutas/ruta-ingresar-login/ruta-ingresar-login.component';
import {NgModule} from '@angular/core';

export const rutaLogin: Routes = [
  {
    path: '',
    component: RutaIngresarLoginComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(rutaLogin)]
})
export class LoginRoutingModule {}
