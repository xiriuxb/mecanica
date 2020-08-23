import {Component, Inject, OnInit} from '@angular/core';
import {UsuarioInterface} from '../../../../interfaces/usuario.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListarClienteComponent} from '../../componentes/listar-cliente/listar-cliente.component';

@Component({
  selector: 'app-modal-crear-editar-cliente',
  templateUrl: 'modal-crear-editar-cliente.component.html',
  styleUrls: ['modal-crear-editar-cliente.component.sass']
})
export class ModalCrearEditarClienteComponent implements OnInit {

  clienteCrearEditar: UsuarioInterface | boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<ListarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: UsuarioInterface | boolean
  ) {
  }

  ngOnInit() {
    if (!this._datos) {
    } else {
      this.clienteCrearEditar = this._datos;
    }
  }

  crearEditarCliente(cliente: UsuarioInterface | boolean) {
    (!cliente) ? this.clienteCrearEditar = undefined : this.clienteCrearEditar = cliente as object;
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.clienteCrearEditar);
  }

  cancelarModal() {
    this._dialogRef.close();
  }
}
