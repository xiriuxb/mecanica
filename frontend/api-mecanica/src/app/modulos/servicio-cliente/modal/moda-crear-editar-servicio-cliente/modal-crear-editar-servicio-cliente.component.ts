import {Component, Inject, OnInit} from '@angular/core';
import {ServicioInterface} from '../../../../interfaces/servicio.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ListarServicioClienteComponent} from '../../componentes/listar-servicio-cliente/listar-servicio-cliente.component';

@Component({
  selector: 'app-modal-crear-editar-servicio-cliente',
  templateUrl: 'modal-crear-editar-servicio-cliente.component.html',
  styleUrls: ['modal-crear-editar-servicio-cliente.component.sass']
})
export class ModalCrearEditarServicioClienteComponent implements OnInit {

  servicioCrearEditar: ServicioInterface | boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<ListarServicioClienteComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: ServicioInterface | boolean
  ) {}


  ngOnInit() {
    if (!this._datos) {
    } else {
      this.servicioCrearEditar = this._datos;
    }
  }

  crearEditarServicio(servicio: ServicioInterface | boolean) {
    (!servicio) ? this.servicioCrearEditar = undefined : this.servicioCrearEditar = servicio as object;
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.servicioCrearEditar);
  }

  cancelarModal() {
    this._dialogRef.close();
  }
}
