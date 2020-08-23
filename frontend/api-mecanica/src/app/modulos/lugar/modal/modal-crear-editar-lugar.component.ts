import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListarLugarComponent} from '../componentes/listar-lugar/listar-lugar.component';
import {LugarInterface} from '../../../interfaces/lugar.interface';

@Component({
  selector: 'app-modal-crear-editar-lugar',
  templateUrl: 'modal-crear-editar-lugar.component.html',
  styleUrls: ['modal-crear-editar-lugar.component.sass']
})
export class ModalCrearEditarLugarComponent implements OnInit {

  lugarCrearEditar: LugarInterface | boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<ListarLugarComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: LugarInterface | boolean,
  ) {}

  ngOnInit() {
    if (!this._datos) {
    } else {
      this.lugarCrearEditar = this._datos;
    }
  }

  crearEditarLugar(lugar: LugarInterface | boolean) {
     (!lugar) ? this.lugarCrearEditar = undefined : this.lugarCrearEditar = lugar as object;
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.lugarCrearEditar);
  }

  cancelarModal() {
    this._dialogRef.close();
  }
}
