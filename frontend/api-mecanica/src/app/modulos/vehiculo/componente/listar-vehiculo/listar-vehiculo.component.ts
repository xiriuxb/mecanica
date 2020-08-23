import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {VehiculoService} from '../../../../servicios/vehiculo/vehiculo.service';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {VehiculoInterface} from '../../../../interfaces/vehiculo.interface';
import {ModalCrearVehiculoComponent} from '../../modal/modal-crear-vehiculo/modal-crear-vehiculo.component';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-listar-vehiculo',
  templateUrl: 'listar-vehiculo.component.html',
  styleUrls: ['listar-vehiculo.component.sass']
})
export class ListarVehiculoComponent implements OnInit {

  idCliente: number;
  vehiculoPorCliente: string [] = [];
  registrosTotales: number;
  columnas: any [] = [
    {field: 'placa', header: 'PLACA', width: '50px'},
    {field: 'anio', header: 'ANIO', width: '50px'},
    {field: 'descripcion', header: 'DESCRIPCION', width: '50px'},
    {field: 'id', header: 'OPERACIONES', width: '50px'},
  ];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _vehiculoService: VehiculoService,
    private readonly _toasterService: ToasterService
  ) {
  }

  ngOnInit() {
    this.recuperarParametrosDeRuta();
    this.listarVehiculoPorCliente();
  }

  private recuperarParametrosDeRuta() {
    this._activatedRoute
      .params
      .subscribe(
        parametro => {
          this.idCliente = parametro.idUsuario;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se cargo datos',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  listarVehiculoPorCliente() {
    this._vehiculoService.obtenerVehiculoPorCliente(0, 5, {id: this.idCliente})
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.vehiculoPorCliente = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se cargo datos',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cargarMasDatos(evento: any) {
    this._vehiculoService
      .obtenerVehiculoPorCliente(evento.first, 5, {id: this.idCliente})
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.vehiculoPorCliente = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se cargo datos',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  eliminarVehiculoDeCliente(idVehiculo: number) {
    this._vehiculoService.eliminarVehiculo(idVehiculo)
      .subscribe(
        respuesta => {
          this.listarVehiculoPorCliente();
          this._toasterService.pop({
            type: 'success',
            title: 'Exito',
            body: 'Vehiuclo eliminado con exito',
            timeout: 1500,
            showCloseButton: true
          });
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se puedo eliminar vehiculo.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  guardarVehiculoDeCliente(datos: VehiculoInterface) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      datos.anio = Number(datos.anio);
      const query = {
        placa: datos.placa,
        anio: datos.anio,
        descripcion: datos.descripcion,
        usuario: this.idCliente
      };
      this._vehiculoService.guardarVehiculoPorCliente(query)
        .subscribe(
          respuesta => {
            this.listarVehiculoPorCliente();
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Vehiculo de cliente guardado con exito',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se guardo auto de cliente',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
    }
  }

  editarVehiculoCliente(datos: VehiculoInterface, idVehiculo: number) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      const query = {
        placa: datos.placa,
        anio: Number(datos.anio),
        descripcion: datos.descripcion,
        usuario: this.idCliente
      };

      this._vehiculoService.actualizarVehiculo(query, idVehiculo)
        .subscribe(
          respuesta => {
            this.listarVehiculoPorCliente();
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Vehiculo de cliente editado con exito',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se edito auto de cliente',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
    }
  }

  abrirModalCrear() {
    const modalCrearVehiculo$ = this._dialog.open(
      ModalCrearVehiculoComponent, {
        width: '35rem',
        data: false
      }
    );

    modalCrearVehiculo$
      .afterClosed()
      .subscribe(
        respuesta => {
          this.guardarVehiculoDeCliente(respuesta);
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo avrir modal vehiculo',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  abrirModalEditar(filaVehiculo: VehiculoInterface) {
    const modalVehiculo$ = this._dialog.open(
      ModalCrearVehiculoComponent, {
        width: '35rem',
        data: filaVehiculo
      }
    );

    modalVehiculo$
      .afterClosed()
      .subscribe(
        (respuesta: VehiculoInterface) => {
          this.editarVehiculoCliente(respuesta, filaVehiculo.id);
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo avrir modal vehiculo',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }
}
