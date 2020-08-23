import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {ActividadPorMecanicoInterface} from '../../../../interfaces/actividad.por.mecanico.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListarActividadPorMecanicoComponent} from '../../componentes/listar-actividad-por-mecanico/listar-actividad-por-mecanico.component';
import {ActividadInterface} from '../../../../interfaces/actividad.interface';

@Component({
  selector: 'app-modal-crear-actividad-por-mecanico',
  templateUrl: 'modal-crear-actividad-por-mecanico.component.html',
  styleUrls: ['modal-crear-actividad-por-mecanico.component.sass']
})
export class ModalCrearActividadPorMecanicoComponent implements OnInit {

  actividadPorMecanicoCrear: ActividadPorMecanicoInterface;

  constructor(
    private readonly _dialogRef: MatDialogRef<ListarActividadPorMecanicoComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: ActividadInterface
  ) {}

  ngOnInit() {
  }

  crearACtividadPorMecanico(actividadPorMecanico: ActividadInterface | boolean) {
    (!actividadPorMecanico) ? this.actividadPorMecanicoCrear = undefined : this.actividadPorMecanicoCrear = actividadPorMecanico as object;
  }
  enviarDatosFormulario() {
    this._dialogRef.close(this.actividadPorMecanicoCrear);
  }

  cancelarModal() {
    this._dialogRef.close();
  }
}
