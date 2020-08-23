import {Component, Inject, OnInit} from '@angular/core';
import {ServicioInterface} from '../../../../interfaces/servicio.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ListarServicioClienteComponent} from '../../../servicio-cliente/componentes/listar-servicio-cliente/listar-servicio-cliente.component';
import {ListarServicioMecanicaComponent} from '../../componentes/listar-servicio-mecanica/listar-servicio-mecanica.component';

@Component({
  selector: 'app-modal-crear-servicio-mecanica',
  templateUrl: 'modal-crear-servicio-mecanica.component.html',
  styleUrls: ['modal-crear-servicio-mecanica.component.sass']
})
export class ModalCrearServicioMecanicaComponent implements OnInit {

  servicioCrearEditar: ServicioInterface | boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<ListarServicioMecanicaComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: ServicioInterface | boolean
  ) {}


  ngOnInit() {
    if (!this._datos) {
      console.log('crear');
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
