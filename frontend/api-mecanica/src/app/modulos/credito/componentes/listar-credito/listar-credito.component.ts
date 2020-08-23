import {Component, OnInit} from '@angular/core';
import {HistoriaDeCreditoInterface} from '../../../../interfaces/historia-de-credito.interface';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {HistoriaCreditoService} from '../../../../servicios/credito-service/historia-credito.service';
import {CreditoService} from '../../../../servicios/credito-service/credito.service';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {CreditoInterface} from '../../../../interfaces/credito.interface';
import {ModalCrearCreditoComponent} from '../../modal/crear-credito/modal-crear-credito.component';
import * as moment from 'moment';
import {CookieService} from 'ngx-cookie';
import {UsuarioInterface} from '../../../../interfaces/usuario.interface';

@Component({
  selector: 'app-listar-credito',
  templateUrl: 'listar-credito.component.html',
  styleUrls: ['listar-credito.component.sass']
})
export class ListarCreditoComponent implements OnInit {

  creditos: HistoriaDeCreditoInterface[] = [];
  columnas: any [] = [
    {field: 'historialDeCredito', header: 'FECHA', width: '6rem'},
    {field: 'cantidad', header: 'CREDITO DISPONIBLE', width: '6rem'},
    {field: 'movimientoEconomico', header: 'TRANSACCION', width: '6rem'},
    {field: 'aumenta', header: 'TIPO MOVIMIENTO', width: '6rem'}
  ];
  registrosTotales: number;
  valorActual: number;
  idCredito: number;
  idUsuario: number;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _dialog: MatDialog,
    private readonly _historiaDeCreditoService: HistoriaCreditoService,
    private readonly _creaditoService: CreditoService,
    private readonly _cookieService: CookieService
  ) {
    this.recuperarIdClienteDeCookie();
  }

  ngOnInit() {
    this.listarHistoriaDeCredito();
  }

  listarHistoriaDeCredito() {
    this._creaditoService.obtnerHistorialPorCliente(this.idUsuario, 0, 10)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          const historicoValores = respuesta.data.map((valores: any) => valores.cantidad);
          this.valorActual = historicoValores[0];
          this.creditos = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo listar credito.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cargarMasDatos(evento: any) {
    this._creaditoService
      .obtnerHistorialPorCliente(this.idUsuario, evento.first, 10)
      .subscribe(
        (respuesta: RespuestaInterface) => {
         this.creditos = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo listar credito.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  guardarCredito(datos: CreditoInterface) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      const valorSumado = this.valorActual + datos.movimientoEconomico;
      const query = {
        cantidad: valorSumado,
        aumenta: true,
        movimientoEconomico: datos.movimientoEconomico
      };
      this._creaditoService.guardarCredito(query)
        .subscribe(
          (respuesta: any) => {
            this.idCredito = respuesta.id;
            this.guardarHistorialDeCredito();
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Credito guardado con exito.',
              timeout: 1500,
              showCloseButton: true
            });
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
          this.listarHistoriaDeCredito();
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo guardar historia de credito.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  abrirModalAgregarCredito() {
    const modalAgregarCredito$ = this._dialog.open(
      ModalCrearCreditoComponent, {
        width: '35rem',
        data: false
      }
    );

    modalAgregarCredito$
      .afterClosed()
      .subscribe(
        (respuesta: any) => {
          const existenDatos = respuesta !== undefined;
          if (existenDatos) {
            this.guardarCredito(respuesta);
          }
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo abrir modal de credito.',
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
}
