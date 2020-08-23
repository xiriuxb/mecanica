import {NgModule} from '@angular/core';
import {GeneralUsuarioRoutingModule} from './general-usuario-routing.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {MatDialogModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {PipesModule} from '../../pipes/modulo-pipes/pipes.module';
import {TextMaskModule} from 'angular2-text-mask';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {RutaCrearUsuarioGeneralComponent} from './rutas/ruta-crear-usuario/ruta-crear-usuario-general.component';
import {CrearUsuarioGeneralComponent} from './componentes/crear-usuario/crear-usuario-general.component';

@NgModule({
  imports: [
    GeneralUsuarioRoutingModule,
    CommonModule,
    RouterModule,
    TableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToasterModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    PipesModule,
    TextMaskModule,
    CurrencyMaskModule
  ],
  declarations: [
    RutaCrearUsuarioGeneralComponent,
    CrearUsuarioGeneralComponent
  ]
})
export class GeneralUsuarioModule {}
