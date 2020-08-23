import {NgModule} from '@angular/core';
import {CreditoRoutingModule} from './credito-routing.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {MatDialogModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {TextMaskModule} from 'angular2-text-mask';
import {RutaListarCreditoComponent} from './rutas/ruta-listar-credito/ruta-listar-credito.component';
import {RutaCrearCreditoComponent} from './rutas/ruta-crear-credito/ruta-crear-credito.component';
import {CrearCreditoComponent} from './componentes/crear-credito/crear-credito.component';
import {ListarCreditoComponent} from './componentes/listar-credito/listar-credito.component';
import {PipesModule} from '../../pipes/modulo-pipes/pipes.module';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {ModalCrearCreditoComponent} from './modal/crear-credito/modal-crear-credito.component';

@NgModule({
  imports: [
    CreditoRoutingModule,
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
    RutaListarCreditoComponent,
    RutaCrearCreditoComponent,
    CrearCreditoComponent,
    ListarCreditoComponent,
    ModalCrearCreditoComponent
  ],
  entryComponents: [ModalCrearCreditoComponent],
  providers: []
})
export class CreditoModule {}
