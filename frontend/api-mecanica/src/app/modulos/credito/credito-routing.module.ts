import {RouterModule, Routes} from '@angular/router';
import {RutaCrearCreditoComponent} from './rutas/ruta-crear-credito/ruta-crear-credito.component';
import {RutaListarCreditoComponent} from './rutas/ruta-listar-credito/ruta-listar-credito.component';
import {NgModule} from '@angular/core';

export const rutasCredito: Routes = [
  {
    path: 'crear',
    component: RutaCrearCreditoComponent
  },
  {
    path: 'listar',
    component: RutaListarCreditoComponent
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(rutasCredito)]
})
export class CreditoRoutingModule {}
