import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActividadPorMecanicoService} from '../../../../servicios/actividad-por-mecanico/actividad-por-mecanico.service';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {MatDialog} from '@angular/material/dialog';
// tslint:disable-next-line:max-line-length
import {ModalCrearActividadPorMecanicoComponent} from '../../modal/modal-crear-actividad-por-mecanico/modal-crear-actividad-por-mecanico.component';
import {ActividadService} from '../../../../servicios/actividad/actividad.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-listar-actividad-por-mecanico',
  templateUrl: 'listar-actividad-por-mecanico.component.html',
  styleUrls: ['listar-actividad-por-mecanico.component.sass']
})
export class ListarActividadPorMecanicoComponent implements OnInit {

  idMecanico: number;
  actividadesPorMecanico: string[] = [];
  registrosTotales: number;
  columnas: any [] = [
    {field: 'actividad', header: 'ACTIVIDAD', width: '50px'},
    {field: 'id', header: 'OPERACIONES', width: '50px'},
  ];
  idsActividades: number[] = [];

  constructor(
    private readonly _actvidatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _actividadPorMecanicoService: ActividadPorMecanicoService,
    private readonly _actividadService: ActividadService,
    private readonly _toasterService: ToasterService
  ) {
  }

  ngOnInit() {
    this.recuperarParametrosDeRuta();
    this.listarActividadesPorMecanico();
  }

  private recuperarParametrosDeRuta() {
    this._actvidatedRoute
      .params
      .subscribe(
        parametro => {
          this.idMecanico = parametro.idMecanico;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se recuperar parametros de ruta.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  listarActividadesPorMecanico() {
    this._actividadPorMecanicoService.actividadesPorMecanico(this.idMecanico, 0, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.actividadesPorMecanico = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se cargar actividades por mecanico.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cargarMasDatos(evento: any) {
    this._actividadPorMecanicoService
      .actividadesPorMecanico(this.idMecanico, evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.actividadesPorMecanico = respuesta.data;
        },
        error => {
        }
      );
  }

  eliminarActividadPorMecanico(idActividadPorMecanico: number) {
    this._actividadPorMecanicoService
      .eliminarActividadPorMecanico(idActividadPorMecanico)
      .subscribe(
        respuesta => {
          this.listarActividadesPorMecanico();
          this._toasterService.pop({
            type: 'success',
            title: 'Exito',
            body: 'Actividad eliminada exitosamente.',
            timeout: 1500,
            showCloseButton: true
          });
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo eliminar actividad de mecanico.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  guardarActividadPorMecanico(idMecanico: number, idsActividad: number[]) {
    for (const id of idsActividad) {
      const query = {
        mecanico: idMecanico,
        actividad: id
      };
      this._actividadPorMecanicoService.guardarActividadPorMecanico(query)
        .subscribe(valor => {
            this.listarActividadesPorMecanico();
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Actividad guardada exitosamente.',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo guardar actividad de mecanico.',
              timeout: 1500,
              showCloseButton: true
            });
          });
    }
  }

  guardarActividad(actividad: string) {
    const query = {
      detalleActividad: actividad
    };
    this._actividadService
      .guardarActividad(query)
      .subscribe(
        (valor: any) => {
          this.idsActividades.push(valor.id);
          this.guardarActividadPorMecanico(this.idMecanico, this.idsActividades);
          this.listarActividadesPorMecanico();
          this._toasterService.pop({
            type: 'success',
            title: 'Exito',
            body: 'Actividad de mecanico guardada con exito.',
            timeout: 1500,
            showCloseButton: true
          });
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo guardar nueva actividad.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  abrirModaCrear() {
    const modalCrearActividadPorMecanico$ = this._dialog.open(
      ModalCrearActividadPorMecanicoComponent, {
        width: '30rem',
        data: false
      }
    );

    modalCrearActividadPorMecanico$
      .afterClosed()
      .subscribe(
        (respuesta: ActividadPorMecanico) => {
          const tieneDatos = respuesta !== undefined;
          if (tieneDatos) {
            const creoNuevaActividad = respuesta.detalleActividad.trim() !== '';
            this.idMecanico = Number(this.idMecanico);
            const eligioActividades = respuesta.actividadMecanico.length !== 0;
            if (eligioActividades) {
              this.idsActividades = respuesta.actividadMecanico.map((valor: any) => valor.id);
            }
            if (creoNuevaActividad) {
              this.guardarActividad(respuesta.detalleActividad);
            } else {
              this.guardarActividadPorMecanico(this.idMecanico, this.idsActividades);
            }
          }
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo abrir modal crear.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }
}

export interface ActividadPorMecanico {
  actividadMecanico?: [];
  detalleActividad: string;
}
