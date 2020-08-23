import {NgModule} from '@angular/core';
import {LoginRoutingModule} from './login-routing.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {MatDialogModule} from '@angular/material/dialog';
import {RutaIngresarLoginComponent} from './rutas/ruta-ingresar-login/ruta-ingresar-login.component';
import {IngresarLoginComponent} from './componentes/ingresar-login/ingresar-login.component';
import {TextMaskModule} from 'angular2-text-mask';
import {ModalCambiarContraseniaComponent} from './modal/modal-cambiar-contrasenia/modal-cambiar-contrasenia.component';
import {CambiarContraseniaComponent} from './componentes/cambiar-contrasenia/cambiar-contrasenia.component';

@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule,
    RouterModule,
    TableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToasterModule,
    MatDialogModule,
    TextMaskModule
  ],
  declarations: [
    RutaIngresarLoginComponent,
    IngresarLoginComponent,
    ModalCambiarContraseniaComponent,
    CambiarContraseniaComponent
  ],
  entryComponents: [
    ModalCambiarContraseniaComponent
  ],
  providers: []
})
export class LoginModule {}
