import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MecanicaInterface} from '../../../../interfaces/mecanica.interface';
import {ListarMecanicaComponent} from '../../componentes/listar-mecanica/listar-mecanica.component';

@Component({
  selector: 'app-modal-crear-editar-mecanica',
  templateUrl: 'modal-crear-editar-mecanica.component.html',
  styleUrls: ['modal-crear-editar-mecanica.component.sass']
})
export class ModalCrearEditarMecanicaComponent implements OnInit {

  mecanicaCrearEditar: MecanicaInterface | boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<ListarMecanicaComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: MecanicaInterface | boolean
  ) {}

  ngOnInit() {
    if (!this._datos) {
    } else {
      this.mecanicaCrearEditar = this._datos;
    }
  }

  crearEditarMecanica(mecanica: MecanicaInterface | boolean) {
    (!mecanica) ? this.mecanicaCrearEditar = undefined : this.mecanicaCrearEditar = mecanica as object;
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.mecanicaCrearEditar);
  }

  cancelarModal() {
    this._dialogRef.close();
  }
}
