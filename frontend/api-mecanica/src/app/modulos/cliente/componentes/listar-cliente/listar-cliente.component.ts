import {Component, OnInit} from '@angular/core';
import {UsuarioInterface} from '../../../../interfaces/usuario.interface';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material/dialog';
import {UsuarioService} from '../../../../servicios/usuario-service/usuario.service';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {RolPorUsuarioService} from '../../../../servicios/rol-por-usuario-service/rol-por-usuario.service';
import {ModalCrearEditarClienteComponent} from '../../modal/moda-crear-editar-cliente/modal-crear-editar-cliente.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CreditoService} from '../../../../servicios/credito-service/credito.service';
import {HistoriaCreditoService} from '../../../../servicios/credito-service/historia-credito.service';
import * as moment from 'moment';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: 'listar-cliente.component.html',
  styleUrls: ['listar-cliente.component.sass']
})
export class ListarClienteComponent implements OnInit {

  clientes: UsuarioInterface [] = [];
  columnas: any [] = [
    {field: 'nombreUsuario', header: 'NOMBRE', width: '6rem'},
    {field: 'apellidoUsuario', header: 'APELLIDO', width: '6rem'},
    {field: 'cedulaUsuario', header: 'CEDULA', width: '6rem'},
    {field: 'telefonoUsuario', header: 'TELEFONO', width: '6rem'},
    {field: 'estadoCivilUsuario', header: 'ESTADO CIVIL', width: '6rem'},
    {field: 'estadoUsuario', header: 'ESTADO', width: '5rem'},
    {field: 'id', header: 'OPERACIONES', width: '10rem'},
  ];
  registrosTotales: number;
  idCredito: number;
  nombreABuscar: string;
  parametroBusqueda;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _dialog: MatDialog,
    private readonly _usuarioService: UsuarioService,
    private readonly _rolPorUsuario: RolPorUsuarioService,
    private readonly _activateRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _creditoService: CreditoService,
    private readonly _historiaDeCreditoService: HistoriaCreditoService,
  ) {
  }

  ngOnInit() {
    this._activateRoute.queryParams
      .subscribe(params => {
        this.parametroBusqueda = params;
      });
    this.listarUsuarios();
  }

  listarUsuarios() {
    this._usuarioService.obtenerUsuariosClientes(0, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.clientes = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo cargar datos.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cargarMasDatos(evento: any) {
    this._usuarioService
      .obtenerUsuariosClientes(evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.clientes = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo cargar datos.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cambiarEstadoCliente(usuario: UsuarioInterface) {
    const idUsuario = usuario.id;
    const nuevoEstado = !usuario.estadoUsuario;
    const usuarioActualizado = {
      estadoUsuario: nuevoEstado
    };
    this._usuarioService.actualizarUsuario(usuarioActualizado, idUsuario)
      .subscribe(
        (respuestaActualizacion) => {
          this._toasterService.pop('success', 'Correcto', 'Se cambio el estado');
          usuario.estadoUsuario = nuevoEstado;
        },
        error => {
          this._toasterService.pop('error', 'Error', 'Error con el servidor.');
        }
      );
  }

  guardarCredito() {
    const query = {
      cantidad: 100.00,
      aumenta: true,
      movimientoEconomico: 0
    };
    this._creditoService.guardarCredito(query)
      .subscribe(
        (respuesta: any) => {
          this.idCredito = respuesta.id;
        }, error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo gurdar credito de cliente.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );

  }

  guardarHistorialDeCredito(idCliente: number) {
    const query = {
      fecha: moment(new Date()).format('YYYY-MM-DD'),
      usuario: idCliente,
      credito: this.idCredito
    };
    this._historiaDeCreditoService.guardarHistoriaDeCredito(query)
      .subscribe(
        respuesta => {
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo gurdar historia de credito de cliente.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  guardarUsuarioCliente(datos: UsuarioInterface) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      const query = {
        nombreUsuario: datos.nombreUsuario,
        apellidoUsuario: datos.apellidoUsuario,
        cedulaUsuario: datos.cedulaUsuario,
        telefonoUsuario: datos.telefonoUsuario,
        direccionUsuario: datos.direccionUsuario,
        estadoCivilUsuario: datos.estadoCivilUsuario,
        estadoUsuario: datos.estadoUsuario,
        password: 'A12345678a'
      };
      this.guardarCredito();
      this._usuarioService.guardarUsuarioCliente(query)
        .subscribe(
          (respuesta: any) => {
            this.guardarRolCliente(respuesta.id);
            this.guardarHistorialDeCredito(respuesta.id);
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Cliente guardado con exito.',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo gurdar al cliente.',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
    }
  }

  guardarRolCliente(idUsuario: number) {
    const query = {
      rol: 4,
      usuario: idUsuario
    };
    this._rolPorUsuario.guardarRolPorUsuario(query)
      .subscribe(valor => {
          this.listarUsuarios();
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo gurdar rol cliente.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  editarUsuarioCliente(datos: UsuarioInterface, idUsuario: number) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      const query = {
        nombreUsuario: datos.nombreUsuario,
        apellidoUsuario: datos.apellidoUsuario,
        cedulaUsuario: datos.cedulaUsuario,
        telefonoUsuario: datos.telefonoUsuario,
        direccionUsuario: datos.direccionUsuario,
        estadoCivilUsuario: datos.estadoCivilUsuario
      };
      this._usuarioService.actualizarUsuario(query, idUsuario)
        .subscribe(
          (respuesta) => {
            this.listarUsuarios();
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Cliente editado con exito.',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo editar al cliente.',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
    }
  }

  abrirModalCrear() {
    const modalCrearCliente$ = this._dialog.open(
      ModalCrearEditarClienteComponent, {
        width: '35rem',
        data: false
      }
    );

    modalCrearCliente$
      .afterClosed()
      .subscribe(
        (respuesta: any) => {
          const existenDatos = respuesta !== undefined;
          if (existenDatos) {
            this.guardarUsuarioCliente(respuesta);
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  abrirModalEditar(filaCliente: UsuarioInterface) {
    const modalEditarCliente$ = this._dialog.open(
      ModalCrearEditarClienteComponent, {
        width: '35rem',
        data: filaCliente
      }
    );

    modalEditarCliente$
      .afterClosed()
      .subscribe(
        (respuesta: any) => {
          const existenDatos = respuesta !== undefined;
          if (existenDatos) {
            this.editarUsuarioCliente(respuesta, filaCliente.id);
          }
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo abrir modal editar.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  listaDeVehiculo(idCliente: number) {
    this._router.navigate([`cliente/vehiculo/listar/${idCliente}`]);
  }

  filtrarPorNombre() {
    (this.nombreABuscar) ?
      this._router.navigate(['cliente/listar'], {queryParams: {nombreCliente: this.nombreABuscar}}) :
      this._router.navigate(['cliente/listar']);
  }
}
