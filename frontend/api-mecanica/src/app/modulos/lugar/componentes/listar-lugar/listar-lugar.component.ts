import {Component, OnInit} from '@angular/core';
import {LugarInterface} from '../../../../interfaces/lugar.interface';
import {LugarService} from '../../../../servicios/lugar-service/lugar.service';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material/dialog';
import {ModalCrearEditarLugarComponent} from '../../modal/modal-crear-editar-lugar.component';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';

@Component({
  selector: 'app-listar-lugar',
  templateUrl: 'listar-lugar.component.html',
  styleUrls: ['listar-lugar.component.sass']
})
export class ListarLugarComponent implements OnInit {

  lugares: LugarInterface[] = [];
  columnas: any [] = [
    {field: 'nombre', header: 'NOMBRE'},
    {field: 'mecanica', header: 'NUMERO DE MECANICAS'},
    {field: 'id', header: 'EDITAR'},
  ];
  registrosTotales: number;
  nombreABuscar: any;

  constructor(
    private readonly _lugarService: LugarService,
    private readonly _toasterService: ToasterService,
    private readonly _dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.listarLugares();
  }

  listarLugares() {
    this._lugarService.obtenerMecanicasPorLugar(0, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.lugares = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'ERROR',
            body: 'No se pudo cargar los lugares.',
            timeout: 1000,
            showCloseButton: true
          });
        }
      );
  }

  cargarMasDatos(evento: any) {
    this._lugarService
      .obtenerMecanicasPorLugar(evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.lugares = respuesta.data;
        }
      );
  }

  guardarLugar(datos: LugarInterface) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      this._lugarService.guardarLugar(datos)
        .subscribe(
          (respuesta) => {
            this.listarLugares();
            this._toasterService.pop({
              type: 'success',
              title: 'Correcto',
              body: 'Lugar guardado con exito.',
              timeout: 1700,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'ERROR',
              body: 'No se guardo nuevo lugar',
              timeout: 1700,
              showCloseButton: true
            });
          }
        );
    }
  }

  editarLugar(datos: LugarInterface, idLugar: number) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      this._lugarService.actualizarLugar(datos, idLugar)
        .subscribe(
          (respuesta) => {
            this.listarLugares();
            this._toasterService.pop({
              type: 'success',
              title: 'Correcto',
              body: 'Lugar editado con exito.',
              timeout: 1700,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'ERROR',
              body: 'No se edito lugar',
              timeout: 1700,
              showCloseButton: true
            });
          }
        );
    }
  }

  abrirModalCrear() {
    const modalCrearEditarLugar$ = this._dialog.open(
      ModalCrearEditarLugarComponent, {
        width: '30rem',
        data: false
      }
    );
    modalCrearEditarLugar$
      .afterClosed()
      .subscribe(
        (respuesta: LugarInterface) => {
          this.guardarLugar(respuesta);
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'ERROR',
            body: 'Al abrir modal crear.',
            timeout: 1700,
            showCloseButton: true
          });
        }
      );
  }

  abrirModalEditar(filaLugar: LugarInterface) {
    const modalCrearEditarLugar$ = this._dialog.open(
      ModalCrearEditarLugarComponent, {
        width: '30rem',
        data: filaLugar
      }
    );

    modalCrearEditarLugar$
      .afterClosed()
      .subscribe(
        (respuesta: LugarInterface) => {
          this.editarLugar(respuesta, filaLugar.id);
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'ERROR',
            body: 'Al abrir modal editar.',
            timeout: 1700,
            showCloseButton: true
          });
        }
      );
  }

  filtrarPorNombre() {

  }
}
