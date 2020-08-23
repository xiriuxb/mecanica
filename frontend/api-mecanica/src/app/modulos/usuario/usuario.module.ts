import {NgModule} from '@angular/core';
import {UsuarioRoutingModule} from './usuario-routing.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {TextMaskModule} from 'angular2-text-mask';
import {RutaCrearEditarUsuarioComponent} from './rutas/ruta-crear-editar-usuario/ruta-crear-editar-usuario.component';
import {CrearEditarUsuarioComponent} from './componentes/crear-editar-usuario/crear-editar-usuario.component';
import {RutaListarUsuarioComponent} from './rutas/ruta-listar-usuario/ruta-listar-usuario.component';
import {ListarUsuarioComponent} from './componentes/listar-usuario/listar-usuario.component';
import {ModalCrearEditarUsuarioComponent} from './modal/modal-crear-editar-usuario/modal-crear-editar-usuario.component';

@NgModule({
  imports: [
    UsuarioRoutingModule,
    CommonModule,
    RouterModule,
    TableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToasterModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    TextMaskModule
  ],
  declarations: [
    RutaCrearEditarUsuarioComponent,
    CrearEditarUsuarioComponent,
    RutaListarUsuarioComponent,
    ListarUsuarioComponent,
    ModalCrearEditarUsuarioComponent
  ],
  entryComponents: [ModalCrearEditarUsuarioComponent],
  providers: []
})
export class UsuarioModule {}
