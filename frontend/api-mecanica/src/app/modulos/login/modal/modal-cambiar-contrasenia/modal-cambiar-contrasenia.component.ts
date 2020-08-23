import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CambiarContraseniaComponent} from '../../componentes/cambiar-contrasenia/cambiar-contrasenia.component';

@Component({
  selector: 'app-modal-cambiar-contrasenia',
  templateUrl: 'modal-cambiar-contrasenia.component.html',
  styleUrls: ['modal-cambiar-contrasenia.component.sass']
})
export class ModalCambiarContraseniaComponent implements OnInit {

  contrasenia;

  constructor(
    private readonly _dialogRef: MatDialogRef<CambiarContraseniaComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: any
  ) {
  }


  ngOnInit() {
  }

  crearNuevaContrasenia(contrasenia: any) {
    (!contrasenia) ? this.contrasenia = undefined : this.contrasenia = contrasenia as object;
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.contrasenia);
  }

  cancelarModal() {
    this._dialogRef.close();
  }
}
