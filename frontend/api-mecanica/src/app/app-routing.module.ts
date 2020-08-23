import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './rutas/inicio/inicio.component';
import {NoEncontradoComponent} from './rutas/no-encontrado/no-encontrado.component';


const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./modulos/login/login.module').then(modulo => modulo.LoginModule)
  },
  {
    path: 'lugar',
    loadChildren: () => import('./modulos/lugar/lugar.module').then(modulo => modulo.LugarModule),
    data: {
      breadcrumb: 'Lugar'
    }
  },
  {
    path: 'mecanico',
    loadChildren: () => import('./modulos/mecanico/mecanico.module').then(modulo => modulo.MecanicoModule),
    data: {
      breadcrumb: 'Mecanico'
    }
  },
  {
    path: 'usuario',
    loadChildren: () => import('./modulos/usuario/usuario.module').then(modulo => modulo.UsuarioModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./modulos/cliente/cliente.module').then((modulo => modulo.ClienteModule)),
    data: {
      breadcrumb: 'Cliente'
    }
  },
  {
    path: 'credito',
    loadChildren: () => import('./modulos/credito/credito.module').then(modulo => modulo.CreditoModule),
    data: {
      breadcrumb: 'Credito'
    }
  },
  {
    path: 'mecanica',
    loadChildren: () => import('./modulos/mecanica/mecanica.module').then(modulo => modulo.MecanicaModule),
    data: {
      breadcrumb: 'Mecanica'
    }
  },
  {
    path: 'servicio-cliente',
    loadChildren: () => import('./modulos/servicio-cliente/servicio-cliente.module').then(modulo => modulo.ServicioClienteModule),
    data: {
      breadcrumb: 'Servicio de cliente'
    }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NoEncontradoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
