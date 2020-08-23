import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LitarMecanicoPorMecanicaComponent} from '../../componentes/listar-mecanico-por-mecanica/litar-mecanico-por-mecanica.component';
import {MecanicoInterface} from '../../../../interfaces/mecanico.interface';

@Component({
  selector: 'app-modal-crear-mecanico-por-mecanica',
  templateUrl: 'modal-crear-mecanico-por-mecanica.component.html',
  styleUrls: ['modal-crear-mecanico-por-mecanica.component.sass']
})
export class ModalCrearMecanicoPorMecanicaComponent implements OnInit {

  mecanicoPorMecanicaAgregar;

  constructor(
    private readonly _dialogRef: MatDialogRef<LitarMecanicoPorMecanicaComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: MecanicoInterface
  ) {}

  ngOnInit(): void {
  }

  agregarMecanicoPorMecanica(mecanicoPorMecanica: any) {
    (!mecanicoPorMecanica) ? this.mecanicoPorMecanicaAgregar = undefined : this.mecanicoPorMecanicaAgregar = mecanicoPorMecanica as object;
  }
  enviarDatosFormulario() {
    this._dialogRef.close(this.mecanicoPorMecanicaAgregar);
  }

  cancelarModal() {
    this._dialogRef.close();
  }
}
