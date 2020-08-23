import {Component, OnInit} from '@angular/core';
import {ServicioInterface} from '../../../../interfaces/servicio.interface';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import {UsuarioInterface} from '../../../../interfaces/usuario.interface';
import {ServicioService} from '../../../../servicios/servicio/servicio.service';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {CreditoService} from '../../../../servicios/credito-service/credito.service';
import * as moment from 'moment';
import {HistoriaCreditoService} from '../../../../servicios/credito-service/historia-credito.service';
// tslint:disable-next-line:max-line-length
import {ModalCrearEditarServicioClienteComponent} from '../../modal/moda-crear-editar-servicio-cliente/modal-crear-editar-servicio-cliente.component';
import {EstadoServiciEnum} from '../../enum/estado.servici.enum';
import {MecanicoInterface} from '../../../../interfaces/mecanico.interface';
import {WebsocketService} from '../../../../servicios/websocket/websocket.service';

@Component({
  selector: 'app-listar-servicio-cliente',
  templateUrl: 'listar-servicio-cliente.component.html',
  styleUrls: ['listar-servicio-cliente.component.sass']
})
export class ListarServicioClienteComponent implements OnInit {

  servicios: ServicioInterface [] = [];
  columnas: any [] = [
    {field: 'detalle', header: 'DETALLE', width: '6rem'},
    {field: 'costo', header: 'COSTO', width: '6rem'},
    {field: 'estado', header: 'ESTADO', width: '6rem'},
    {field: 'id', header: 'OPERACIONES', width: '10rem'},
  ];
  registrosTotales: number;
  idUsuario: number;
  idVehiculo: number;
  idMecanica: number;
  servicioABuscar: string;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _cookieService: CookieService,
    private readonly _servicioService: ServicioService,
    private readonly _creditoService: CreditoService,
    private readonly _historiaDeCreditoService: HistoriaCreditoService,
    private readonly _socketService: WebsocketService
  ) {
    this.recuperarIdClienteDeCookie();
  }

  ngOnInit() {
    this.listarHistoriaDeServicio();
  }

  listarHistoriaDeServicio() {
    this._servicioService.obtnerServicioPorCliente(this.idUsuario, 0, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.servicios = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo leer historia de servicio.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cargarMasDatos(evento: any) {
    this._servicioService
      .obtnerServicioPorCliente(this.idUsuario, evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.servicios = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo leer historia de servicio.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  guardarServicio(datos: ServicioInterface) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      const query = {
        detalle: datos.detalle,
        estado: EstadoServiciEnum.porAsignarMecanico,
        usuario: this.idUsuario,
        vehiculo: this.idVehiculo,
        mecanica: this.idMecanica,
        costo: 0
      };
      this._servicioService.guardarServicio(query)
        .subscribe(
          (respuesta: any) => {
            this.listarHistoriaDeServicio();
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Servicio guardado con exito..',
              timeout: 1500,
              showCloseButton: true
            });
          }, error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo guardar servicio.',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
    }
  }

  abrirModalAgregarServicio() {
    const modalAgregarServicio$ = this._dialog.open(
      ModalCrearEditarServicioClienteComponent, {
        width: '35rem',
        data: false
      }
    );

    modalAgregarServicio$
      .afterClosed()
      .subscribe(
        (respuesta: any) => {
          const existenDatos = respuesta !== undefined;
          if (existenDatos) {
            this.idVehiculo = respuesta.vehiculo.id;
            this.idMecanica = respuesta.mecanica.id;
            this.guardarServicio(respuesta);
          }
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

  verDetalles(filaServicio: ServicioInterface) {
    const modalDetalle$ = this._dialog.open(
      ModalCrearEditarServicioClienteComponent, {
        width: '35rem',
        data: filaServicio
      }
    );
    modalDetalle$
      .afterClosed()
      .subscribe(
        (respuesta: any) => {
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo abrir modal detalles.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  recuperarIdClienteDeCookie() {
    const datos: UsuarioInterface = JSON.parse(this._cookieService.get('usuario-logeado'));
    this.idUsuario = Number(datos.id);
  }

  filtrarPorServicio() {

  }
}
