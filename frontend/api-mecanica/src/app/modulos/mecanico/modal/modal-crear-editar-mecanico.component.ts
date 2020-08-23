import {Component, Inject, OnInit} from '@angular/core';
import {MecanicoInterface} from '../../../interfaces/mecanico.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListarMecanicoComponent} from '../componentes/listar-mecanico/listar-mecanico.component';

@Component({
  selector: 'app-modal-crear-editar-mecanica',
  templateUrl: 'modal-crear-editar-mecanico.component.html',
  styleUrls: ['modal-crear-editar-mecanico.component.sass']
})
export class ModalCrearEditarMecanicoComponent implements OnInit {

  mecanicoCrearEditar: MecanicoInterface | boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<ListarMecanicoComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: MecanicoInterface | boolean
  ) {}

  ngOnInit() {
    if (!this._datos) {
    } else {
      this.mecanicoCrearEditar = this._datos;
    }
  }

  crearEditarMecanico(mecanico: MecanicoInterface | boolean) {
    (!mecanico) ? this.mecanicoCrearEditar = undefined : this.mecanicoCrearEditar = mecanico as object;
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.mecanicoCrearEditar);
  }

  cancelarModal() {
    this._dialogRef.close();
  }
}
