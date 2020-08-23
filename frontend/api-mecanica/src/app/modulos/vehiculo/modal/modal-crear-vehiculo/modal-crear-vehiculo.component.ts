import {Component, Inject, OnInit} from '@angular/core';
import {VehiculoInterface} from '../../../../interfaces/vehiculo.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListarVehiculoComponent} from '../../componente/listar-vehiculo/listar-vehiculo.component';

@Component({
  selector: 'app-modal-crear-vehiculo',
  templateUrl: 'modal-crear-vehiculo.component.html',
  styleUrls: ['modal-crear-vehiculo.component.sass']
})
export class ModalCrearVehiculoComponent implements OnInit {

  vehiculoCrearEditar: VehiculoInterface | boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<ListarVehiculoComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: VehiculoInterface | boolean
  ) {
  }

  ngOnInit() {
    if (!this._datos) {
    } else {
      this.vehiculoCrearEditar = this._datos;
    }
  }

  crearEditarVehiculo(vehiculo: VehiculoInterface | boolean) {
    (!vehiculo) ? this.vehiculoCrearEditar = undefined : this.vehiculoCrearEditar = vehiculo as object;
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.vehiculoCrearEditar);
  }

  cancelarModal() {
    this._dialogRef.close();
  }
}
