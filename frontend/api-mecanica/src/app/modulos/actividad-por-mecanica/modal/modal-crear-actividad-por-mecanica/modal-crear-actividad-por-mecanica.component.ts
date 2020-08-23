import {Component, Inject, OnInit} from '@angular/core';
import {ActividadPorMecanicaInterface} from '../../../../interfaces/actividad.por.mecanica.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ListarActividadPorMecanicaComponent} from '../../componentes/listar-actividad-por-mecanica/listar-actividad-por-mecanica.component';
import {ActividadInterface} from '../../../../interfaces/actividad.interface';

@Component({
  selector: 'app-modal-crear-actividad-por-mecanica',
  templateUrl: 'modal-crear-actividad-por-mecanica.component.html',
  styleUrls: ['modal-crear-actividad-por-mecanica.component.sass']
})
export class ModalCrearActividadPorMecanicaComponent implements OnInit {

  actividadPorMecanicaCrear: ActividadPorMecanicaInterface;

  constructor(
    private readonly _dialogRef: MatDialogRef<ListarActividadPorMecanicaComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: ActividadInterface
  ) {}

  ngOnInit() {
  }

  crearACtividadPorMecanica(actividadPorMecanica: ActividadInterface | boolean) {
    (!actividadPorMecanica) ? this.actividadPorMecanicaCrear = undefined : this.actividadPorMecanicaCrear = actividadPorMecanica as object;
  }
  enviarDatosFormulario() {
    this._dialogRef.close(this.actividadPorMecanicaCrear);
  }

  cancelarModal() {
    this._dialogRef.close();
  }
}
