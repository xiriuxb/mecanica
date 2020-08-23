import {Component, OnInit} from '@angular/core';
import {ServicioInterface} from '../../../../interfaces/servicio.interface';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {ServicioService} from '../../../../servicios/servicio/servicio.service';
import * as moment from 'moment';
import {MecanicoInterface} from '../../../../interfaces/mecanico.interface';
import {CreditoService} from '../../../../servicios/credito-service/credito.service';
import {HistoriaCreditoService} from '../../../../servicios/credito-service/historia-credito.service';
import {ModalCrearServicioMecanicaComponent} from '../../modal/modal-crear-servicio-mecanica/modal-crear-servicio-mecanica.component';
import {WebsocketService} from '../../../../servicios/websocket/websocket.service';
import {MecanicoPorServicioService} from '../../../../servicios/mecanico-por-servicio/mecanico-por-servicio.service';

@Component({
  selector: 'app-listar-servicio-mecanica',
  templateUrl: 'listar-servicio-mecanica.component.html',
  styleUrls: ['listar-servicio-mecanica.component.sass']
})
export class ListarServicioMecanicaComponent implements OnInit {

  servicios: ServicioInterface [] = [];
  columnas: any [] = [
    {field: 'detalle', header: 'DETALLE', width: '6rem'},
    {field: 'costo', header: 'COSTO', width: '6rem'},
    {field: 'estado', header: 'ESTADO', width: '6rem'},
    {field: 'id', header: 'OPERACIONES', width: '10rem'},
  ];
  registrosTotales: number;
  idUsuario: number;
  valorActual: number;
  idCredito: number;
  idMecanica: number;
  nombreABuscar: string;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _actvidatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _cookieService: CookieService,
    private readonly _servicioService: ServicioService,
    private readonly _creditoService: CreditoService,
    private readonly _historiaDeCreditoService: HistoriaCreditoService,
    private readonly _socketService: WebsocketService,
    private readonly _mecanicoPorServicioService: MecanicoPorServicioService
  ) {
  }

  ngOnInit() {
    this.recuperarParametrosDeRuta();
    this.listarHistoriaDeServicio();
  }

  private recuperarParametrosDeRuta() {
    this._actvidatedRoute
      .params
      .subscribe(
        parametro => {
          this.idMecanica = parametro.idMecanica;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pude recuperar parametro de ruta.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  listarHistoriaDeServicio() {
    this._servicioService.obtnerServicioPorMecanica(this.idMecanica, 0, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.servicios = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo listar hisotias de servicio.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cargarMasDatos(evento: any) {
    this._servicioService
      .obtnerServicioPorMecanica(this.idMecanica, evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.servicios = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo listar hisotias de servicio.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  listarHistoriaDeCredito() {
    this._creditoService.obtnerHistorialPorCliente(this.idUsuario, 0, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          const historicoValores = respuesta.data.map((valores: any) => valores.cantidad);
          this.valorActual = historicoValores[0];
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo listar hisotial de credito.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  guardarCredito(costo: number) {
    const existenDatos = costo !== undefined;
    if (existenDatos) {
      const valorRestado = this.valorActual - costo;
      const query = {
        cantidad: valorRestado,
        aumenta: false,
        movimientoEconomico: costo
      };
      this._creditoService.guardarCredito(query)
        .subscribe(
          (respuesta: any) => {
            this.idCredito = respuesta.id;
            this.guardarHistorialDeCredito();
          }, error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo guardar credito.',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
    }
  }

  guardarHistorialDeCredito() {
    const query = {
      fecha: moment(new Date()).format('YYYY-MM-DD'),
      usuario: this.idUsuario,
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
            body: 'No se pudo listar historial de credito.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  actualizarServicio(datos: any, idServicio: number) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      const query = {
        detalle: datos.detalle,
        estado: datos.estado,
        costo: datos.costo
      };
      this._socketService.enviarDatos(query, idServicio)
        .subscribe(
          (respuesta: any) => {
            this.guardarCredito(datos.costo);
            this.guardarMecanicoPorServicio({mecanico: datos.mecanico.mecanico.id, servicio: idServicio});
            this.listarHistoriaDeServicio();
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Se actualizo servicio de mecanica de forma exitosa.',
              timeout: 1500,
              showCloseButton: true
            });

          }, error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo actualizar servicio de mecanica',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
      // this._servicioService.actualizarServicio(query, idServicio)
      //   .subscribe(
      //     (respuesta: any) => {
      //       this.guardarCredito(datos.costo);
      //       this.guardarMecanicoPorServicio({mecanico: datos.mecanico.mecanico.id, servicio: idServicio});
      //       this.listarHistoriaDeServicio();
      //     }, error => {
      //       console.error(error);
      //     }
      //   );
    }
  }

  eliminar(idServicio: number) {
    this._servicioService.eliminarServicio(idServicio)
      .subscribe(
        respuesta => {
          this.listarHistoriaDeServicio();
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo eliminar servicio.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  verDetalles(filaServicio: ServicioInterface) {
    const modalDetalle$ = this._dialog.open(
      ModalCrearServicioMecanicaComponent, {
        width: '35rem',
        data: filaServicio
      }
    );
    this._servicioService.obtenerIdClientePorServicio(filaServicio.id)
      .subscribe(
        (respueesta: any) => {
          this.idUsuario = respueesta.usuario.id;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo abrir modal.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );

    modalDetalle$
      .afterClosed()
      .subscribe(
        (respuesta: MecanicoInterface) => {
          this.actualizarServicio(respuesta, filaServicio.id);
          this.listarHistoriaDeCredito();
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo abrir modal.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  guardarMecanicoPorServicio(datos) {
    this._mecanicoPorServicioService.guardar(datos)
      .subscribe(
        respuesta => {
        },
        error => {
          console.error(error);
        }
      );
  }

  filtrarPorNombre() {

  }
}
