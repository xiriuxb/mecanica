import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ListarCreditoComponent} from '../../componentes/listar-credito/listar-credito.component';
import {CreditoInterface} from '../../../../interfaces/credito.interface';

@Component({
  selector: 'app-modal-crear-credito',
  templateUrl: 'modal-crear-credito.component.html',
  styleUrls: ['modal-crear-credito.component.sass']
})
export class ModalCrearCreditoComponent implements  OnInit {

  creditoCrear: CreditoInterface | boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<ListarCreditoComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: boolean
  ) {}

  ngOnInit() {
  }

  crearCredito(credito: CreditoInterface | boolean) {
    (!credito) ? this.creditoCrear = undefined : this.creditoCrear = credito as object;
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.creditoCrear);
  }

  cancelarModal() {
    this._dialogRef.close();
  }
}
